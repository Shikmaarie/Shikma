/**
 * Copy for the standalone landing page at /partnerships — the free
 * "קשרים עסקיים ושת״פים" masterclass that opens the business club for a day.
 *
 * Kept apart from site.ts on purpose: a landing page is a campaign asset with
 * its own life cycle, and its copy gets rewritten between rounds without
 * touching the rest of the site.
 */

export const partnerships = {
  /* -- Hero ------------------------------------------------------------- */
  eyebrow: "הדרכה פתוחה · ללא עלות",

  /**
   * Split by hand so each line breaks where the sentence breathes, instead of
   * wherever the viewport happens to cut it.
   */
  title: [
    { text: "הדרך להביא ערימות של", gold: false },
    { text: "לקוחות, כסף והזדמנויות", gold: true },
    { text: "דרך קשרים ושת״פים —", gold: false },
    { text: "בלי להוציא עוד שקל על פרסום", gold: false },
  ],

  lede: "הכסף האמיתי נמצא בקשרים העסקיים ובשת״פים שתבנו.",

  /**
   * All three are deliberately empty: the page may not state a date, a time or
   * a platform that Racheli has not confirmed. Fill them in and they appear on
   * their own — as a chip in the hero and as a line above the form. Anything
   * left empty is simply left out.
   */
  event: {
    date: "",
    time: "",
    platform: "",
  },

  /** Facts that are true regardless of when the session runs. */
  badges: [
    "השתתפות ללא עלות",
    "בהרשמה מראש",
    "מספר המקומות מוגבל",
  ],

  ctaPrimary: "כן, אני רוצה להיכנס להדרכה החינמית",
  ctaShort: "להרשמה החינמית",

  /* -- The invitation --------------------------------------------------- */
  invitation: {
    eyebrow: "יום אחד. דלת פתוחה.",
    title: "מועדון העסקים של רחלי חדד",
    titleAccent: "פותח את שעריו",
    paragraphs: [
      "בדרך כלל ההדרכות, הכלים והאסטרטגיות שאנחנו מלמדות בתוך המועדון שמורים לחברי המועדון בלבד.",
      "הפעם החלטנו לעשות משהו אחר: לפתוח את הדלתות ולאפשר גם לכם לקבל טעימה אמיתית ממה שקורה בפנים.",
      "אנחנו מזמינות אתכם להדרכה מיוחדת ופתוחה, ללא עלות, בנושא שיכול לשנות לחלוטין את הדרך שבה אתם מגדילים את העסק.",
    ],
    banner: "קשרים עסקיים ושת״פים מנצחים",
  },

  /* -- The fork in the road --------------------------------------------- */
  fork: {
    eyebrow: "שתי דרכים לגדול",
    title: "אפשר לעבוד קשה.",
    titleAccent: "ואפשר לעבוד נכון.",
    hard: {
      label: "הדרך הארוכה",
      body: "לרדוף אחרי עוד לקוח. ועוד לקוח. ועוד אחד. כל חודש מתחילים מאפס, וכל לקוח חדש עולה עוד כסף בפרסום.",
      points: [
        "התקציב לפרסום רק גדל",
        "כל עסקה נסגרת בכוח",
        "החשיפה נעצרת ברגע שמפסיקים לשלם",
      ],
    },
    smart: {
      label: "הדרך של הקשרים",
      body: "ליצור את החיבורים הנכונים — כאלה שפותחים בפניכם קהלים חדשים, הזדמנויות חדשות ודלתות שלא הייתם מגיעים אליהן לבד.",
      points: [
        "חשיפה לקהל שכבר בנוי ובוטח",
        "שני הצדדים מרוויחים, ולכן זה מחזיק",
        "חיבור אחד ממשיך להחזיר שנים",
      ],
    },
  },

  /* -- Curriculum -------------------------------------------------------- */
  curriculum: {
    eyebrow: "מה נלמד בהדרכה",
    title: "בהדרכה רחלי חדד",
    titleAccent: "תחשוף",
    items: [
      {
        title: "לזהות את האנשים הנכונים",
        body: "מי בדיוק יכול לקדם את העסק שלכם — ואיך מזהים אותם לפני כולם.",
      },
      {
        title: "ליצור קשר מאפס",
        body: "איך פונים ובונים קשר עסקי גם עם אנשים שעדיין לא מכירים אתכם.",
      },
      {
        title: "לבנות שת״פ שמחזיק",
        body: "המבנה של שיתוף פעולה שבו שני הצדדים באמת מרוויחים — ולכן הוא ממשיך.",
      },
      {
        title: "להפוך חיבור לחשיפה",
        body: "איך חיבור אחד הופך לקהל חדש שלם ולשורה של הזדמנויות עסקיות.",
      },
      {
        title: "לבנות רשת שעובדת בשבילכם",
        body: "איך בונים סביבכם רשת קשרים שהופכת למנוע צמיחה משמעותי בעסק.",
      },
    ],
    /** Set on the last card, which sits alone on the row at md and up. */
    more: "ועוד — הדרכה מלאה, בלי לחסוך בכלים.",
  },

  /* -- Who is teaching --------------------------------------------------- */
  host: {
    eyebrow: "מי מעבירה את ההדרכה",
    name: "רחלי חדד",
    role: "מכפילה עסקים · בונה אימפריות",
    /**
     * Only verified facts from the material Racheli supplied. No family
     * details and no numbers she has not confirmed — see CLAUDE.md.
     */
    body: [
      "התחילה בגיל 20 בלי רקע ובלי עורף פיננסי, עברה פשיטת רגל, ומשם בנתה הכול מחדש.",
      "היום היא מנהלת 3 עסקים שמכניסים 6 ספרות בחודש — בארבעה ימי עבודה בשבוע, תוך כדי טיולים בעולם.",
      "בדרך היא לימדה למעלה מ-1,000 בעלי עסקים ומשפחות איך לבנות עסק שצומח מבפנים החוצה. את רשת הקשרים שהחזיקה את הצמיחה הזאת היא בנתה בעצמה, מאפס — וזה בדיוק מה שהיא מלמדת בהדרכה.",
    ],
    stats: [
      { value: "18", suffix: "שנים", label: "של ניסיון מהשטח" },
      { value: "3", suffix: "עסקים", label: "ב-6 ספרות בחודש" },
      { value: "1,000+", suffix: "מלווים", label: "בעלי עסקים ומשפחות" },
      { value: "4", suffix: "ימים", label: "שבוע עבודה מלא" },
    ],
    portrait: {
      src: "/brand/racheli-portrait.jpg",
      alt: "רחלי חדד",
    },
  },

  /* -- Registration ------------------------------------------------------ */
  form: {
    eyebrow: "הרשמה",
    title: "שמרו לי מקום",
    titleAccent: "בהדרכה",
    sub: "ההשתתפות ללא עלות ובהרשמה מראש. מספר המקומות מוגבל — נשלח לכם את הקישור והתזכורת במייל ובוואטסאפ.",
    submit: "כן, אני רוצה להיכנס להדרכה החינמית",
    submitting: "רושמים אתכם…",
    success: {
      title: "נרשמתם. המקום שלכם שמור.",
      body: "הפרטים להתחברות יישלחו אליכם לפני ההדרכה. שווה לשמור את ההודעה — אנחנו מתחילות בזמן.",
    },
    /** Shown under the button. Kept short: it is a legal note, not a pitch. */
    consent:
      "בשליחת הטופס אני מאשר/ת קבלת פרטי ההתחברות ועדכונים שיווקיים. ניתן להסיר את ההרשמה בכל עת.",
  },

  /* -- Closing ----------------------------------------------------------- */
  closing: {
    title: "חיבור אחד יכול לשנות",
    titleAccent: "את כל השנה הבאה שלכם.",
    body: "הדלת פתוחה ליום אחד. אחרי זה הכלים האלה חוזרים להיות שמורים לחברי המועדון בלבד.",
  },
} as const;
