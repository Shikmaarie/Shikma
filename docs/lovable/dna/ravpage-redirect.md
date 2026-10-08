# הפניה מרב מסר לדף התודה

המטרה: אחרי שנרשמת שולחת את הטופס, להעביר אותה ל-`/thanks` באתר.

התצוגה עם כפתור העתקה: https://claude.ai/artifact/Af2Jps9HeyD1Sxi9teSFsg

## למה צריך קוד ולא רק כתובת

טופס רב מסר רץ **בתוך iframe** בדף הנחיתה. הקוד שמייצר אותו נמצא ב-
`src/routes/index.tsx`, בקומפוננטה `RavPageForm`, והוא כותב את הטופס לתוך
iframe באמצעות `document.write`.

לכן הפניה רגילה (`location.href = ...`) תטען את דף התודה **בתוך המסגרת
הקטנה של הטופס**, במקום להחליף את כל העמוד. הקוד חייב לצאת לחלון העליון.

זה מותר: ה-iframe נוצר על ידי הדף שלנו ואין לו `src` חיצוני, ולכן הוא חולק
את ה-origin של האתר. נבדק בדפדפן ולא הונח.

## קטע אחד, מתאים לשני המקומות

קודם היו כאן שני קטעים נפרדים, אחד לדף הטופס ואחד לדף התודה, וזה דרש לדעת
מראש לאיזה מהם מדביקים. הקטע הנוכחי מזהה לבד:

| מצב | מה הקוד עושה |
| --- | --- |
| יש טופס על המסך | ממתין. לא מפנה כלום |
| היה טופס ונעלם | זו ההגשה. מפנה |
| לא הופיע טופס תוך 8 שניות | זה דף תודה. מפנה |

הסף של 8 שניות ארוך בכוונה. טעינת הטופס נמדדה בפרודקשן בין 450 ל-1,616
אלפיות השנייה (`form_load_events` ב-Supabase), אז 8 שניות הן בערך פי חמישה
מהמקרה הגרוע שנצפה. עדיף להמתין מאשר להעיף נרשמת מהטופס לפני שמילאה אותו.

הזיהוי לא מתבסס על אירוע `submit`, כי [ההערה בקוד החי](../../../src/routes/index.tsx)
מתעדת שהאירוע הזה לא נורה אף פעם בפרודקשן: אפס רשומות ב-`registrations`
הגיעו ממנו.

## הקוד

```html
<div id="rh-go" style="font-family:Assistant,Arial,sans-serif;text-align:center;padding:20px 16px;font-size:17px;line-height:1.7;color:#1f2124">
  ההרשמה נקלטה. מעבירים אותך לדף הכנס&hellip;
  <br>
  <a href="https://moneymindb.rachelihadad.co.il/thanks" target="_top"
     style="display:inline-block;margin-top:10px;color:#0e4c52;font-weight:700">
    לא עברת? לחצי כאן
  </a>
</div>

<script>
(function () {
  var DEST = "https://moneymindb.rachelihadad.co.il/thanks";
  var done = false;
  var seenForm = false;
  var started = Date.now();

  function go() {
    if (done) return;
    done = true;

    // הטופס רץ בתוך מסגרת בדף הנחיתה. בלי לצאת לחלון העליון, דף התודה
    // ייטען בתוך הקופסה הקטנה של הטופס במקום להחליף את כל העמוד.
    var w = window;
    try { if (window.top && window.top !== window) w = window.top; } catch (e) {}

    // replace ולא href, כדי שכפתור "חזור" לא יחזיר לטופס שכבר נשלח.
    try { w.location.replace(DEST); } catch (e) { window.location.replace(DEST); }
  }

  function hasForm() {
    return !!document.querySelector(
      'form input:not([type="hidden"]), form textarea, form select'
    );
  }

  var tick = setInterval(function () {
    if (done) { clearInterval(tick); return; }

    if (hasForm()) {
      // יש טופס על המסך. זה דף הטופס, ועוד לא נשלח כלום.
      seenForm = true;
      return;
    }

    if (seenForm) {
      // הטופס היה ונעלם. רב מסר החליף אותו בהודעת תודה, כלומר נשלח.
      clearInterval(tick);
      go();
      return;
    }

    // לא הופיע טופס אף פעם. אחרי שמונה שניות זה כבר לא "עוד נטען" אלא
    // דף תודה.
    if (Date.now() - started > 8000) {
      clearInterval(tick);
      go();
    }
  }, 400);

  // לא משאירים טיימר רץ לנצח על הדף
  setTimeout(function () { clearInterval(tick); }, 600000);
})();
</script>
```

## האלטרנטיבה, בלי לגעת ברב מסר

הדף שלנו כבר מזהה את אותו רגע: ב-`RavPageForm` יש בדיקה שרושמת
`form_gone_after_ready` ל-Supabase כשהטופס נעלם אחרי שהיה קיים. אפשר
להוסיף שם שורה שמפנה ל-`/thanks`.

| | ברב מסר | אצלנו |
| --- | --- | --- |
| שורד שינוי טופס ברב מסר | לא בהכרח | כן |
| עובד אם הטופס מוטמע במקום אחר | כן | לא |
| דורש דחיפה ללאבאבל | לא | כן |

שניהם משתמשים ב-`replace` ובדגל `done`, ולכן גם אם שניהם פועלים אין כפילות.

## בדיקה אחרי ההטמעה

1. למלא את הטופס באמת, מהטלפון.
2. לוודא שדף התודה נפתח **על כל המסך** ולא בתוך קופסה.
3. ללחוץ „חזור” בדפדפן ולוודא שלא חוזרים לטופס שכבר נשלח.
4. לוודא שההרשמה נכנסה לרב מסר כרגיל.
5. לוודא ב-Events Manager של מטא שאירוע `Lead` נקלט.
