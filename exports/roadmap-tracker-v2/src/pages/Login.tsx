import { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrandStar } from "@/components/roadmap/BrandStar";
import { programName, roadmapTitle } from "@/data/roadmap";
import { useSession } from "@/lib/tracker-store";

const GoogleMark = () => (
  <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden>
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
    <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
  </svg>
);

export default function Login() {
  const { signInWithPassword, signInWithGoogle } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex min-h-[100dvh] flex-col bg-primary lg:flex-row">
      {/* Brand side */}
      <div className="relative flex flex-1 flex-col justify-end overflow-hidden px-6 pb-10 pt-16 text-primary-foreground lg:p-14">
        <BrandStar className="pointer-events-none absolute -left-16 -top-16 h-80 w-80 text-gold/15" />
        <BrandStar className="pointer-events-none absolute bottom-10 left-1/3 h-10 w-10 text-gold/40" />
        <p className="relative flex items-center gap-2 text-sm font-medium text-gold-light">
          <BrandStar className="h-3.5 w-3.5 text-gold" />
          {programName}
        </p>
        <h1 className="relative mt-3 text-[clamp(2.2rem,5vw,3.75rem)] font-extrabold leading-tight">{roadmapTitle}</h1>
        <p className="relative mt-3 max-w-md text-lg text-primary-foreground/85">כל החודשים, מחברות העבודה וההתקדמות שלך, במקום אחד.</p>
      </div>

      {/* Form side */}
      <div className="flex flex-1 items-center justify-center rounded-t-3xl bg-background px-4 py-10 lg:rounded-none lg:rounded-r-3xl">
        <Card className="w-full max-w-sm rounded-2xl border-0 shadow-none sm:border sm:shadow-sm">
          <CardContent className="space-y-6 p-6 sm:p-8">
            <div>
              <h2 className="text-2xl font-extrabold">כניסה</h2>
              <p className="mt-1 text-sm text-muted-foreground">משתתפות, מלוות ומנהלת התוכנית נכנסות מכאן.</p>
            </div>

            <Button variant="outline" size="lg" className="w-full gap-3 rounded-xl" onClick={signInWithGoogle}>
              <GoogleMark />
              כניסה עם Google
            </Button>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="h-px flex-1 bg-border" />
              או עם שם משתמש וסיסמה
              <span className="h-px flex-1 bg-border" />
            </div>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setError(signInWithPassword(username, password));
              }}
            >
              <div className="space-y-1.5">
                <Label htmlFor="login-user">שם משתמש או מייל</Label>
                <Input id="login-user" autoComplete="username" dir="ltr" className="h-11 rounded-xl text-right" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="login-pass">סיסמה</Label>
                <div className="relative">
                  <Input
                    id="login-pass"
                    type={show ? "text" : "password"}
                    autoComplete="current-password"
                    dir="ltr"
                    className="h-11 rounded-xl pl-11 text-right"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    aria-label={show ? "הסתרת הסיסמה" : "הצגת הסיסמה"}
                    onClick={() => setShow((v) => !v)}
                    className="absolute inset-y-0 left-2 flex items-center px-1 text-muted-foreground hover:text-foreground"
                  >
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              {error && (
                <p role="alert" className="rounded-lg bg-warning/10 p-3 text-sm font-medium text-destructive">
                  {error}
                </p>
              )}
              <Button type="submit" size="lg" className="w-full rounded-xl">
                <LogIn />
                כניסה
              </Button>
              <p className="text-center text-xs text-muted-foreground">שכחת סיסמה? פני למנהלת התוכנית.</p>
            </form>

            {/* PREVIEW ONLY: removed in the real app */}
            <div className="space-y-1.5 rounded-xl border border-dashed border-gold/70 bg-gold-light/20 p-3 text-xs">
              <p className="font-bold">חשבונות לתצוגה המקדימה (סיסמה 123456)</p>
              <p>
                משתתפת: <span dir="ltr" className="font-mono">student</span> · מלווה: <span dir="ltr" className="font-mono">mentor</span> · מנהלת:{" "}
                <span dir="ltr" className="font-mono">admin</span>
              </p>
              <p className="text-muted-foreground">כפתור Google נכנס כאן בתור משתתפת לדוגמה.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
