import { useEffect, useRef, useState, type CSSProperties } from "react";

import Footer10k from "./Footer10k";

// דף הנחיתה של אתגר ה-10,000 ₪ לשכירים (רחלי חדד).
// הסגנון כולו ב-src/challenge.css תחת .c10k, התמונות ב-public/img.

type CSSVars = CSSProperties & Record<`--${string}`, string | number>;

const RAV_MESSER_SRC = "https://form2.ravpage.co.il/7e4da8726cab92dd78ee739ffd9689b36AD87A05";

/**
 * טופס רב מסר. הסקריפט שלהם מצייר את הטופס במקום שבו הוא נטען (כנראה document.write),
 * ולכן הוא רץ בתוך iframe עם srcdoc: שם הוא נטען בזמן פענוח כמו בדף רגיל.
 * base target=_top גורם לשליחה ולהפניה לדף התודה לקרות בחלון הראשי ולא בתוך המסגרת.
 * הגובה של המסגרת מתעדכן לפי התוכן.
 */
function RavMesserForm() {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(420);

  useEffect(() => {
    const frame = ref.current;
    if (!frame) return;
    let ro: ResizeObserver | undefined;
    const fit = () => {
      const doc = frame.contentDocument;
      if (!doc?.body) return;
      setHeight(Math.max(240, doc.documentElement.scrollHeight));
      ro?.disconnect();
      ro = new ResizeObserver(() => setHeight(Math.max(240, doc.documentElement.scrollHeight)));
      ro.observe(doc.body);
    };
    frame.addEventListener("load", fit);
    return () => {
      frame.removeEventListener("load", fit);
      ro?.disconnect();
    };
  }, []);

  const srcDoc = `<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8"><base target="_top">
<style>html,body{margin:0;background:transparent;font-family:Rubik,Arial,sans-serif}</style></head>
<body><script type="text/javascript" src="${RAV_MESSER_SRC}" charset="UTF-8"></script></body></html>`;

  return (
    <iframe
      ref={ref}
      title="טופס הרשמה לאתגר"
      srcDoc={srcDoc}
      style={{ width: "100%", height, border: 0, display: "block", background: "transparent" }}
    />
  );
}

/** כל ההתנהגות של הדף: כניסות בגלילה, כפתור דביק, ציר הערבים ופרלקסה. */
function usePageMotion(root: React.RefObject<HTMLDivElement | null>) {
  const [js, setJs] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    setJs(true);
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];

    // מספור לשורות ברשימות, כדי שייכנסו בתורן
    el.querySelectorAll<HTMLElement>(".list, .strike").forEach((ul) => {
      Array.from(ul.children).forEach((li, i) => (li as HTMLElement).style.setProperty("--i", String(i)));
    });

    // כפתור דביק בנייד: מופיע אחרי מסך הפתיחה, נעלם כשטופס ההרשמה על המסך
    const sticky = el.querySelector<HTMLElement>("#sticky");
    const hero = el.querySelector<HTMLElement>(".hero");
    const reg = el.querySelector<HTMLElement>("#register");
    if (sticky && hero && reg) {
      let heroGone = false;
      let regIn = false;
      const sync = () => {
        const on = heroGone && !regIn;
        sticky.classList.toggle("on", on);
        sticky.setAttribute("aria-hidden", on ? "false" : "true");
        (sticky.firstElementChild as HTMLElement).tabIndex = on ? 0 : -1;
      };
      const a = new IntersectionObserver((e) => { heroGone = !e[0]!.isIntersecting; sync(); });
      const b = new IntersectionObserver((e) => { regIn = e[0]!.isIntersecting; sync(); }, { threshold: 0.15 });
      a.observe(hero);
      b.observe(reg);
      cleanups.push(() => { a.disconnect(); b.disconnect(); });
    }

    // ציר הערבים מתמלא לפי הגלילה, הקשת והפס זזים מעט
    const days = el.querySelector<HTMLElement>(".days");
    const arch = el.querySelector<HTMLElement>(".arch");
    const band = el.querySelector<HTMLElement>(".band__bg");
    const onScroll = () => {
      const vh = window.innerHeight;
      if (days) {
        const r = days.getBoundingClientRect();
        days.style.setProperty("--p", Math.max(0, Math.min(1, (vh * 0.75 - r.top) / r.height)).toFixed(3));
      }
      if (band) {
        const b = (band.parentNode as HTMLElement).getBoundingClientRect();
        const off = Math.max(-1, Math.min(1, (b.top + b.height / 2 - vh / 2) / vh));
        band.style.setProperty("--py", (off * -40).toFixed(1) + "px");
      }
      if (arch) {
        const a = arch.getBoundingClientRect();
        const ao = Math.max(-1, Math.min(1, (a.top + a.height / 2 - vh / 2) / vh));
        arch.style.setProperty("--py", (ao * -24).toFixed(1) + "px");
      }
    };
    if (!reduce) {
      onScroll();
      const h = () => requestAnimationFrame(onScroll);
      window.addEventListener("scroll", h, { passive: true });
      cleanups.push(() => window.removeEventListener("scroll", h));
    }

    // עדויות וידאו: כפתור הפעלה אחיד, ורק סרטון אחד מתנגן בכל רגע
    el.querySelectorAll<HTMLElement>(".vcard").forEach((card) => {
      const v = card.querySelector("video");
      const b = card.querySelector<HTMLButtonElement>(".vcard__play");
      if (!v || !b) return;
      const onClick = () => { void v.play(); };
      const onPlay = () => {
        card.classList.add("is-playing");
        el.querySelectorAll("video").forEach((o) => { if (o !== v) o.pause(); });
      };
      b.addEventListener("click", onClick);
      v.addEventListener("play", onPlay);
      cleanups.push(() => { b.removeEventListener("click", onClick); v.removeEventListener("play", onPlay); });
    });

    // כניסות בגלילה
    const els = el.querySelectorAll(".rv, .rv-r, .rv-l, .rv-s, .days li, .kb");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      }),
      { rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((e) => io.observe(e));
    cleanups.push(() => io.disconnect());

    return () => cleanups.forEach((c) => c());
  }, [root]);

  return js;
}

const TICKER = ["בלי להתפטר", "שעה ממוקדת ביום", "בלי לסכן את הבית", "גם בלי רעיון לעסק", "שלושה ערבים ב־LIVE", "חינם"];

/** כוכב ארבע הקצוות של המותג */
function Star({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0 C12.6 7.2 16.8 11.4 24 12 C16.8 12.6 12.6 16.8 12 24 C11.4 16.8 7.2 12.6 0 12 C7.2 11.4 11.4 7.2 12 0 Z" />
    </svg>
  );
}

/** חץ של כפתורי ההרשמה */
function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

export default function Challenge10k() {
  const root = useRef<HTMLDivElement>(null);
  const js = usePageMotion(root);

  return (
    <div ref={root} className={js ? "c10k js" : "c10k"} dir="rtl" lang="he">

      {/* ============ HERO ============ */}
      <header className="hero">
          <div className="motes" aria-hidden="true">
              <i style={{"--x": "12%", "--y": "18%", "--s": "10px", "--d": "9s", "--dl": "0s"} as CSSVars}></i>
              <i style={{"--x": "26%", "--y": "46%", "--s": "6px", "--d": "11s", "--dl": "2s"} as CSSVars}></i>
              <i style={{"--x": "44%", "--y": "12%", "--s": "7px", "--d": "10s", "--dl": "1s"} as CSSVars}></i>
              <i style={{"--x": "8%", "--y": "70%", "--s": "9px", "--d": "13s", "--dl": "3s"} as CSSVars}></i>
              <i style={{"--x": "36%", "--y": "78%", "--s": "6px", "--d": "12s", "--dl": "4s"} as CSSVars}></i>
          </div>
          <div className="wrap hero__grid">
              <div className="hero__text">
                  <p className="live">
                      <span className="live__dot" aria-hidden="true"></span>
                      <b>LIVE</b>
                      <span>אירוע חינמי בשידור חי</span>
                      <span className="live__sep" aria-hidden="true"></span>
                      <span className="live__date">9–11 בנובמבר 2026 · 20:00</span>
                  </p>
                  <p className="kicker"><Star />אתגר ה־10,000 לשכירים שחולמים על עסק אונליין</p>
                  <h1>
                      יש לכם
                      <span className="amount">10,000 ₪<svg viewBox="0 0 300 20" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M3 14 C70 4 150 6 297 10" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/></svg></span>
                      <span className="soft">נוספים בחודש</span>
                      <span className="whisper">שמסתתרים בתוך הראש שלכם.</span>
                  </h1>
                  <p className="hero__lead">
                      הניסיון, הידע והכישרונות שכבר צברתם יכולים להפוך <strong>לעסק אונליין רווחי.</strong>
                      בואו לגלות איך, <strong>בלי להתפטר</strong>, וגם אם אין לכם עדיין רעיון לעסק.
                  </p>
                  <div className="hero__cta">
                      <a className="btn" href="#register">אני רוצה לשריין מקום בחינם <Arrow /></a>
                      <span className="hero__note">ללא עלות · עד 500 משתתפים בכל ערב</span>
                  </div>
                  <p className="host"><span className="host__pic racheli" aria-hidden="true"></span><span>בהנחיית <b>רחלי חדד</b> · מכפילה עסקים, בונה אימפריות</span></p>
              </div>
              <div className="hero__float">
                  <div className="hero__frame">
                      <div className="hero__photo" role="img" aria-label="רחלי חדד בחליפה בצבע טורקיז, ומאחוריה שני שכירים רצים בגלגל של מרוץ העכברים"></div>
                  </div>
              </div>
          </div>
      </header>

      <div className="wrap">
          <div className="facts rv">
              <div><small>מתי</small><b>9 · 10 · 11 בנובמבר</b></div>
              <div><small>שעה</small><b>20:00–21:00</b></div>
              <div><small>איפה</small><b>אונליין, ב־LIVE</b></div>
          </div>
      </div>

      <div className="ticker" aria-label="בלי להתפטר · שעה ממוקדת ביום · בלי לסכן את הבית · גם בלי רעיון לעסק · שלושה ערבים ב־LIVE · חינם">
          <div className="ticker__track" aria-hidden="true">{[...TICKER, ...TICKER].map((t, i) => <span key={i}>{t}<Star /></span>)}</div>
      </div>

      {/* ============ עדויות ============ */}
      <section className="section proof">
          <div className="wrap">
              <div className="head rv">
                  <span className="eyebrow">הוכחות מהשטח</span>
                  <h2>זה כבר קרה לשכירות שהגיעו בדיוק מהמקום שלכם</h2>
              </div>
          </div>
          <ul className="proof__row proof__row--video rv" aria-label="עדויות בווידאו">
                <li><figure className="vcard">
                    <video src="/video/v4.mp4" poster="/video/p4.jpg" preload="none" playsInline controls aria-label="עדות בווידאו: משכירה לעצמאית"></video>
                    <button type="button" className="vcard__play" aria-label="הפעלת עדות בווידאו: משכירה לעצמאית"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></button>
                </figure></li>
                <li><figure className="vcard">
                    <video src="/video/v5.mp4" poster="/video/p5.jpg" preload="none" playsInline controls aria-label="עדות בווידאו: מנהלת משרד מרחוק לבעלי עסקים"></video>
                    <button type="button" className="vcard__play" aria-label="הפעלת עדות בווידאו: מנהלת משרד מרחוק לבעלי עסקים"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></button>
                </figure></li>
                <li><figure className="vcard">
                    <video src="/video/v2.mp4" poster="/video/p2.jpg" preload="none" playsInline controls aria-label="עדות בווידאו של בוגרת התוכנית"></video>
                    <button type="button" className="vcard__play" aria-label="הפעלת עדות בווידאו של בוגרת התוכנית"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></button>
                </figure></li>
                <li><figure className="vcard">
                    <video src="/video/v1.mp4" poster="/video/p1.jpg" preload="none" playsInline controls aria-label="עדות בווידאו של בוגרת התוכנית"></video>
                    <button type="button" className="vcard__play" aria-label="הפעלת עדות בווידאו של בוגרת התוכנית"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></button>
                </figure></li>
                <li><figure className="vcard">
                    <video src="/video/v3.mp4" poster="/video/p3.jpg" preload="none" playsInline controls aria-label="עדות בווידאו של בוגרת התוכנית"></video>
                    <button type="button" className="vcard__play" aria-label="הפעלת עדות בווידאו של בוגרת התוכנית"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></button>
                </figure></li>
          </ul>
          <p className="proof__hint" aria-hidden="true">← גללו לצד לעוד סרטונים</p>
      </section>

      {/* ============ בואו נדבר דוגרי ============ */}
      <section className="section">
          <div className="wrap">
              <div className="head rv">
                  <span className="eyebrow">בואו נדבר דוגרי</span>
                  <h2>אתם לא חולמים על עוד משכורת.<br /><span className="serif" style={{color: "var(--teal-soft)"} as CSSVars}>אתם חולמים להפסיק להיות תלויים בה.</span></h2>
                  <p>נמאס לכם שמישהו אחר מחליט מתי תקומו, כמה תרוויחו ומתי מותר לכם לצאת לחופשה. נמאס לכם לתת את השעות הכי טובות שלכם לעבודה של מישהו אחר, ולשמור את החלומות שלכם לערבים, לסופי השבוע ול„יום אחד”.</p>
              </div>
              <figure className="shot dream kb rv-s"><img src="/img/stuck.webp" alt="שני שכירים עייפים מול מחשבים במשרד" width="1672" height="941" /></figure>

              <p className="center rv" style={{fontWeight: "600", fontSize: "1.3rem", color: "var(--teal)", marginBottom: "24px"} as CSSVars}>אתם לא רוצים רק עוד 2,000 ₪ בחודש. אתם רוצים</p>
              <div className="cards">
                  <article className="card rv" style={{"--d": "1"} as CSSVars}><span className="ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg></span><h3>לבנות משהו ששייך לכם</h3></article>
                  <article className="card rv" style={{"--d": "2"} as CSSVars}><span className="ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.8V16h5v-.3c0-.7.4-1.4 1-1.8A6 6 0 0 0 12 3z"/></svg></span><h3>להרוויח מהידע והכישרונות שלכם</h3></article>
                  <article className="card rv" style={{"--d": "3"} as CSSVars}><span className="ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/></svg></span><h3>לעבוד מכל מקום בעולם</h3></article>
                  <article className="card rv" style={{"--d": "4"} as CSSVars}><span className="ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg></span><h3>להיות הרבה יותר עם המשפחה</h3></article>
              </div>
              <p className="center rv" style={{marginTop: "28px", color: "var(--ink-soft)", fontSize: "1.1rem"} as CSSVars}>ולדעת שההכנסה שלכם כבר לא מוגבלת למה שמישהו אחר החליט לשלם לכם.</p>

              <div className="panel panel--split rv-s" style={{marginTop: "clamp(44px,7vw,72px)"} as CSSVars}>
                  <figure className="shot kb"><img src="/img/crossroads.webp" alt="שלט עץ בצומת של שני שבילים, בשקיעה" width="1200" height="675" /></figure>
                  <div>
                  <Star className="star" />
                  <h3>אבל אתם תקועים בין שני עולמות.</h3>
                  <div className="two">
                      <p>מצד אחד, אתם כבר לא מוכנים להמשיך ככה.</p>
                      <p>מצד שני, אתם לא יכולים פשוט להתפטר ולסכן את הבית.</p>
                  </div>
                  </div>
              </div>

              <div className="statement rv" style={{marginTop: "clamp(56px,8vw,88px)"} as CSSVars}>
                  <p className="serif">אתם לא צריכים לבחור בין המשכורת שלכם לבין החופש שלכם.</p>
                  <h2>אתם צריכים לבנות את החופש בזמן שהמשכורת עדיין נכנסת.</h2>
              </div>
          </div>
      </section>

      {/* ============ שלושת הערבים ============ */}
      <section id="days" className="section deep grain">
          <div className="wrap">
              <div className="head rv">
                  <span className="eyebrow">שלושה ערבים, שלושה שלבים</span>
                  <h2>איך לבנות הכנסה של חמש ספרות לצד העבודה</h2>
                  <p>עם שעה אחת ממוקדת ביום. בלי לשרוף את הספינות, בלי להמר על העתיד, ובלי לסכן את הבית.</p>
              </div>
              <ol className="days">
                  <li className="rv"><span className="days__n" aria-hidden="true">1</span><div>
                      <img className="days__ic" src="/img/ic-diamond.webp" alt="" width="260" height="230" style={{"--k": "1"} as CSSVars} />
                      <small>ערב ראשון · 9 בנובמבר · 20:00</small>
                      <h3>איתור היהלום: הפיכת הידע והכישרון לרעיון מנצח</h3>
                      <p>איך לגלות מה הידע שכבר קיים אצלכם שאנשים ישמחו לשלם עליו, גם אם כרגע אין לכם מושג מה למכור.</p></div></li>
                  <li className="rv"><span className="days__n" aria-hidden="true">2</span><div>
                      <img className="days__ic" src="/img/ic-offer.webp" alt="" width="260" height="230" style={{"--k": "2"} as CSSVars} />
                      <small>ערב שני · 10 בנובמבר · 20:00 <span className="tag">הלב של האתגר</span></small>
                      <h3>בונים הצעה שאי אפשר להתעלם ממנה</h3>
                      <p>אריזת הידע שלכם להצעה מדויקת, שמושכת אליכם את הלקוחות הנכונים שמעריכים את מה שיש לכם לתת.</p></div></li>
                  <li className="rv"><span className="days__n" aria-hidden="true">3</span><div>
                      <img className="days__ic" src="/img/ic-map.webp" alt="" width="260" height="230" style={{"--k": "3"} as CSSVars} />
                      <small>ערב שלישי · 11 בנובמבר · 20:00</small>
                      <h3>מפת הדרך לעסק של 10,000 ₪ בחודש</h3>
                      <p>הנוסחה המלאה לבניית עסק שמכניס חמש ספרות בחודש לצד המשכורת, צעד אחר צעד, עד לבחירה מתי ואיך לעזוב.</p></div></li>
              </ol>
              <div className="center-cta rv">
                  <a className="btn btn--gold" href="#register">אני רוצה לשריין מקום לשלושת הערבים <Arrow /></a>
              </div>
          </div>
      </section>

      {/* ============ צריך / לא צריך ============ */}
      <section className="section">
          <div className="wrap">
              <div className="needwrap rv-s" style={{marginTop: "0"} as CSSVars}>
              <figure className="shot need__img kb"><img src="/img/checklist.webp" alt="לוח כתיבה עם רשימת משימות מסומנות, ספל קפה ועט זהב" width="1200" height="675" /></figure>
              <div className="need">
                  <div className="need__no">
                      <h3>אתם לא צריכים כרגע</h3>
                      <ul className="strike">
                          <li>רעיון גאוני</li><li>אתר מקצועי יקר</li><li>אלפי עוקבים ברשתות</li><li>לוגו מושלם</li><li>משרד או עובדים</li><li>ניסיון קודם בעסקים</li>
                      </ul>
                  </div>
                  <div className="need__yes">
                      <h3>אתם כן צריכים</h3>
                      <ul className="list">
                          <li>בעיה אמיתית שאתם מסוגלים לפתור</li>
                          <li>אדם מדויק שצריך את הפתרון הזה</li>
                          <li>הצעה ברורה שהוא ירצה לקנות</li>
                          <li>דרך פשוטה להגיע אליו</li>
                          <li>ושעה ממוקדת אחת ביום כדי להתחיל</li>
                      </ul>
                  </div>
              </div>
              </div>
          </div>
      </section>

      {/* ============ לא שורפים את הספינות ============ */}
      <section className="section">
          <div className="wrap narrow">
              <div className="head rv" style={{marginBottom: "0"} as CSSVars}>
                  <span className="eyebrow">הפילוסופיה של רחלי</span>
                  <h2>אני לא מאמינה בלשרוף את הספינות</h2>
              </div>
              <div className="note rv">
                  <p className="serif">„פשוט תתפטרו. תקפצו למים. אם תהיו רעבים מספיק, תצליחו.”</p>
                  <small>יש אנשים שיגידו לכם את זה. בעיניי, זו אחת העצות המסוכנות ביותר שאפשר לתת לשכיר שחולם על עצמאות.</small>
              </div>
              <div className="prose rv">
                  <p><strong>לחץ הישרדותי לא בהכרח הופך אתכם ליזמים טובים יותר.</strong> הוא גורם לכם להתפשר, להילחץ ולקבל החלטות מתוך פחד וחוסר שקט.</p>
                  <p>כשפתחתי עסק מהנייד, לא סגרתי מיד את עסק הפילאטיס שלי. <strong>חיכיתי עד שהעסק החדש הכניס 30,000 ₪ בחודש.</strong></p>
                  <p>וכשנכנסתי לעולם הליווי העסקי, לא עזבתי את העסק הקודם שלי עד שהעסק החדש הגיע להכנסה של שש ספרות בחודש.</p>
              </div>
          </div>
          <p className="punch rv wrap">לא שורפים את הספינות.<span>בונים ספינה חדשה בזמן שהמשכורת עדיין מממנת את הדרך.</span></p>
          <div className="mid-cta rv"><a className="btn" href="#register">אני רוצה לבנות את הספינה שלי <Arrow /></a></div>
      </section>

      {/* ============ מתאים / לא מתאים ============ */}
      <section className="section">
          <div className="wrap">
              <div className="head rv">
                  <span className="eyebrow">בדיקת התאמה</span>
                  <h2>האם האתגר הזה נכון לכם?</h2>
              </div>
              <div className="fit">
                  <div className="card rv-r">
                      <h3>האתגר מיועד לכם אם</h3>
                      <ul className="list">
                          <li>אתם שכירים שחולמים לבנות עסק משלכם.</li>
                          <li>אתם רוצים ליצור הכנסה נוספת לצד המשכורת.</li>
                          <li>יש בכם ידע וכישרון שלא באים לידי ביטוי בעבודה.</li>
                          <li>אנשים כבר מבקשים מכם עצות או עזרה בתחום מסוים.</li>
                          <li>אין לכם כרגע רעיון, קהל או ניסיון בשיווק.</li>
                          <li>אתם רוצים להתחיל בחוכמה לפני שאתם מתפטרים.</li>
                          <li>אתם מוכנים להקדיש שעה ביום כדי לבנות אפשרות חדשה.</li>
                      </ul>
                  </div>
                  <div className="card rv-l">
                      <h3>הוא לא מתאים לכם אם</h3>
                      <ul className="list list--no">
                          <li>כבר יש לכם עסק פעיל ומבוסס.</li>
                          <li>אתם מחפשים כסף מהיר בלי לתת ערך אמיתי.</li>
                          <li>אתם רוצים שמישהו יבנה את העסק במקומכם.</li>
                          <li>אתם לא מוכנים לבדוק, לשווק, למכור ולפעול.</li>
                          <li>אתם מחפשים הבטחת הכנסה בלי קשר למאמץ וליישום שלכם.</li>
                      </ul>
                      <p className="fine">האתגר לא מבטיח שתקומו אחרי שלושה ימים עם 10,000 ₪ בחשבון. הוא ייתן לכם את הרעיון, ההצעה ומפת הדרך לבניית עסק שמכוון להכנסה כזו.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* ============ הסיפור של רחלי ============ */}
      <section className="section about">
          <div className="wrap about__grid">
              <div className="arch racheli rv-s" role="img" aria-label="רחלי חדד יושבת עם מחשב נייד על רציף מול הים בשקיעה"></div>
              <div className="rv" style={{"--d": "1"} as CSSVars}>
                  <span className="eyebrow">הסיפור מאחורי השיטה</span>
                  <h2>לפני תשע שנים רציתי רק עוד 2,000 ₪ בחודש</h2>
                  <div className="prose">
                      <p>פתחתי עסק אונליין קטן מהטלפון. לא ידעתי שהצעד הזה ישנה את כל החיים שלי.</p>
                      <p>לא ידעתי שהוא יאפשר לי לבנות עסקים של שש ספרות בחודש, לטייל בעולם עם המשפחה שלי, לעבוד מכל מקום וליצור חיים שבהם הזמן שלי שייך לי.</p>
                  </div>
                  <div className="note">
                      <p className="serif">התחלתי בשביל עוד קצת כסף. אבל מה שבניתי נתן לי חופש לבחור.</p>
                      <small>איפה לחיות. עם מי לעבוד. כמה להרוויח. ואיך ייראו החיים שלי.</small>
                  </div>
                  <p style={{marginTop: "24px", fontWeight: "600", fontSize: "1.15rem", color: "var(--teal)"} as CSSVars}>אולי גם העסק שלכם כבר מסתתר בתוך הדברים שאתם יודעים לעשות היום.</p>
                  <a className="btn" href="#register" style={{marginTop: "22px"} as CSSVars}>בואו נמצא אותו יחד, בחינם <Arrow /></a>
              </div>
          </div>
      </section>

      {/* ============ מה יאפשרו לכם ============ */}
      <section className="section" style={{paddingTop: "clamp(40px,6vw,72px)"} as CSSVars}>
          <div className="wrap">
              <div className="head rv">
                  <span className="eyebrow">המשמעות האמיתית</span>
                  <h2>מה יאפשרו לכם עוד 10,000 ₪ בחודש?</h2>
              </div>
              <div className="cards cards--img" style={{gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))"} as CSSVars}>
                  <article className="card rv" style={{"--d": "1"} as CSSVars}><figure className="kb" style={{margin: "0", overflow: "hidden"} as CSSVars}><img src="/img/b-lock.webp" alt="" width="448" height="506" /></figure><div><h3>עצמאות מהמשכורת</h3><p>להפסיק להיות תלויים רק במשכורת אחת ובגחמות של מעסיק.</p></div></article>
                  <article className="card rv" style={{"--d": "2"} as CSSVars}><figure className="kb" style={{margin: "0", overflow: "hidden"} as CSSVars}><img src="/img/b-clock.webp" alt="" width="474" height="506" /></figure><div><h3>הורדת שעות</h3><p>להוריד בהדרגה שעות בעבודה ולבנות כרית ביטחון לפני המעבר.</p></div></article>
                  <article className="card rv" style={{"--d": "3"} as CSSVars}><figure className="kb" style={{margin: "0", overflow: "hidden"} as CSSVars}><img src="/img/b-family.webp" alt="" width="486" height="506" /></figure><div><h3>זמן עם המשפחה</h3><p>להיות יותר עם הילדים, לטייל בלי לחכות לאישור חופשה מראש.</p></div></article>
              </div>
              <p className="punch rv">לא להישאר בעבודה כי אין ברירה.<span>להישאר או לעזוב, מתוך בחירה.</span></p>
              <div className="band">
                                    <div className="band__bg" style={{backgroundImage: "url(/img/choice.webp)"} as CSSVars} role="img" aria-label="אישה וגבר נינוחים מול נוף בשקיעה, כל אחד עם מחשב נייד"></div>
              </div>
          </div>
      </section>

      {/* ============ עדויות כתובות ============ */}
      {/* עדויות אמיתיות מהקבוצות. לפרסם רק באישור הכותבות. */}
      <section className="section words">
          <div className="wrap">
              <div className="head rv">
                  <span className="eyebrow">מה הן כותבות</span>
                  <h2>עדויות מהשטח, במילים שלהן</h2>
              </div>
          </div>
          <ul className="proof__row rv" aria-label="עדויות של בוגרות">
                      <li><img src="/img/t-mazal.webp" alt="מזל רוס: לפני שנה וחצי הייתי במינוס של 100,000 ש&quot;ח. מאז שנצמדתי לרחלי התבגרתי כלכלית, התחלתי להשקיע, והיום יש לי 5 דירות. יצאתי לעצמאות, וכל זה בשנה וחצי בלבד." width="600" height="1067" loading="lazy" /></li>
                      <li><img src="/img/t-orly.webp" alt="אורלי דהן מאיה, בוגרת תוכנית לצאת לעצמאות: הגעתי בתור שכירה, וכעבור 4 חודשים בתוכנית אני עצמאית שמרוויחה 8 אלף בחודש. יש לי לקוחות קבועים." width="600" height="1067" loading="lazy" /></li>
                      <li><img src="/img/t-miriam.webp" alt="מרים טויטו, בוגרת תוכנית לצאת לעצמאות: מאז שנכנסתי לתוכנית הרווחתי 6000 ש&quot;ח, והיד עוד נטויה." width="600" height="1067" loading="lazy" /></li>
                      <li><img src="/img/t-shlomit.webp" alt="שלומית, בוגרת תוכנית לצאת לעצמאות: התפטרתי מהעבודה שלי כשכירה. היום יש לי עסק, מוצר מפותח ונמכר, והכי חשוב: זמן להיות עם הילדים." width="600" height="1067" loading="lazy" /></li>
                      <li><img src="/img/t-adva.webp" alt="אדווה יעקובוביץ׳, פתרונות דיגיטליים לעסקים: מאז שהצטרפתי לתוכנית הקמתי 3 אתרים. כבר במהלך הקורס מכרתי באלפי דולרים ושלחתי כמעט 10 הצעות מחיר." width="600" height="1067" loading="lazy" /></li>
          </ul>
          <p className="proof__hint" aria-hidden="true">← גללו לצד לעוד עדויות</p>
          <div className="wrap">
              <div className="whatsapp rv">
                  <figure className="wa"><img src="/img/wa-yonit.webp" alt="הודעת וואטסאפ מיונית קינגר: הכנסות של 15,000 בחודש אחרי מלחמה, כמה לידים, התפתחויות ודברים קורים, אני לא עומדת בקצב. תודה." width="760" height="507" loading="lazy" /></figure>
                  <figure className="wa"><img src="/img/wa-sagit.webp" alt="הודעת וואטסאפ משגית רז: אני מודה על תכנית הליווי משכירה לעצמאית. יש לי הכנסה מדי חודש של 3,000 ש״ח, לקוחות סופר מרוצים, ויש לי כבר שלושה מוצרים איכותיים." width="760" height="814" loading="lazy" /></figure>
                  <figure className="wa"><img src="/img/wa-lorin.webp" alt="הודעת וואטסאפ מלורין יצחק: היה זום מעולה היום! יש לי מלא עבודה ומלא לצאת מהאזור נוחות שלי, ואני לגמרי הולכת לעשות את זה. תודה רחלי." width="760" height="199" loading="lazy" /></figure>
                  <figure className="wa"><img src="/img/wa-energy.webp" alt="הודעת וואטסאפ ממשתתפת: אחרי שנתיים של דיכאון אחרי לידה, האנרגיה שלי לא רק חזרה, היא הכפילה את עצמה, בזכות הפעילות שלי פה. אני רושמת את זה עם דמעות של שמחה." width="760" height="841" loading="lazy" /></figure>
              </div>
          </div>
      </section>

      {/* ============ שאלות נפוצות ============ */}
      <section className="section faq" style={{paddingTop: "clamp(40px,6vw,72px)"} as CSSVars}>
          <div className="wrap narrow">
              <div className="head rv">
                  <span className="eyebrow">לפני שנרשמים</span>
                  <h2>שאלות נפוצות</h2>
              </div>
              <div className="faq__list rv">
                <details className="faq__item"><summary>כמה זמן נמשך כל ערב?</summary><p>שעה אחת, מ־20:00 עד 21:00.</p></details>
                <details className="faq__item"><summary>מה אם פספסתי ערב?</summary><p>ההקלטה של כל ערב זמינה ל־24 שעות אחרי השידור.</p></details>
                <details className="faq__item"><summary>יש מגבלת משתתפים?</summary><p>כן. כל שידור מוגבל ל־500 משתתפים, ולכן כדאי להיכנס בזמן.</p></details>
                <details className="faq__item"><summary>כמה זה עולה?</summary><p>כלום. שלושת הערבים חינמיים לגמרי.</p></details>
              </div>
          </div>
      </section>

      {/* ============ הרשמה ============ */}
      <section id="register" className="section deep grain">
          <div className="wrap">
              <div className="reg">
                  <div className="rv">
                      <span className="eyebrow">100% חינם · הרשמה מיידית</span>
                      <h2 style={{marginTop: ".4em"} as CSSVars}>שלושה ערבים. שלושה שלבים.<span className="serif">מפת דרך אחת מהמשכורת לעסק משלכם.</span></h2>
                      <p className="reg__when">9, 10 ו־11 בנובמבר 2026 · בכל ערב ב־20:00</p>
                      <p className="reg__sub">הזימון לשידורים החיים יישלח למייל ולוואטסאפ, ללא שום עלות. כל ערב נמשך שעה, ומספר המשתתפים מוגבל ל־500.</p>
                      <div className="reg__close">
                          <b>הזמן יעבור בכל מקרה...</b>
                          <p>השאלה היא אם תישארו עם אותה משכורת, אותו תסכול ואותו חלום שאתם דוחים, או שתתחילו לבנות לעצמכם מקור הכנסה חדש בלי להתפטר ובלי לסכן את הבית.</p>
                      </div>
                  </div>
                  <div className="form rv" style={{"--d": "1"} as CSSVars}>
                      <h3>כן, אני רוצה להצטרף לאתגר ה־10,000 ₪</h3>
                      <p className="form__sub">ממלאים פרטים, ומקבלים את הקישור לשלושת הערבים.</p>
                      <RavMesserForm />
                  </div>
              </div>
              <p className="farewell rv">אל תחכו ליום שבו תהיו אמיצים מספיק לעזוב. תתחילו היום לבנות משהו שיהפוך את העזיבה לבחירה.</p>
          </div>
      </section>

      <div className="c10k-sticky" id="sticky" aria-hidden="true">
          <a className="btn" href="#register" tabIndex={-1}>אני רוצה לשריין מקום בחינם</a>
      </div>

      <Footer10k />
    </div>
  );
}
