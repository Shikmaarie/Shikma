import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/data/site";
import { visual } from "@/lib/bidi";

export const runtime = "nodejs";
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card.
 *
 * The font is read from the repo rather than fetched from Google at request
 * time — an outbound fetch here would make link previews fail silently
 * whenever the network or Google is unavailable.
 *
 * Every Hebrew string goes through `visual()` because Satori has no bidi
 * support and would otherwise spell the text backwards. See src/lib/bidi.ts.
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
          // Text is already in visual order, so right-align it by layout.
          alignItems: "flex-end",
          textAlign: "right",
          padding: "0 90px",
          background:
            "radial-gradient(1000px 600px at 78% 22%, #0f4a50 0%, #072428 45%, #04171a 100%)",
          fontFamily: "Heebo",
          position: "relative",
        }}
      >
        {/* Gold hairline down the leading edge */}
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
            letterSpacing: 4,
            whiteSpace: "nowrap",
            color: "#d3a96a",
            marginBottom: 26,
          }}
        >
          {visual("מעבר מהישרדות לשפע אמיתי")}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            fontSize: 66,
            lineHeight: 1.2,
            color: "#e9e2d7",
          }}
        >
          {/*
            Lines are split by hand and set to nowrap on purpose. Pre-ordered
            text cannot be wrapped by the renderer — a soft wrap would move the
            first word to the last line and scramble the reading order.
          */}
          {[
            { text: "להפסיק לרדוף אחרי הכסף —", gold: false },
            { text: "ולבנות אימפריה", gold: true },
            { text: "שמנוהלת מבפנים החוצה.", gold: true },
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
            // Reversed so the name sits on the right, role to its left.
            flexDirection: "row-reverse",
            alignItems: "center",
            gap: 22,
            marginTop: 52,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 40,
              whiteSpace: "nowrap",
              color: "#e9e2d7",
            }}
          >
            {visual(site.name)}
          </div>
          <div
            style={{
              display: "flex",
              width: 2,
              height: 40,
              background: "#d3a96a",
              opacity: 0.6,
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 28,
              whiteSpace: "nowrap",
              color: "#d3a96a",
            }}
          >
            {visual(site.role)}
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
