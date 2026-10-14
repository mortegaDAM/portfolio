// Facts shared by both languages: screenshots, links and stacks

export const shots = {
  encuadre: {
    main: { light: "/projects/encuadre-light.png", dark: "/projects/encuadre-dark.png", width: 1600, height: 900 },
    mobile: { light: "/projects/encuadre-mobile-light.png", dark: "/projects/encuadre-mobile-dark.png", width: 780, height: 1688 },
  },
  recmnd: [
    { light: "/projects/recmnd-1-light.png", dark: "/projects/recmnd-1-dark.png", width: 780, height: 1688 },
    { light: "/projects/recmnd-2-light.png", dark: "/projects/recmnd-2-dark.png", width: 780, height: 1688 },
    { light: "/projects/recmnd-3-light.png", dark: "/projects/recmnd-3-dark.png", width: 780, height: 1688 },
  ],
  portfolio: {
    main: { light: "/light-main.png", dark: "/dark-main.png", width: 1600, height: 900 },
    mobile: { light: "/light-mobile.png", dark: "/dark-mobile.png", width: 780, height: 1688 },
  },
  // The client photo is blurred in the image files themselves
  lydia: {
    main: { light: "/lydia-main.png", dark: "/lydia-main.png", width: 1818, height: 933 },
    mobile: { light: "/lydia-mobile.png", dark: "/lydia-mobile.png", width: 387, height: 841 },
  },
};

export const stacks = {
  encuadre: ["Next.js 16", "React 19", "TypeScript", "NestJS", "Prisma", "PostgreSQL", "Socket.IO"],
  recmnd: ["React Native", "Expo", "Expo Router", "TypeScript", "Supabase", "PostgreSQL"],
  internship: ["Spring Boot", "Angular", "Python", "Docker"],
  portfolio: ["Next.js 16", "GSAP", "Framer Motion", "Tailwind CSS", "TypeScript"],
  lydia: ["Next.js", "React", "Bootstrap 5", "Vanilla CSS", "SEO"],
};

export const links = {
  portfolio: [{ kind: "code" as const, href: "https://github.com/mortegaDAM/portfolio" }],
  lydia: [{ kind: "site" as const, href: "https://lydiapsicologia.com" }],
};

export const arsenal = [
  "Next.js", "React", "React Native", "Expo", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "GSAP", "Framer Motion",
  "Bootstrap 5", "Angular", "Spring Boot", "Java", "NestJS", "Python", "FastAPI", "Node.js", "PostgreSQL", "Prisma",
  "Supabase", "SQL", "Power BI", "Jaspersoft Studio", "DocPath", "Docker", "REST APIs", "Git", "GitHub", "Vercel", "SEO",
];
