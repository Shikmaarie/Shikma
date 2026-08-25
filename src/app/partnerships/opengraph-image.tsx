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
          background:
            "radial-gradient(900px 560px at 22% 20%, #14606a 0%, #0f4a50 38%, #04171a 100%)",
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
            background: "linear-gradient(#b08850, #edd4a2, #b08850)",
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 3,
            whiteSpace: "nowrap",
            color: "#edd4a2",
            border: "2px solid rgba(211,169,106,0.55)",
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
                color: line.gold ? "#edd4a2" : "#e9e2d7",
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
              color: "#e9e2d7",
            }}
          >
            {visual("רחלי חדד")}
          </div>
          <div
            style={{ display: "flex", width: 2, height: 34, background: "#d3a96a" }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 26,
              whiteSpace: "nowrap",
              color: "#d3a96a",
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
