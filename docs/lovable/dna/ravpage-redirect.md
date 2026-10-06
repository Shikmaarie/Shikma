# הפניה מרב מסר לדף התודה

המטרה: אחרי שנרשם שולח את הטופס, להעביר אותו ל-`/thanks` באתר.

## למה זה לא סתם „הפניה אחרי שליחה”

טופס רב מסר רץ **בתוך iframe** בדף הנחיתה. הקוד שמייצר אותו נמצא ב-
`src/routes/index.tsx`, בקומפוננטה `RavPageForm`, והוא כותב את הטופס לתוך
iframe באמצעות `document.write`.

המשמעות: הפניה רגילה (`location.href = ...`) תטען את דף התודה **בתוך
המסגרת הקטנה של הטופס**, במקום להחליף את כל העמוד. הנרשם יראה דף תודה
מוקטן בתוך קופסה. לכן הקוד חייב לפרוץ לחלון העליון.

חדשות טובות: ה-iframe נוצר על ידי הדף שלנו ואין לו `src` חיצוני, ולכן הוא
חולק את המקור (origin) של האתר. גישה ל-`window.top` ממנו מותרת.

---

## קטע א — המומלץ

**לאן:** לתוך דף התודה או הודעת התודה של רב מסר, זה שמוצג **אחרי**
שליחה מוצלחת.

```html
<div style="font-family:Assistant,Arial,sans-serif;text-align:center;padding:24px 16px;font-size:17px;line-height:1.7;color:#1f2124">
  ההרשמה נקלטה. מעבירים אותך לדף הכנס&hellip;
  <br>
  <a href="https://moneymindb.rachelihadad.co.il/thanks" target="_top"
     style="display:inline-block;margin-top:12px;color:#0e4c52;font-weight:700">
    לא עברת? לחצי כאן
  </a>
</div>

<script>
(function () {
  var DEST = "https://moneymindb.rachelihadad.co.il/thanks";
  var done = false;

  function go() {
    if (done) return;
    done = true;

    // הטופס רץ בתוך iframe בדף הנחיתה. בלי לפרוץ לחלון העליון,
    // דף התודה ייטען בתוך המסגרת הקטנה של הטופס.
    var w = window;
    try { if (window.top && window.top !== window) w = window.top; } catch (e) { /* חוצה־מקור */ }

    // replace ולא href: הטופס לא נשאר בהיסטוריה, וכפתור "חזור"
    // לא מחזיר את הנרשם לטופס שכבר נשלח.
    try { w.location.replace(DEST); } catch (e) { window.location.replace(DEST); }
  }

  // חצי שנייה, כדי שרב מסר יספיק לסיים את מה שהוא עושה אחרי השליחה
  setTimeout(go, 500);
})();
</script>
```

---

## קטע ב — גיבוי

**לאן:** לקוד המותאם אישית של **דף הטופס עצמו**, אם אין גישה לדף תודה
נפרד ברב מסר.

הוא לא מתבסס על אירוע `submit`, כי [ההערה בקוד החי](../../../src/routes/index.tsx)
מתעדת שהאירוע הזה לא נורה אף פעם בפרודקשן: אפס רשומות ב-`registrations`
הגיעו ממנו. במקום זה הוא משתמש באות היחיד שכן נצפה בפועל — הטופס היה
קיים ונעלם, כלומר רב מסר החליף אותו בהודעת תודה.

```html
<script>
(function () {
  var DEST = "https://moneymindb.rachelihadad.co.il/thanks";
  var done = false, seenForm = false;

  function hasForm() {
    return !!document.querySelector(
      'form input:not([type="hidden"]), form textarea, form select'
    );
  }

  function go() {
    if (done) return;
    done = true;
    var w = window;
    try { if (window.top && window.top !== window) w = window.top; } catch (e) {}
    try { w.location.replace(DEST); } catch (e) { window.location.replace(DEST); }
  }

  var tick = setInterval(function () {
    if (hasForm()) { seenForm = true; return; }
    // הטופס היה ונעלם: זו ההגשה
    if (seenForm) { clearInterval(tick); go(); }
  }, 400);

  // לא משאירים טיימר רץ לנצח על הדף
  setTimeout(function () { clearInterval(tick); }, 180000);
})();
</script>
```

---

## קטע ג — האלטרנטיבה, בלי לגעת ברב מסר בכלל

הדף שלנו **כבר** מזהה את הרגע הזה. ב-`RavPageForm` יש בדיקה שרושמת
`form_gone_after_ready` ל-Supabase בדיוק כשהטופס נעלם אחרי שהיה קיים.
אפשר להוסיף שם שורה שמפנה ל-`/thanks`.

| | ברב מסר (א/ב) | אצלנו (ג) |
| --- | --- | --- |
| שליטה | אצל רב מסר | אצלנו |
| שורד שינוי טופס ברב מסר | לא בהכרח | כן |
| עובד גם אם הטופס מוטמע במקום אחר | כן | לא |
| דורש דחיפה ללאבאבל | לא | כן |

**ההמלצה:** קטע א ברב מסר, ובנוסף קטע ג אצלנו כרשת ביטחון. שניהם
משתמשים ב-`replace` ובדגל `done`, ולכן גם אם שניהם יורים אין כפילות.

---

## בדיקה אחרי ההטמעה

1. למלא את הטופס באמת, מהטלפון.
2. לוודא שדף התודה נפתח **על כל המסך** ולא בתוך קופסה.
3. ללחוץ „חזור” בדפדפן ולוודא שלא חוזרים לטופס שכבר נשלח.
4. לוודא ב-Events Manager של מטא שאירוע `Lead` נקלט.
