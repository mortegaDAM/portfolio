// Kinetic type engine. Every registered headline is a row of letters; each letter's
// weight and width follow the strongest of: cursor distance, a click shockwave,
// scroll progress (sw) or an idle wave (idle). One shared rAF loop drives all of them.
//
// Each letter is a fixed-width box (.kin-c) holding the glyph (.kin-g). The glyph changes
// shape inside its box and the following glyphs are pushed with transforms, so the page
// layout never moves: no layout shift and no page-wide reflow while letters animate.

export type KineticOptions = {
  min: number; // resting weight on a 200-800 scale
  max: number; // peak weight on a 200-800 scale
  wide: number; // 0 keeps the resting width, 1 lets letters reach full width
  idle: boolean;
  sw: boolean;
  fit: boolean; // shrink the font size so the line still fits with every letter at full width
};

type Item = KineticOptions & {
  el: HTMLElement;
  boxes: HTMLElement[];
  glyphs: HTMLElement[];
  k: number[];
  drawn: number[];
  line: number[]; // offsetTop of each box, to restart the push on every text line
  shift: number[];
  cx: number[];
  cy: number[];
  vis: boolean;
  dirty: boolean;
  baseSize: string; // inline font size set by the page, restored before every fit
};

// Mona Sans axis ranges
const WGHT = [200, 900];
const WDTH = [75, 125];
const REST_WDTH = 80;

const RADIUS_MIN = 220;
const SHOCK_LIFE = 1500;
const SHOCK_BAND = 160;

const items = new Set<Item>();
const byEl = new WeakMap<Element, Item>();
let shocks: { x: number; y: number; t: number }[] = [];
let px = 0;
let py = 0;
let lastMove = -1e4;
let raf = 0;
let fine = false;
let ready = false;
let skip = false;
let resizeTimer = 0;
let io: IntersectionObserver | null = null;

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

function variation(it: Item, k: number) {
  const t = clamp01((it.min + k * (it.max - it.min) - 200) / 600);
  const wght = Math.round(WGHT[0] + t * (WGHT[1] - WGHT[0]));
  const wdth = it.wide ? WDTH[0] + k * it.wide * (WDTH[1] - WDTH[0]) : REST_WDTH;
  return `"wght" ${wght}, "wdth" ${wdth.toFixed(1)}`;
}

// Glyphs that outgrew their box push the following ones on the same line.
// Reads every width first, then writes the transforms.
function place(list: Item[]) {
  const sizes = list.map((it) => ({
    glyph: it.glyphs.map((g) => g.getBoundingClientRect().width),
    box: it.boxes.map((b) => b.getBoundingClientRect().width),
  }));
  list.forEach((it, n) => {
    let push = 0;
    for (let i = 0; i < it.glyphs.length; i++) {
      if (i > 0 && it.line[i] !== it.line[i - 1]) push = 0;
      if (Math.abs(push - it.shift[i]) >= 0.1) {
        it.shift[i] = push;
        it.glyphs[i].style.transform = push ? `translateX(${push.toFixed(1)}px)` : "";
      }
      push += sizes[n].glyph[i] - sizes[n].box[i];
    }
    it.dirty = false;
  });
}

// Locks every letter box to its resting width so later shape changes cannot move the layout.
// Scroll-driven headlines (fit) reach full weight and width on every letter at once, so their
// font size is first trimmed for that state: any language and any screen width fits.
// All items are measured together in a few read/write passes, and the current shapes are
// restored before returning, so nothing flickers and the page lays out only a handful of times.
function measure(list: Item[]) {
  if (!list.length) return;
  const fits = list.filter((it) => it.fit);

  // 1. Fit: every letter at full shape, then one read
  fits.forEach((it) => {
    it.el.style.fontSize = it.baseSize;
    const full = variation(it, 1);
    it.boxes.forEach((box, i) => {
      box.style.width = "";
      it.glyphs[i].style.transform = "";
      it.glyphs[i].style.fontVariationSettings = full;
    });
  });
  const sizes = fits.map((it) => {
    const first = it.glyphs[0].getBoundingClientRect();
    const last = it.glyphs[it.glyphs.length - 1].getBoundingClientRect();
    return { room: it.el.clientWidth * 0.97, used: last.right - first.left, size: parseFloat(getComputedStyle(it.el).fontSize) };
  });
  fits.forEach((it, n) => {
    const { room, used, size } = sizes[n];
    if (used > room) it.el.style.fontSize = `${((size * room) / used).toFixed(2)}px`;
  });

  // 2. Resting widths: every letter at rest, then one read
  list.forEach((it) => {
    const rest = variation(it, 0);
    it.boxes.forEach((box, i) => {
      box.style.width = "";
      it.glyphs[i].style.transform = "";
      it.glyphs[i].style.fontVariationSettings = rest;
    });
    it.shift.fill(0);
  });
  const reads = list.map((it) => ({
    fontSize: parseFloat(getComputedStyle(it.el).fontSize) || 16,
    widths: it.glyphs.map((g) => g.getBoundingClientRect().width),
    lines: it.boxes.map((box) => box.offsetTop),
  }));

  // 3. Lock the boxes, put the current shapes back, then push in one more read/write pass
  list.forEach((it, n) => {
    const { fontSize, widths, lines } = reads[n];
    it.line = lines;
    it.boxes.forEach((box, i) => {
      box.style.width = `${(widths[i] / fontSize).toFixed(4)}em`;
      it.glyphs[i].style.fontVariationSettings = variation(it, it.k[i]);
      it.drawn[i] = it.k[i];
    });
  });
  place(list);
}

// New headlines are measured together on the next frame instead of one by one on mount
const pending = new Set<Item>();
let flushQueued = false;
function queueMeasure(it: Item) {
  pending.add(it);
  if (flushQueued) return;
  flushQueued = true;
  requestAnimationFrame(() => {
    flushQueued = false;
    const list = Array.from(pending).filter((p) => items.has(p));
    pending.clear();
    measure(list);
  });
}

function frame(now: number) {
  raf = requestAnimationFrame(frame);
  // Touch devices repaint the letters every other frame: half the work, same look
  if (!fine && (skip = !skip)) return;
  const ease = fine ? 0.14 : 0.26;
  const live = fine && now - lastMove < 1600;
  shocks = shocks.filter((s) => now - s.t < SHOCK_LIFE);
  const needCenters = live || shocks.length > 0;
  const vh = window.innerHeight;
  const radius = Math.max(RADIUS_MIN, window.innerWidth * 0.26);

  // 1. Read: scroll progress and, when something is aiming at the letters, their centers
  const work: { it: Item; sw: number }[] = [];
  items.forEach((it) => {
    if (!it.vis) return;
    const sw = it.sw ? clamp01((vh * 0.92 - it.el.getBoundingClientRect().top) / (vh * 0.57)) : -1;
    if (needCenters) {
      it.glyphs.forEach((g, i) => {
        const b = g.getBoundingClientRect();
        it.cx[i] = b.left + b.width / 2;
        it.cy[i] = b.top + b.height / 2;
      });
    }
    work.push({ it, sw });
  });

  // 2. Write: new letter shapes
  const moved: Item[] = [];
  for (const { it, sw } of work) {
    const n = it.glyphs.length;
    let changed = it.dirty;
    for (let i = 0; i < n; i++) {
      let k = 0;
      if (live) k = Math.max(0, 1 - Math.hypot(px - it.cx[i], py - it.cy[i]) / radius);
      else if (it.idle) k = ((Math.sin(now / 650 - i * 0.6) + 1) / 2) * 0.85;
      if (sw >= 0) k = Math.max(k, clamp01(sw * 2 - i / n));
      for (const s of shocks) {
        const age = now - s.t;
        const d = Math.abs(Math.hypot(s.x - it.cx[i], s.y - it.cy[i]) - age * 1.3);
        if (d < SHOCK_BAND) k = Math.max(k, (1 - d / SHOCK_BAND) * (1 - age / SHOCK_LIFE));
      }
      it.k[i] += (k - it.k[i]) * ease;
      if (Math.abs(it.k[i] - it.drawn[i]) >= 0.004) {
        it.drawn[i] = it.k[i];
        it.glyphs[i].style.fontVariationSettings = variation(it, it.k[i]);
        changed = true;
      }
    }
    if (changed) moved.push(it);
  }

  // 3. Read the new widths and 4. write the pushes, in the same frame as the shapes
  if (moved.length) place(moved);
}

function onMove(e: PointerEvent) {
  px = e.clientX;
  py = e.clientY;
  lastMove = performance.now();
}

function onDown(e: PointerEvent) {
  shock(e.clientX, e.clientY);
}

function onVisibility() {
  cancelAnimationFrame(raf);
  if (ready && !document.hidden && items.size) raf = requestAnimationFrame(frame);
}

// Glyph widths change when the web font replaces the fallback
function measureAll() {
  measure(Array.from(items));
}

// Box widths are in em, so a resize only needs the line breaks found again
function onResize() {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(() => {
    const all = Array.from(items);
    measure(all.filter((it) => it.fit));
    const rest = all.filter((it) => !it.fit);
    rest.forEach((it) => {
      it.line = it.boxes.map((box) => box.offsetTop);
    });
    place(rest);
  }, 150);
}

// The loop waits for the page to finish loading so it never competes with first paint
function begin() {
  ready = true;
  onVisibility();
}

export function shock(x: number, y: number) {
  shocks.push({ x, y, t: performance.now() });
}

export function register(el: HTMLElement, opts: KineticOptions) {
  const boxes = Array.from(el.querySelectorAll<HTMLElement>(".kin-c"));
  const glyphs = boxes.map((box) => box.firstElementChild as HTMLElement);
  const zeros = () => boxes.map(() => 0);
  const it: Item = { ...opts, el, boxes, glyphs, k: zeros(), drawn: zeros(), line: zeros(), shift: zeros(), cx: zeros(), cy: zeros(), vis: false, dirty: false, baseSize: el.style.fontSize };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    // Reduced motion: every letter stays at one shape; measuring once fits and spaces it
    it.k.fill(0.75);
    measure([it]);
    return () => {};
  }

  if (!io) {
    io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const target = byEl.get(e.target);
          if (target) target.vis = e.isIntersecting;
        }),
      { rootMargin: "80px" }
    );
  }
  items.add(it);
  queueMeasure(it);
  byEl.set(el, it);
  io.observe(el);

  if (items.size === 1) {
    fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    // Safari can resolve fonts.ready before the web font is in, so both signals are used
    document.fonts?.ready.then(measureAll);
    document.fonts?.addEventListener?.("loadingdone", measureAll);
    if (document.readyState === "complete") begin();
    else window.addEventListener("load", begin, { once: true });
  }

  return () => {
    io?.unobserve(el);
    items.delete(it);
    boxes.forEach((box, i) => {
      box.style.width = "";
      glyphs[i].style.transform = "";
    });
    el.style.fontSize = it.baseSize;
    if (!items.size) {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", begin);
      document.removeEventListener("visibilitychange", onVisibility);
      document.fonts?.removeEventListener?.("loadingdone", measureAll);
    }
  };
}
