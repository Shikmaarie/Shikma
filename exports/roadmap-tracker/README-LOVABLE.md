# מפת הדרכים שלי | לצאת לעצמאות: מערכת מעקב

גרסה מקומית מוכנה לדחיפה ל-Lovable. `preview.html` היא תצוגה מקדימה בלבד
(הנתונים נשמרים בדפדפן). קוד ה-React שב-`src/` הוא מה שעולה ל-Lovable.

## תפקידים

| תפקיד | מה רואה | מה עושה |
| --- | --- | --- |
| משתתפת | המפה שלה בלבד | ממלאת את החודש הפתוח, מצרפת ראיות, שולחת לאישור |
| מלווה | המשתתפות שלה בלבד | צופה, כותבת הערה, מאשרת או מחזירה להשלמה |
| מנהלת התוכנית | כולן, עם סינון לפי מלווה | פותחת חודש לכל הקבוצה או למשתתפת אחת, מוסיפה משתתפות |

## חשיפה הדרגתית

כל ששת החודשים מופיעים במבט העל (כותרת ויעד), אבל רק חודשים עד `open_month`
של המשתתפת ניתנים לפתיחה. מנהלת התוכנית מקדמת את `open_month`.

## סטטוסים

`draft` (בעבודה) → `submitted` (ממתין לאישור) → `approved` (אושר)
או `returned` (הוחזר להשלמה) → חזרה ל-`submitted`.
טופס ב-`submitted` או `approved` נעול לעריכה אצל המשתתפת.

## מבנה נתונים ל-Lovable Cloud

```sql
create type app_role as enum ('admin', 'mentor', 'participant');
create type entry_status as enum ('draft', 'submitted', 'returned', 'approved');

create table user_roles (
  user_id uuid references auth.users on delete cascade,
  role app_role not null,
  primary key (user_id, role)
);

create table mentors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users,
  name text not null
);

create table participants (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users,
  email text not null unique,
  name text not null,
  mentor_id uuid references mentors,
  starting_point text check (starting_point in ('no_idea','few_directions','existing_idea','active_business')),
  open_month int not null default 1 check (open_month between 1 and 6),
  created_at timestamptz default now()
);

create table month_entries (
  participant_id uuid references participants on delete cascade,
  month int check (month between 1 and 6),
  status entry_status not null default 'draft',
  milestones jsonb not null default '{}',
  actuals jsonb not null default '{}',
  personal_targets jsonb not null default '{}',
  evidence text not null default '',
  evidence_files jsonb not null default '[]', -- [{name, path}] in storage bucket "evidence"
  reflection jsonb not null default '{}',
  next_follow_up date,
  mentor_note text not null default '',
  submitted_at timestamptz,
  reviewed_at timestamptz,
  updated_at timestamptz default now(),
  primary key (participant_id, month)
);
```

### הרשאות (RLS) — חובה

- משתתפת: קוראת וכותבת רק שורות שלה, רק כש-`month <= open_month`,
  ורק כשהסטטוס `draft` או `returned`. לא יכולה לשנות `status` ל-`approved`,
  לא את `mentor_note` ולא את `open_month`.
- מלווה: קוראת שורות של המשתתפות שלה, מעדכנת רק `status`
  (`approved`/`returned`), `mentor_note`, `reviewed_at`.
- מנהלת: הכול.
- תפקיד נבדק דרך פונקציית `has_role()` עם `security definer`, לא מטבלת
  הפרופיל ולא מהלקוח.
- באקט `evidence` פרטי. קבצים תחת `{participant_id}/{month}/`, עם אותן
  הרשאות קריאה כמו השורה.

### כניסה

קישור קסם במייל (magic link), בלי סיסמאות. מנהלת התוכנית מוסיפה משתתפת
עם מייל; בכניסה הראשונה `participants.user_id` מתמלא לפי המייל.

## ניתוב

- `/` → מפנה לפי תפקיד
- `/roadmap` → `ParticipantRoadmap`
- `/mentor` → `ReviewDashboard role="mentor"`
- `/admin` → `ReviewDashboard role="admin"`

`App.tsx` כאן הוא מעטפת תצוגה מקדימה עם מתג תפקידים, ולא עולה לפרודקשן.
