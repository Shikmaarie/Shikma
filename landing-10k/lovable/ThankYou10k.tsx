import { useEffect } from "react";

// דף התודה של אתגר ה-10,000 ₪ לשכירים. רב מסר מפנה לכאן אחרי הרשמה.
// משתמש באותו src/challenge.css (תחת .c10k) ובאותן תמונות ב-public/img.

const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/DbAcSR37Cj1BxN5JQGrguA";
// TODO: קישור לעמוד הזמנת הספר. כל עוד ריק, חלק הספר לא מוצג.
const BOOK_URL = "";

const EVENINGS = [
  { n: 1, date: "20261109", label: "ערב ראשון · יום שני, 9 בנובמבר", title: "איתור היהלום" },
  { n: 2, date: "20261110", label: "ערב שני · יום שלישי, 10 בנובמבר", title: "בונים הצעה שאי אפשר להתעלם ממנה" },
  { n: 3, date: "20261111", label: "ערב שלישי · יום רביעי, 11 בנובמבר", title: "מפת הדרך לעסק של 10,000 ₪ בחודש" },
];

/** קישור "הוספה ליומן גוגל" לערב אחד, 20:00–21:00 שעון ישראל */
function calendarUrl(e: (typeof EVENINGS)[number]) {
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: `אתגר ה־10,000 לשכירים · ערב ${e.n}: ${e.title}`,
    dates: `${e.date}T200000/${e.date}T210000`,
    ctz: "Asia/Jerusalem",
    details: `שידור חי עם רחלי חדד. הקישור לזום נשלח בקבוצת הוואטסאפ של האתגר: ${WHATSAPP_GROUP_URL}`,
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

function Star() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0 C12.6 7.2 16.8 11.4 24 12 C16.8 12.6 12.6 16.8 12 24 C11.4 16.8 7.2 12.6 0 12 C7.2 11.4 11.4 7.2 12 0 Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.4.8 3.2.6a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z" />
    </svg>
  );
}

export default function ThankYou10k() {
  // המרה: מי שהגיע לכאן נרשם. הפיקסל עצמו נטען ב-__root.
  useEffect(() => {
    const w = window as unknown as { fbq?: (...a: unknown[]) => void };
    w.fbq?.("track", "CompleteRegistration", { content_name: "אתגר 10,000 לשכירים" });
    // TODO: המרת Google Ads: gtag('event', 'conversion', { send_to: 'AW-18493911944/<LABEL>' })
  }, []);

  return (
    <div className="c10k ty" dir="rtl" lang="he">
      <header className="ty__hero">
        <div className="wrap narrow center">
          <p className="ty__check" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
          </p>
          <h1>נרשמתם! המקום שלכם שמור.</h1>
          <p className="ty__lead">נשאר עוד צעד אחד קטן, והוא החשוב ביותר.</p>
        </div>
      </header>

      <section className="ty__step">
        <div className="wrap narrow">
          <div className="ty__card ty__card--wa">
            <span className="ty__badge">שלב אחרון</span>
            <h2>הצטרפו לקבוצת הוואטסאפ של האתגר</h2>
            <p>
              <strong>הקישור לזום של כל ערב נשלח רק בקבוצה.</strong> שם גם יגיעו התזכורות,
              המשימות הקטנות בין הערבים וההקלטות.
            </p>
            <a className="btn ty__wa" href={WHATSAPP_GROUP_URL} target="_blank" rel="noopener">
              <WhatsAppIcon /> להצטרפות לקבוצה
            </a>
            <small>הקבוצה שקטה: רק רחלי והצוות שולחים הודעות.</small>
          </div>
        </div>
      </section>

      <section className="ty__when">
        <div className="wrap narrow">
          <h2 className="center">שמרו ביומן את שלושת הערבים</h2>
          <p className="center ty__sub">כל ערב 20:00–21:00 בשידור חי. ההקלטה זמינה ל־24 שעות בלבד.</p>
          <ol className="ty__list">
            {EVENINGS.map((e) => (
              <li key={e.n}>
                <span className="days__n" aria-hidden="true">{e.n}</span>
                <div>
                  <small>{e.label} · 20:00</small>
                  <b>{e.title}</b>
                </div>
                <a className="ty__cal" href={calendarUrl(e)} target="_blank" rel="noopener">
                  + ליומן
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ty__task">
        <div className="wrap narrow">
          <div className="ty__card">
            <span className="ty__badge ty__badge--gold"><Star /> משימת חימום</span>
            <h2>עד הערב הראשון: 3 דברים</h2>
            <p>
              כתבו 3 דברים שאנשים באים לשאול אתכם עליהם עצה. בעבודה, במשפחה, בין חברים.
              בערב הראשון נמצא ביניהם את היהלום שלכם.
            </p>
          </div>
        </div>
      </section>

      {BOOK_URL && (
      <section className="ty__offer">
        <div className="wrap">
          <div className="ty__book">
            <img src="/img/racheli-sea.webp" alt="רחלי חדד" width="760" height="1140" />
            <div>
              <span className="ty__badge ty__badge--gold">רק למי שנרשם לאתגר</span>
              <h2>רוצים להגיע לערב הראשון עם יתרון?</h2>
              <p>
                <strong>„ה־100K הראשון שלי”</strong> הוא הספר שבו רחלי מספרת איך בנתה את העסק הראשון שלה,
                עם המודלים העסקיים שהיא מלמדת. הספר עצמו חינם, משלמים רק דמי משלוח של 45 ₪.
              </p>
              <a className="btn btn--gold" href={BOOK_URL} target="_blank" rel="noopener">
                אני רוצה את הספר
              </a>
            </div>
          </div>
        </div>
      </section>
      )}

      <footer>
        <b>אתגר ה־10,000 ₪ לשכירים · רחלי חדד</b>
        <br />9, 10 ו־11 בנובמבר 2026 · אונליין ב־LIVE
      </footer>
    </div>
  );
}
