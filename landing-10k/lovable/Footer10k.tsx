import { Link } from "@tanstack/react-router";

// הפוטר המשותף לדף הנחיתה ולעמודי הפרטיות והנגישות.
// הקרדיט של שקמה בשורה נפרדת, בכוונה.
const PORTFOLIO_URL = "https://rough-unit-6636.shikma26.workers.dev/";

export default function Footer10k() {
  return (
    <footer>
      <b>אתגר ה־10,000 ₪ לשכירים · רחלי חדד</b>
      <br />
      9, 10 ו־11 בנובמבר 2026 · אונליין ב־LIVE
      <small>
        האתגר מציע ידע, כלים ומתודולוגיות עסקיות. הצלחה בעסקים דורשת יישום, התמדה ועבודה בפועל.
      </small>
      <nav className="foot__nav" aria-label="מידע משפטי">
        <Link to="/privacy">מדיניות פרטיות</Link>
        <span aria-hidden="true">·</span>
        <Link to="/accessibility">הצהרת נגישות</Link>
      </nav>
      <small>© 2026 כל הזכויות שמורות לרחלי חדד</small>
      <p className="foot__credit">
        עיצוב ובניית אתרים:{" "}
        <a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer">
          שקמה אושרי אריה
        </a>
      </p>
    </footer>
  );
}
