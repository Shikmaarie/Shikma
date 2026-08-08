import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/data/site";

/**
 * Placeholder legal copy.
 *
 * These are structural drafts so the footer links resolve and the checkout
 * flow can reference them. They are NOT legal advice — have a lawyer review
 * and replace the text before the site goes live.
 */
const docs = {
  terms: {
    title: "תקנון ותנאי שימוש",
    sections: [
      {
        h: "כללי",
        p: `אתר זה מופעל על ידי ${site.name}. השימוש באתר, לרבות רכישת מוצרים ושירותים דרכו, מהווה הסכמה לתנאים המפורטים להלן.`,
      },
      {
        h: "המוצרים והשירותים",
        p: "האתר מציע תוכניות ליווי עסקי, מסלולי שפע ומיינדסט, מנוי למועדון העסקים, ספרים ומדריכים דיגיטליים. תיאור מלא של כל מוצר, לרבות היקפו ומה שכלול בו, מופיע בעמוד המוצר. תוכניות הליווי נסגרות בשיחת התאמה, שבה נקבעים גם המסלול ותנאי התשלום.",
      },
      {
        h: "תשלומים",
        p: "המחירים באתר נקובים בשקלים חדשים וכוללים מע״מ. הסליקה מתבצעת בעמוד מאובטח של חברת קארדקום. פרטי כרטיס האשראי אינם עוברים דרך האתר ואינם נשמרים בו. חשבונית נשלחת לכתובת האימייל שנמסרה בהזמנה.",
      },
      {
        h: "מנוי מועדון העסקים",
        p: "ההצטרפות למועדון היא בעלות של 37 ₪ לחודש הראשון, ולאחריו 187 ₪ לחודש בהוראת קבע. המנוי מתחדש אוטומטית בתום כל תקופת חיוב, אלא אם בוטל קודם לכן. אין התחייבות — ניתן לבטל בכל עת, והביטול ייכנס לתוקף בתום תקופת החיוב הנוכחית.",
      },
      {
        h: "ביטול עסקה",
        p: "ביטול עסקה יתבצע בהתאם לחוק הגנת הצרכן, התשמ״א-1981, ולתקנות מכוחו. בקשות ביטול יש לשלוח לכתובת האימייל של המשרד.",
      },
      {
        h: "קניין רוחני",
        p: "כל התכנים באתר ובתוכניות — לרבות הקלטות, מצגות וחומרי עבודה — מוגנים בזכויות יוצרים. אין להעתיק, להפיץ או לשתף אותם ללא אישור בכתב.",
      },
      {
        h: "אחריות",
        p: "התכנים נועדו ללמידה והכוונה עסקית ואינם מהווים ייעוץ פיננסי, משפטי או מיסויי. האחריות ליישום ולתוצאות היא של המשתמשת.",
      },
    ],
  },
  privacy: {
    title: "מדיניות פרטיות",
    sections: [
      {
        h: "המידע שנאסף",
        p: "בעת ביצוע הזמנה נאספים שם מלא, כתובת אימייל, מספר טלפון, ובמידת הצורך מספר תעודת זהות לצורך הנפקת חשבונית.",
      },
      {
        h: "פרטי אשראי",
        p: "פרטי כרטיס האשראי נמסרים ישירות לחברת הסליקה קארדקום בעמוד המאובטח שלה, אינם עוברים דרך האתר ואינם נשמרים בשרתיו בשום שלב.",
      },
      {
        h: "השימוש במידע",
        p: "המידע משמש לביצוע ההזמנה, מתן הגישה לתכנים, הנפקת חשבונית ויצירת קשר בנוגע לרכישה. דיוור שיווקי נשלח רק למי שנתנה לכך הסכמה, וניתן להסיר את עצמך ממנו בכל עת.",
      },
      {
        h: "מסירת מידע לצדדים שלישיים",
        p: "מידע נמסר לספקי שירות הנדרשים להפעלת האתר בלבד — ובכללם חברת הסליקה ומערכת הדיוור — ולא נמכר או מושכר לגורמים אחרים.",
      },
      {
        h: "עוגיות",
        p: "האתר עושה שימוש בעוגיות טכניות הנדרשות לתפעולו, לרבות שמירת תוכן עגלת הקניות במכשיר שלך.",
      },
      {
        h: "זכויותייך",
        p: "ניתן לפנות אלינו בכל עת בבקשה לעיין במידע השמור עלייך, לתקן אותו או למחוק אותו.",
      },
    ],
  },
  accessibility: {
    title: "הצהרת נגישות",
    sections: [
      {
        h: "המחויבות שלנו",
        p: "אנחנו רואים חשיבות בכך שהאתר יהיה שמיש עבור כלל הגולשים, לרבות אנשים עם מוגבלות, ופועלים להתאמתו לתקן הישראלי ת״י 5568 ברמה AA.",
      },
      {
        h: "תפריט הנגישות",
        p: "האתר מופעל עם מערכת „נגיש בקליק”. להצגת תפריט הנגישות יש ללחוץ Control-F10, ולהפעלת קורא המסך Control-F11.",
      },
      {
        h: "מה יושם באתר",
        p: "האתר נבנה עם מבנה כותרות סמנטי, ניווט מלא באמצעות מקלדת עם סימון מיקוד ברור, טקסט חלופי לרכיבים לא טקסטואליים, ניגודיות צבעים מוגברת, וכיבוד העדפת המערכת להפחתת תנועה — שבמצבה הפעיל מכבה את האנימציות ואת התצוגה התלת-ממדית.",
      },
      {
        h: "הסתייגויות",
        p: "ייתכן שבחלקים מסוימים באתר טרם הושלמה ההנגשה. אנחנו ממשיכים לשפר אותו באופן שוטף.",
      },
      {
        h: "פנייה בנושא נגישות",
        p: `נתקלת בבעיית נגישות? נשמח לשמוע ולתקן. ניתן לפנות במייל ${site.email}.`,
      },
    ],
  },
} as const;

type Params = { params: Promise<{ doc: string }> };

export function generateStaticParams() {
  return Object.keys(docs).map((doc) => ({ doc }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { doc } = await params;
  const entry = docs[doc as keyof typeof docs];
  if (!entry) return { title: "העמוד לא נמצא" };
  return { title: entry.title, robots: { index: false, follow: true } };
}

export default async function LegalPage({ params }: Params) {
  const { doc } = await params;
  const entry = docs[doc as keyof typeof docs];
  if (!entry) notFound();

  return (
    <article className="px-5 pt-36 pb-24 sm:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <h1 className="font-display text-4xl font-black text-cream sm:text-5xl">
          {entry.title}
        </h1>

        <div className="mt-12 flex flex-col gap-10">
          {entry.sections.map((section) => (
            <section key={section.h}>
              <h2 className="font-display text-xl font-bold text-gold-lt">
                {section.h}
              </h2>
              <p className="mt-3 leading-relaxed text-cream/65">{section.p}</p>
            </section>
          ))}
        </div>

        <p className="mt-16 rounded-2xl border border-gold/20 bg-void/50 px-5 py-4 text-sm text-cream/45">
          המסמך מעודכן לאחרונה בתאריך העלאת האתר. לשאלות ניתן לפנות לכתובת{" "}
          <a href={`mailto:${site.email}`} className="ltr-nums text-gold-lt">
            {site.email}
          </a>
          .
        </p>
      </div>
    </article>
  );
}
