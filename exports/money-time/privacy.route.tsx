import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import LegalLayout from "@/components/money-time/LegalLayout";

// הועתק ממדיניות הפרטיות בדף הכנס של רחלי. שונו רק: כתובת האתר בסעיף 1.1
// (שם הופיע דומיין של אתר אחר), ”תוכנית ליווי” בסעיף 3.4, העיצוב והתאריך.
const TITLE = "מדיניות פרטיות | MONEY TIME | רחלי חדד";
const DESCRIPTION =
  "מדיניות הפרטיות של רחלי חדד: כללי איסוף מידע, שימוש, אבטחה וזכויותייך.";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
});

const MAIL_CLASS = "lp-focus underline decoration-gold underline-offset-4 hover:text-ink";

function TocLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="lp-focus block text-ink-2 underline decoration-gold underline-offset-4 transition-colors hover:text-ink"
    >
      {children}
    </a>
  );
}

function Section({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="font-display text-2xl text-ink md:text-3xl">
        {number}. {title}
      </h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function SubSection({ number, children }: { number: string; children: ReactNode }) {
  return (
    <p>
      <span className="font-semibold text-ink">{number}</span> {children}
    </p>
  );
}

function CookieTable() {
  return (
    <div className="mt-4 overflow-x-auto rounded-2xl border border-gold/40 bg-paper/70">
      <table className="lp-fine w-full min-w-[520px] text-right">
        <thead>
          <tr className="border-b border-gold/40 bg-mist/40">
            <th className="px-4 py-3 font-semibold text-ink">סוג העוגייה</th>
            <th className="px-4 py-3 font-semibold text-ink">מטרה</th>
            <th className="px-4 py-3 font-semibold text-ink">משך שמירה</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gold/30 text-ink-2">
          <tr>
            <td className="px-4 py-3 align-top">הכרחיות</td>
            <td className="px-4 py-3 align-top">תפעול בסיסי של האתר, טעינת הטופס ואבטחתו</td>
            <td className="px-4 py-3 align-top">הפעלה נוכחית / עד 12 חודשים</td>
          </tr>
          <tr>
            <td className="px-4 py-3 align-top">ביצועים וסטטיסטיקה</td>
            <td className="px-4 py-3 align-top">מדידת תנועה, זיהוי תקלות ושיפור חוויית השימוש</td>
            <td className="px-4 py-3 align-top">עד 24 חודשים</td>
          </tr>
          <tr>
            <td className="px-4 py-3 align-top">שיווק והתאמה</td>
            <td className="px-4 py-3 align-top">מדידת אפקטיביות קמפיינים והצגת תכנים רלוונטיים</td>
            <td className="px-4 py-3 align-top">עד 24 חודשים</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const TOC = [
  "כללי, הגדרות ותחולה",
  "מנהלת המידע ופרטי יצירת קשר",
  "סוגי המידע הנאסף",
  "אופן איסוף המידע",
  "מטרות השימוש במידע",
  "מסירת מידע לצדדים שלישיים והעברה לחו״ל",
  "דיוור ישיר והסרה מרשימת התפוצה",
  "עוגיות (Cookies) וטכנולוגיות מעקב",
  "זכויותייך במידע",
  "אבטחת מידע",
  "תקופות שמירת המידע",
  "פרטיות קטינים",
  "קישורים לאתרים ולשירותים חיצוניים",
  "שינויים במדיניות",
  "דין חל וסמכות שיפוט",
  "פנייה בענייני פרטיות ואופן הטיפול בבקשות",
];

function PrivacyPage() {
  return (
    <LegalLayout title="מדיניות פרטיות" updated="19 באוקטובר 2026" current="privacy">
      <nav aria-label="תוכן עניינים" className="rounded-2xl border border-gold/40 bg-paper/70 p-5 md:p-6">
        <h2 className="font-display text-xl text-ink">תוכן עניינים</h2>
        <ol className="mt-4 grid list-inside list-decimal gap-2 pr-4 text-ink-2 marker:text-gold md:grid-cols-2">
          {TOC.map((t, i) => (
            <li key={t}>
              <TocLink href={`#section-${i + 1}`}>{t}</TocLink>
            </li>
          ))}
        </ol>
      </nav>

      <Section id="section-1" number={1} title="כללי, הגדרות ותחולה">
        <SubSection number="1.1.">
          מדיניות פרטיות זו (להלן: "המדיניות") מסדירה את אופן איסופו, השימוש בו, שמירתו, העברתו
          והגנתו של מידע אישי הנאסף אודותייך במסגרת השימוש בעמוד הנחיתה של קורס MONEY TIME שבו
          מוצגת מדיניות זו, וכן בעמודים, בטפסים ובשירותים המקושרים אליו (להלן, יחד: "האתר").
        </SubSection>
        <SubSection number="1.2.">
          המדיניות מנוסחת בלשון נקבה מטעמי נוחות בלבד ומופנית לכלל המשתמשים והמשתמשות כאחד.
        </SubSection>
        <SubSection number="1.3.">
          "מידע אישי" משמעו כל נתון הניתן לשיוך לאדם מזוהה או ניתן לזיהוי, לרבות "מידע" ו"מידע
          רגיש" כהגדרתם בחוק הגנת הפרטיות, התשמ"א-1981 (להלן: "חוק הגנת הפרטיות").
        </SubSection>
        <SubSection number="1.4.">
          השימוש באתר, מסירת פרטים בטפסים שבו או פנייה בערוצי הקשר המפורטים בו מהווים הסכמה לתנאי
          מדיניות זו. אינך חייבת למסור מידע על פי דין, אך ללא מסירת פרטים מסוימים לא נוכל ליצור עמך
          קשר או לספק את השירות.
        </SubSection>
        <SubSection number="1.5.">
          המדיניות מהווה חלק בלתי נפרד מתנאי השימוש באתר. במקרה של סתירה בין המדיניות לבין מסמך אחר
          בעניין פרטיות, יגברו הוראות מדיניות זו.
        </SubSection>
      </Section>

      <Section id="section-2" number={2} title="מנהלת המידע ופרטי יצירת קשר">
        <SubSection number="2.1.">מנהלת המידע ובעלת מאגר המידע היא: רחלי חדד, ח.פ 516754785.</SubSection>
        <SubSection number="2.2.">כתובת למשלוח דואר: סוקולוב 34, כפר יונה, 4035090.</SubSection>
        <SubSection number="2.3.">
          כתובת דואר אלקטרוני לפניות בענייני פרטיות:{" "}
          <a href="mailto:racheli@rachelihadad.co.il" className={MAIL_CLASS}>
            racheli@rachelihadad.co.il
          </a>
          .
        </SubSection>
      </Section>

      <Section id="section-3" number={3} title="סוגי המידע הנאסף">
        <SubSection number="3.1.">
          מידע שנמסר על ידך מרצון – בעת מילוי טופס הרשמה או יצירת קשר: שם פרטי ושם משפחה, מספר
          טלפון, כתובת דואר אלקטרוני, וכן כל פרט נוסף שתבחרי לכתוב בשדה חופשי.
        </SubSection>
        <SubSection number="3.2.">
          מידע הנמסר במהלך התכתבות – תוכן הודעות, שיחות ופניות שהעברת אלינו בדואר אלקטרוני, בטלפון
          או ביישומוני מסרים.
        </SubSection>
        <SubSection number="3.3.">
          מידע טכני ומידע גלישה – כתובת IP, סוג המכשיר והדפדפן, מערכת ההפעלה, שפת הממשק, מועדי
          הכניסה לאתר, העמודים שנצפו, מקור ההפניה ונתוני שימוש סטטיסטיים. מידע זה נאסף באופן אוטומטי
          על ידי שרתי האחסון וכלי המדידה.
        </SubSection>
        <SubSection number="3.4.">
          מידע הנוצר במסגרת ההשתתפות בקורס – ככל שתירשמי לקורס או לתוכנית: פרטי ההתקשרות, נתוני
          ההרשמה והתשלום המעובדים אצל ספקי הסליקה, ותכתובות במסגרת השירות. פרטי אמצעי תשלום מלאים
          אינם נשמרים אצלנו ומעובדים ישירות אצל ספק הסליקה.
        </SubSection>
        <SubSection number="3.5.">
          איננו מבקשים ואיננו מעוניינים לקבל מידע רגיש (כגון מידע רפואי או פיננסי מפורט). אם מסרת
          מידע כזה מיוזמתך, מסירתו נעשית באחריותך ובהסכמתך.
        </SubSection>
      </Section>

      <Section id="section-4" number={4} title="אופן איסוף המידע">
        <SubSection number="4.1.">
          באמצעות טופס ההרשמה המוטמע באתר, המופעל על ידי ספק חיצוני למערכות טפסים ודיוור (Ravpage).
          המידע שנמסר בטופס נקלט ונשמר גם במערכות הספק בהתאם לתנאיו.
        </SubSection>
        <SubSection number="4.2.">בפנייה ישירה אלינו בדואר אלקטרוני, בטלפון או ברשתות חברתיות.</SubSection>
        <SubSection number="4.3.">
          באופן אוטומטי, בעת הגלישה באתר, באמצעות קובצי יומן (Logs), עוגיות וטכנולוגיות דומות כמפורט
          בסעיף 8.
        </SubSection>
      </Section>

      <Section id="section-5" number={5} title="מטרות השימוש במידע">
        <p className="font-semibold text-ink">המידע ישמש למטרות הבאות בלבד:</p>
        <ul className="list-disc space-y-2 pr-5 marker:text-gold">
          <li>יצירת קשר עמך בעקבות פנייתך ומתן מענה לשאלות.</li>
          <li>הצגת התוכנית, תיאום שיחת התאמה, רישום והשלמת הליך ההצטרפות.</li>
          <li>אספקת השירות והליווי, לרבות שליחת חומרים, קישורי מפגשים ועדכונים תפעוליים.</li>
          <li>משלוח תוכן שיווקי, מבצעים ועדכונים – בכפוף להסכמתך ולזכות ההסרה שבסעיף 7.</li>
          <li>שיפור האתר, ניתוח ביצועים סטטיסטיים והתאמת חוויית הגלישה.</li>
          <li>ניהול תקין של הפעילות העסקית, לרבות הנהלת חשבונות, גבייה ובירור מחלוקות.</li>
          <li>עמידה בהוראות כל דין, לרבות מענה לדרישות רשויות מוסמכות והליכים משפטיים.</li>
          <li>אבטחת האתר, מניעת שימוש לרעה, הונאה ופעילות בלתי חוקית.</li>
        </ul>
      </Section>

      <Section id="section-6" number={6} title="מסירת מידע לצדדים שלישיים והעברה לחו״ל">
        <SubSection number="6.1.">איננו מוכרים ואיננו משכירים מידע אישי לצדדים שלישיים.</SubSection>
        <SubSection number="6.2.">
          מידע עשוי להיחשף לספקי שירות הפועלים עבורנו ולצורך תפעול השירות בלבד, ובכללם: ספק מערכת
          הטפסים והדיוור, ספקי אחסון ותשתית ענן, ספקי כלי מדידה ואנליטיקה, ספק סליקה ותשלומים, ונותני
          שירותים מקצועיים (כגון הנהלת חשבונות וייעוץ משפטי). ספקים אלה מחויבים לעשות שימוש במידע אך
          ורק לצורך אספקת השירות לנו.
        </SubSection>
        <SubSection number="6.3.">
          מידע עשוי להימסר גם: (א) על פי צו שיפוטי או דרישת רשות מוסמכת; (ב) לשם הגנה על זכויותינו
          החוקיות בהליך משפטי; (ג) במקרה של מיזוג, העברת פעילות או מכירת נכסים – ובלבד שמקבל המידע
          יקבל על עצמו את הוראות מדיניות זו.
        </SubSection>
        <SubSection number="6.4.">
          חלק מספקי השירות מפעילים שרתים מחוץ לישראל. במקרים אלה עשוי המידע להיות מועבר ולהישמר מחוץ
          לגבולות המדינה, והשימוש בשירות מהווה הסכמה להעברה כאמור, בכפוף לתקנות הגנת הפרטיות (העברת
          מידע אל מאגרי מידע שמחוץ לגבולות המדינה), התשס"א-2001.
        </SubSection>
      </Section>

      <Section id="section-7" number={7} title="דיוור ישיר והסרה מרשימת התפוצה">
        <SubSection number="7.1.">
          בעת מסירת פרטייך את עשויה לתת הסכמה לקבלת דברי פרסומת בדואר אלקטרוני, במסרון או ביישומוני
          מסרים, בהתאם לסעיף 30א לחוק התקשורת (בזק ושידורים), התשמ"ב-1982.
        </SubSection>
        <SubSection number="7.2.">
          באפשרותך להסיר את עצמך מרשימת התפוצה בכל עת, ללא עלות: באמצעות קישור ההסרה המופיע בכל
          הודעת דיוור, בהשבה להודעה במילה "הסר", או בפנייה לכתובת הדואר האלקטרוני שבסעיף 2.
        </SubSection>
        <SubSection number="7.3.">
          בקשת הסרה תטופל בהקדם ולא יאוחר מהמועד הקבוע בדין. גם לאחר ההסרה נמשיך לשלוח הודעות
          תפעוליות הנוגעות לשירות שרכשת, ככל שרכשת.
        </SubSection>
        <SubSection number="7.4.">
          בהתאם לסעיף 17ו לחוק הגנת הפרטיות, את רשאית לדרוש בכתב כי מידע אודותייך יימחק ממאגר המידע
          המשמש לדיוור ישיר או כי לא יימסר לאחר.
        </SubSection>
      </Section>

      <Section id="section-8" number={8} title="עוגיות (Cookies) וטכנולוגיות מעקב">
        <SubSection number="8.1.">
          האתר עשוי לעשות שימוש בעוגיות ובטכנולוגיות דומות (פיקסלים, אחסון מקומי) לצורך תפעול תקין,
          שמירת העדפות, מדידת ביצועים והתאמת תכנים.
        </SubSection>
        <CookieTable />
        <SubSection number="8.2.">
          באפשרותך לחסום או למחוק עוגיות בכל עת דרך הגדרות הדפדפן שבשימושך. חסימת עוגיות עשויה לפגוע
          בתפקוד חלקים מהאתר, ובכלל זה בטופס ההרשמה.
        </SubSection>
        <SubSection number="8.3.">
          עוגיות של צדדים שלישיים כפופות גם למדיניות הפרטיות של אותם ספקים, ואיננו שולטים בהן.
        </SubSection>
      </Section>

      <Section id="section-9" number={9} title="זכויותייך במידע">
        <SubSection number="9.1.">
          זכות עיון – בהתאם לסעיף 13 לחוק הגנת הפרטיות, את זכאית לעיין במידע אודותייך המוחזק במאגר.
        </SubSection>
        <SubSection number="9.2.">
          זכות תיקון – מצאת כי המידע אינו נכון, שלם, ברור או מעודכן – את רשאית לפנות אלינו בבקשה
          לתקנו או למחקו, בהתאם לסעיף 14 לחוק.
        </SubSection>
        <SubSection number="9.3.">
          מחיקה – ניתן לבקש את מחיקת המידע, ואנו נפעל למחיקתו בכפוף לחובות שמירה על פי דין (למשל
          חובות תיעוד חשבונאי ומס).
        </SubSection>
        <SubSection number="9.4.">
          ביטול הסכמה – ניתן לחזור בך מהסכמה שנתת לשימוש במידע לצורכי שיווק, בכל עת, ללא השפעה על
          חוקיות השימוש שנעשה קודם לכן.
        </SubSection>
        <SubSection number="9.5.">
          פנייה למימוש הזכויות תוגש לכתובת הדואר האלקטרוני שבסעיף 2. אנו רשאים לדרוש אימות זהות סביר
          בטרם טיפול בבקשה, ונשיב בתוך פרק זמן סביר ובהתאם למועדים הקבועים בדין.
        </SubSection>
      </Section>

      <Section id="section-10" number={10} title="אבטחת מידע">
        <SubSection number="10.1.">
          אנו נוקטים באמצעי אבטחה סבירים ומקובלים להגנה על המידע, לרבות הצפנת תעבורה (HTTPS), הגבלת
          הרשאות גישה, שימוש בספקי תשתית מוכרים ושמירת מידע במערכות מוגנות בסיסמה.
        </SubSection>
        <SubSection number="10.2.">
          על אף האמור, לא ניתן להבטיח חסינות מוחלטת מפני חדירה בלתי מורשית או שימוש לרעה במידע.
          השימוש באתר נעשה בידיעה זו, ולא תהיה לך טענה בגין נזק שנגרם כתוצאה מאירוע כאמור, למעט במקרה
          של רשלנות המנוגדת להוראות הדין.
        </SubSection>
        <SubSection number="10.3.">
          בקרות אירוע אבטחה חמור, נפעל בהתאם להוראות תקנות הגנת הפרטיות (אבטחת מידע), התשע"ז-2017.
        </SubSection>
      </Section>

      <Section id="section-11" number={11} title="תקופות שמירת המידע">
        <SubSection number="11.1.">
          מידע של פונות שלא התקשרו בהסכם יישמר לתקופה סבירה לצורך המשך קשר שיווקי, ולא יותר מ-24
          חודשים ממועד הקשר האחרון, אלא אם ביקשת את מחיקתו קודם לכן.
        </SubSection>
        <SubSection number="11.2.">
          מידע של לקוחות יישמר לאורך תקופת ההתקשרות ולאחריה, כנדרש לצורכי הנהלת חשבונות, דיווח לרשויות
          והגנה מפני תביעות – ובכל מקרה בהתאם לתקופות ההתיישנות והשמירה הקבועות בדין.
        </SubSection>
        <SubSection number="11.3.">
          מידע סטטיסטי ואנונימי שאינו מזהה אותך עשוי להישמר ללא הגבלת זמן.
        </SubSection>
      </Section>

      <Section id="section-12" number={12} title="פרטיות קטינים">
        <p>
          האתר והשירותים מיועדים לבגירים מגיל 18 ומעלה. איננו אוספים ביודעין מידע אישי אודות קטינים.
          אם נודע לך כי קטין מסר מידע דרך האתר, נא ליידע אותנו ונפעל למחיקתו.
        </p>
      </Section>

      <Section id="section-13" number={13} title="קישורים לאתרים ולשירותים חיצוניים">
        <p>
          האתר עשוי לכלול קישורים לאתרים, טפסים, סרטונים ורשתות חברתיות של צדדים שלישיים. אין לנו
          שליטה על תוכנם ועל מדיניות הפרטיות שלהם, ואיננו אחראים לאופן שבו הם אוספים ומשתמשים במידע.
          מומלץ לעיין במדיניות הפרטיות של כל שירות בנפרד.
        </p>
      </Section>

      <Section id="section-14" number={14} title="שינויים במדיניות">
        <p>
          אנו רשאים לעדכן מדיניות זו מעת לעת, בהתאם לשינויים בשירות או בדין. הנוסח המחייב הוא הנוסח
          המפורסם בעמוד זה, ומועד העדכון האחרון מצוין בראשו. שינוי מהותי יובא לידיעת הנרשמות באמצעים
          סבירים. המשך שימוש באתר לאחר העדכון מהווה הסכמה לנוסח המעודכן.
        </p>
      </Section>

      <Section id="section-15" number={15} title="דין חל וסמכות שיפוט">
        <p>
          על מדיניות זו יחולו דיני מדינת ישראל בלבד. סמכות השיפוט הבלעדית בכל עניין הנוגע למדיניות זו
          נתונה לבתי המשפט המוסמכים במחוז מרכז.
        </p>
      </Section>

      <Section id="section-16" number={16} title="פנייה בענייני פרטיות ואופן הטיפול בבקשות">
        <p>
          בכל שאלה, בקשה או תלונה בנושא פרטיות ניתן לפנות אל רחלי חדד בדואר אלקטרוני{" "}
          <a href="mailto:racheli@rachelihadad.co.il" className={MAIL_CLASS}>
            racheli@rachelihadad.co.il
          </a>{" "}
          או בדואר לכתובת סוקולוב 34, כפר יונה 4035090. נשתדל להשיב לכל פנייה בתוך 14 ימי עסקים.
        </p>
      </Section>
    </LegalLayout>
  );
}
