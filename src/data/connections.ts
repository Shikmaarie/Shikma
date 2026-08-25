/**
 * Copy for the "קשרים ושת״פים" landing page (/connections).
 * Transcribed 1:1 from the Figma frame 5-16.
 *
 * Like the rest of the site, all copy lives here — never inside components.
 */

/** Where every CTA on the page points. */
export const connectionsCta = {
  label: "כן, אני רוצה להיכנס להדרכה החינמית",
  short: "להרשמה בחינם",
  /**
   * TODO: point this at the real registration destination — the form section
   * once it is designed, or the external signup URL. "#register" is a
   * placeholder and currently has no target on the page.
   */
  href: "#register",
} as const;

export const connectionsHero = {
  title: [
    "הדרך להביא ערימות של",
    "לקוחות, כסף והזדמנויות דרך",
    "קשרים ושת״פים",
  ],
  titleGold: "בלי להוציא עוד שקל על פרסום",
  banner: "הכסף האמיתי נמצא בקשרים העסקיים ובשת״פים שתבנו",
  meta: "השתתפות ללא עלות | בהרשמה מראש | מספר המקומות מוגבל",
} as const;

/**
 * The lobby photograph.
 *
 * The arch captions ("לקוחות", "שיתוף פעולה", "קהל חדש", "עסקאות", "קהילה")
 * are part of the artwork itself, so they are described in `alt` rather than
 * drawn over the image.
 *
 * `cutout` is the same figure again, layered on top so she breaks past the
 * bottom edge of the photo and into the parchment below — the overlap in the
 * design. It sits directly over the figure already in the photograph, so the
 * two numbers below are the alignment: nudge them if she doubles up.
 * Set `cutout: null` to drop the effect and use the photograph alone.
 */
export const connectionsPhoto = {
  src: "/lp/lobby.png",
  alt: "רחלי חדד עומדת באולם כניסה מוזהב. מאחוריה חמש קשתות, ועל כל אחת שלט: לקוחות, שיתוף פעולה, קהל חדש, עסקאות וקהילה",
  cutout: {
    src: "/lp/racheli-yellow.png",
    /** Height as a percentage of the photo band. */
    heightPct: 116,
    /** How far below the band's bottom edge she extends. */
    bottomPct: -14,
  },
} as const;

/** One rendered line of the intro paragraph. */
export type IntroLine = { text: string; strong?: boolean; tail?: string };

export const connectionsIntro = {
  title: ["מועדון העסקים של רחלי חדד", "פותח את שעריו ליום אחד"],
  sub: "אתם מוזמנים להיכנס להדרכה שלא תשכחו",
  /** `strong` marks the lines set in bold in the design. */
  body: [
    { text: "בדרך כלל ההדרכות, הכלים והאסטרטגיות שאנחנו מלמדות בתוך המועדון" },
    { text: "שמורים לחברי המועדון בלבד.", strong: true },
    { text: "הפעם החלטנו לעשות משהו אחר:" },
    {
      text: "לפתוח את הדלתות ולאפשר גם לכם לקבל טעימה אמיתית ממה שקורה בפנים.",
      strong: true,
    },
    { text: "אנחנו מזמינות אתכם להדרכה מיוחדת ופתוחה," },
    {
      text: "ללא עלות",
      strong: true,
      tail: ", בנושא שיכול לשנות את הדרך שבה אתם מגדילים את העסק.",
    },
  ] as IntroLine[],
} as const;

export const connectionsTwoWays = {
  /** Sits behind the teal gradient on both cards. */
  background: "/lp/gold-money.png",
  title: ["יש שתי דרכים לגדול", "אפשר לעבוד קשה. ואפשר לעבוד נכון."],
  cards: [
    {
      number: "1",
      title: "הדרך הארוכה",
      body: "לרדוף אחרי עוד לקוח, ועוד לקוח, ועוד אחד. כל חודש מתחילים מאפס, וכל לקוח חדש עולה עוד כסף בפרסום.",
      bullets: [
        "התקציב לפרסום רק גדל",
        "כל עסקה נסגרת בכוח",
        "החשיפה נעצרת ברגע שמפסיקים לשלם",
      ],
    },
    {
      number: "2",
      title: "הדרך של הקשרים",
      body: "ליצור את החיבורים הנכונים – כאלה שפותחים בפניכם קהלים חדשים, הזדמנויות חדשות ודלתות שלא הייתם מגיעים אליהן לבד.",
      bullets: [
        "חשיפה לקהל שכבר בנוי ובוטח",
        "שני הצדדים מרוויחים, ולכן זה מחזיק",
        "חיבור אחד ממשיך להחזיר שנים",
      ],
    },
  ],
} as const;

export const connectionsCurriculum = {
  title: "בהדרכה רחלי חדד תחשוף",
  items: [
    {
      number: "01",
      title: "לזהות את האנשים הנכונים",
      body: "מי בדיוק יכול לקדם את העסק שלכם ואיך מזהים אותם לפני כולם.",
    },
    {
      number: "02",
      title: "ליצור קשר מאפס",
      body: "איך פונים ובונים קשר עסקי גם עם אנשים שעדיין לא מכירים אתכם.",
    },
    {
      number: "03",
      title: "לבנות שת״פ שמחזיק",
      body: "המבנה של שיתוף פעולה שבו שני הצדדים באמת מרוויחים ולכן הוא ממשיך.",
    },
    {
      number: "04",
      title: "להפוך חיבור לחשיפה",
      body: "איך חיבור אחד הופך לקהל חדש שלם ולשורה של הזדמנויות עסקיות.",
    },
    {
      number: "05",
      title: "לבנות רשת שעובדת בשבילכם",
      body: "איך בונים סביבכם רשת קשרים שהופכת למנוע צמיחה משמעותי בעסק.",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* מי אני                                                              */
/* ------------------------------------------------------------------ */

/**
 * TODO — verify this copy against the Figma frame. It was transcribed from a
 * low-resolution export of the full page, so the wording is a best reading.
 * Every claim in it matches the verified facts in CLAUDE.md (started at 20,
 * bankruptcy, 3 businesses at six figures a month, a 4-day week, 1,000+
 * taught), so nothing here is invented — but the phrasing needs a check.
 */
export const connectionsAbout = {
  title: ["מי אני?", "ואיך אני יכולה", "לעזור לך?"],
  photo: {
    src: "/lp/racheli-pink.png",
    alt: "רחלי חדד",
  },
  /** The two figures pinned to the portrait. */
  badges: [
    { value: "3 עסקים", label: "6 ספרות בחודש" },
    { value: "1,000+", label: "למדו את השיטה" },
  ],
  body: [
    {
      lead: "התחלתי בגיל 20",
      text: " בלי רקע עסקי, בלי עורף פיננסי, עברתי פשיטת רגל, ומשם בניתי הכל מחדש.",
    },
    {
      lead: "היום אני מנהלת 3 עסקים",
      text: " שמכניסים 6 ספרות בחודש, ב-4 ימי עבודה בשבוע, תוך כדי טיולים בעולם.",
    },
    {
      lead: "בדרך לימדתי למעלה מ-1,000 בעלי עסקים ומשפחות",
      text: " איך לבנות עסק שמכניס יותר, ואיך לפתוח דלתות דרך קשרים ושת״פים.",
    },
  ],
  closer: "וזה בדיוק מה שאני מלמדת בהדרכה.",
} as const;

/* ------------------------------------------------------------------ */
/* טופס ההרשמה                                                         */
/* ------------------------------------------------------------------ */

/**
 * TODO — the form has no destination yet. `action` must point at the real
 * lead handler (an API route here, or the external form provider) before this
 * page goes live; until then the submit button is disabled rather than
 * pretending to succeed.
 */
export const connectionsForm = {
  title: "שמרו לי מקום בהדרכה",
  action: "",
  fields: [
    { name: "name", label: "שם מלא", type: "text", autoComplete: "name" },
    { name: "phone", label: "טלפון", type: "tel", autoComplete: "tel" },
    { name: "email", label: "אימייל", type: "email", autoComplete: "email" },
  ],
  submit: "שמרו לי מקום",
  note: "השתתפות ללא עלות | בהרשמה מראש | מספר המקומות מוגבל — נשלח לכם את הקישור והתזכורת במייל",
} as const;

/* ------------------------------------------------------------------ */
/* הסיום                                                               */
/* ------------------------------------------------------------------ */

export const connectionsQuote = {
  lines: ["חיבור אחד יכול לשנות", "את כל השנה הבאה שלכם"],
} as const;
