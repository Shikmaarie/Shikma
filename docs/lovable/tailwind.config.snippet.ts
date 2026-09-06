// Merge into theme.extend in tailwind.config.ts
export const extend = {
  colors: {
    paper: "hsl(var(--paper))",
    "paper-2": "hsl(var(--paper-2))",
    mist: "hsl(var(--mist))",
    "mint-wash": "hsl(var(--mint-wash))",
    ink: "hsl(var(--ink))",
    "ink-2": "hsl(var(--ink-2))",
    flame: "hsl(var(--flame))",
    "flame-dp": "hsl(var(--flame-dp))",
    "gold-ink": "hsl(var(--gold-ink))",
  },
  fontFamily: {
    sans: ["Rubik", "system-ui", "sans-serif"],
  },
  borderRadius: {
    "4xl": "2rem",
    "5xl": "2.75rem",
  },
};
