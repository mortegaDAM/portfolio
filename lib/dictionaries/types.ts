type Shot = { light: string; dark: string; width: number; height: number };

export type Project = {
  id: string;
  n: string;
  title: string;
  summary: string;
  status?: "dev" | "confidential";
  // [before, highlighted word, after]
  heading: [string, string, string];
  body: string;
  stack: string[];
  stats?: [string, string][];
  links?: { kind: "site" | "code"; href: string }[];
  // "desktop": laptop-width screenshot plus a phone; "phones": a mobile app shown on three phones
  media:
    | { kind: "desktop"; main: Shot; mobile: Shot }
    | { kind: "phones"; shots: Shot[] }
    | { kind: "redacted" };
};

export type JourneyItem = { years: string; title: string; place: string; body: string; now?: boolean };

export type SkillGroup = { title: string; body: string; tools: string[] };
