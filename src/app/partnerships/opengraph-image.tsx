import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { visual } from "@/lib/bidi";

export const runtime = "nodejs";
export const alt = "קשרים עסקיים ושת״פים מנצחים — הדרכה חינמית עם רחלי חדד";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Share card for the landing page. Same rules as the site-wide card: the font
 * is read from the repo, and every Hebrew string goes through `visual()`
 * because Satori has no bidi support. Lines are split by hand and never
 * wrapped — pre-ordered text cannot be re-wrapped without scrambling it.
 */
export default async function Image() {
  const heebo = await readFile(
    join(process.cwd(), "src/app/_assets/heebo-800.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-end",
          textAlign: "right",
          padding: "0 88px",
          // Light, to match the page it previews.
          background:
            "radial-gradient(900px 560px at 22% 18%, #fffdf9 0%, #faf6ef 45%, #f0e6d4 100%)",
          fontFamily: "Heebo",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 10,
            height: "100%",
            background: "linear-gradient(#805c23, #c9a15a, #805c23)",
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 3,
            whiteSpace: "nowrap",
            color: "#805c23",
            border: "2px solid rgba(128,92,35,0.45)",
            borderRadius: 999,
            padding: "10px 26px",
            marginBottom: 30,
          }}
        >
          {visual("הדרכה פתוחה · ללא עלות")}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            fontSize: 62,
            lineHeight: 1.22,
          }}
        >
          {[
            { text: "לקוחות, כסף והזדמנויות", gold: true },
            { text: "דרך קשרים ושת״פים —", gold: false },
            { text: "בלי עוד שקל על פרסום", gold: false },
          ].map((line) => (
            <div
              key={line.text}
              style={{
                display: "flex",
                whiteSpace: "nowrap",
                color: line.gold ? "#805c23" : "#0a2b30",
              }}
            >
              {visual(line.text)}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
            gap: 20,
            marginTop: 48,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 34,
              whiteSpace: "nowrap",
              color: "#0a2b30",
            }}
          >
            {visual("רחלי חדד")}
          </div>
          <div
            style={{ display: "flex", width: 2, height: 34, background: "#805c23" }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 26,
              whiteSpace: "nowrap",
              color: "#805c23",
            }}
          >
            {visual("מועדון העסקים")}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Heebo", data: heebo, style: "normal", weight: 800 }],
    },
  );
}
