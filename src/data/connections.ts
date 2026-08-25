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
 * `public/lp/lobby.svg` is a placeholder standing in for the real render until
 * it can be exported from Figma. Drop the photo in `public/lp/` and change the
 * path here — nothing else needs to move.
 */
export const connectionsPhoto = {
  src: "/lp/lobby.svg",
  alt: "רחלי חדד עומדת באולם כניסה מוזהב, ומאחוריה חמש קשתות שכל אחת מובילה לחדר אחר",
  /** Arch captions, positioned as a percentage of the photo's width. */
  archways: [
    { label: "לקוחות", x: 9 },
    { label: "שיתוף פעולה", x: 28 },
    { label: "קהל חדש", x: 50 },
    { label: "עסקאות", x: 71 },
    { label: "קהילה", x: 91 },
  ],
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
