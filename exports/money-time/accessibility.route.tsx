import { createFileRoute } from "@tanstack/react-router";
import LegalLayout from "@/components/money-time/LegalLayout";

// הועתק מהצהרת הנגישות בדף הכנס של רחלי. עודכן רק העיצוב והתאריך.
const TITLE = "הצהרת נגישות | MONEY TIME | רחלי חדד";
const DESCRIPTION =
  "הצהרת הנגישות של עמוד MONEY TIME של רחלי חדד: התאמות הנגישות באתר, רמת התקן ודרכי פנייה.";

export const Route = createFileRoute("/accessibility")({
  component: AccessibilityPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/accessibility" }],
  }),
});

function AccessibilityPage() {
  return (
    <LegalLayout title="הצהרת נגישות" updated="19 באוקטובר 2026" current="accessibility">
      <section>
        <h2 className="font-display text-2xl text-ink">1. מחויבות לנגישות</h2>
        <p className="mt-3">
          אנו רואים חשיבות רבה במתן שירות שוויוני לכלל הגולשים, לרבות אנשים עם מוגבלות, ופועלים
          להנגיש את האתר בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות),
          התשע״ג-2013 ולתקן הישראלי ת״י 5568 המבוסס על הנחיות WCAG 2.0 ברמה AA.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-ink">2. התאמות הנגישות באתר</h2>
        <ul className="mt-3 list-disc space-y-2 pr-5 marker:text-gold">
          <li>תפריט נגישות קבוע הזמין בכל עמודי האתר.</li>
          <li>אפשרות להגדלה והקטנה של גודל הטקסט.</li>
          <li>מצב ניגודיות גבוהה ומצב גווני אפור.</li>
          <li>הדגשת קישורים והפחתת אנימציות ותנועה.</li>
          <li>גופן קריא לבעלי קשיי קריאה.</li>
          <li>ניווט מלא באמצעות מקלדת וסימון מיקוד ברור.</li>
          <li>מבנה כותרות היררכי וטקסט חלופי לתמונות.</li>
          <li>תמיכה בקוראי מסך ובכיווניות ימין לשמאל.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-2xl text-ink">3. מגבלות ידועות</h2>
        <p className="mt-3">
          חלק מהתכנים באתר, ובכללם טופס ההרשמה, מסופקים על ידי צדדים שלישיים ואינם בשליטתנו המלאה.
          אנו פועלים מול הספקים לשיפור מתמיד של נגישותם. אם נתקלתם ברכיב שאינו נגיש, נשמח לקבל על
          כך עדכון ונטפל בו בהקדם.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-ink">4. פנייה בנושא נגישות</h2>
        <p className="mt-3">
          רכזת הנגישות: רחלי חדד. דואר אלקטרוני:{" "}
          <a
            href="mailto:racheli@rachelihadad.co.il"
            className="lp-focus text-[hsl(var(--gold-deep))] underline decoration-gold underline-offset-4"
          >
            racheli@rachelihadad.co.il
          </a>
          . כתובת: סוקולוב 34, כפר יונה 4035090. נשתדל להשיב לכל פנייה בתוך 14 ימי עסקים.
        </p>
      </section>
    </LegalLayout>
  );
}
