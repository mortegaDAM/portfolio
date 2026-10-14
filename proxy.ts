import { NextResponse, type NextRequest } from "next/server";

const locales = ["en", "es"];

// Saved choice from the language switcher first, then the browser's preferred languages
function pickLocale(request: NextRequest) {
  const saved = request.cookies.get("NEXT_LOCALE")?.value;
  if (saved && locales.includes(saved)) return saved;
  const header = request.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.slice(0, 2).toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q)
    .find((entry) => locales.includes(entry.lang));
  return preferred?.lang ?? "en";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  request.nextUrl.pathname = `/${pickLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Pages only: skip the API, Next internals, Vercel scripts and any file with an extension
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
