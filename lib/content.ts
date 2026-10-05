type Shot = { light: string; dark: string; width: number; height: number };

export type Project = {
  n: string;
  title: string;
  summary: string;
  // [before, highlighted word, after]
  heading: [string, string, string];
  body: string;
  stack: string[];
  stats: [string, string][];
  main: Shot;
  mobile: Shot;
};

export const projects: Project[] = [
  {
    n: "01",
    title: "MORTEGA DEV PORTFOLIO",
    summary: "High-end personal portfolio built with modern web technologies.",
    heading: ["THE ", "PROBLEM", " & ARCHITECTURE"],
    body: "I wanted to create a digital presence that stands out from generic templates. To achieve this, I built a custom portfolio from scratch focused on extreme performance, kinetic variable typography that reacts to the cursor and to scroll, and scroll-driven animations using GSAP. The architecture uses Next.js App Router for optimal SEO and fast load times.",
    stack: ["Next.js 16", "GSAP", "Framer Motion", "Tailwind CSS", "TypeScript", "Lucide Icons"],
    stats: [
      ["100", "Perf. Score"],
      ["60fps", "Animations"],
      ["2", "Themes"],
      ["SSR", "Rendering"],
    ],
    main: { light: "/light-main.png", dark: "/dark-main.png", width: 1600, height: 900 },
    mobile: { light: "/light-mobile.png", dark: "/dark-mobile.png", width: 780, height: 1688 },
  },
  {
    n: "02",
    title: "LYDIA PSICOLOGÍA",
    summary:
      "Professional psychology practice website designed for a real client, focused on warmth, trust, and conversion.",
    heading: ["THE ", "CHALLENGE", ""],
    body: "A psychology professional needed a web presence that transmits trust, warmth, and professionalism from the very first glance. The site needed to be fully GDPR compliant with a clear privacy, legal notice, and cookies policy pages, all while being optimized for SEO to attract new patients organically.",
    stack: ["Next.js 14", "React", "Bootstrap 5", "Vanilla CSS", "SEO Optimized"],
    stats: [
      ["A+", "SEO Score"],
      ["GDPR", "Compliant"],
      ["4", "Legal Pages"],
      ["SSG", "Rendering"],
    ],
    // The client photo is blurred in the image files themselves
    main: { light: "/lydia-main.png", dark: "/lydia-main.png", width: 1818, height: 933 },
    mobile: { light: "/lydia-mobile.png", dark: "/lydia-mobile.png", width: 387, height: 841 },
  },
];

export const skillGroups = [
  {
    title: "FRONTEND CORE",
    body: "Architecting robust, scalable, and type-safe interfaces with a focus on maintainable component systems. I bridge the gap between complex logic and seamless UX, leveraging advanced patterns for both SPAs and SSR applications.",
    tools: ["React", "Angular", "Next.js 14", "TypeScript", "JavaScript"],
  },
  {
    title: "STYLING & ANIMATION",
    body: "Pixel-perfect UIs, 60fps animations, responsive systems.",
    tools: ["Tailwind CSS", "Bootstrap 5", "Framer Motion", "Vanilla CSS"],
  },
  {
    title: "BACKEND & TOOLS",
    body: "",
    tools: ["Spring Boot", "Python", "FastAPI", "Docker", "REST APIs"],
  },
];

// Arsenal marquee — all tools used across the 3 real projects
export const arsenalTools = [
  // Project 1 – Portfolio
  "Next.js 14", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Lucide Icons",
  // Project 2 – Lydia Psicología
  "Bootstrap 5", "Vanilla CSS", "SEO",
  // Project 3 – AI Agents (internship)
  "Spring Boot", "Angular", "Python", "FastAPI", "Argos Translate", "Prism.js", "Docker",
  // Universal tools
  "Git", "GitHub", "Vercel", "VS Code", "REST APIs", "Node.js", "JavaScript (ES6+)",
];

export const learning = ["RAG (Retrieval-Augmented Generation)", "AI & LLM Integration", "Java (deepening)"];

export const email = "mario98.mo@gmail.com";

export const socials = {
  github: "https://github.com/mortegaDAM",
  linkedin: "https://www.linkedin.com/in/mario-ortega-navarro-898093198/",
};
