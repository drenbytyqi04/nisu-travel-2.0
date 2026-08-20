import { ImageResponse } from "next/og";

export const alt = "Nisu Travel — Your Journey Starts Here";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at build time so the card always matches the site's grade.
 * System fonts only — no network fetch during the build.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#07090b",
          backgroundImage:
            "radial-gradient(120% 90% at 25% 90%, #123a24 0%, #07090b 55%)",
          padding: "72px",
          color: "#f0ede6",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 48, height: 2, background: "#5dbb63" }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "#a7b0b6",
            }}
          >
            Nisu Travel
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, lineHeight: 1, letterSpacing: -3 }}>
            Your Journey
          </div>
          <div style={{ fontSize: 104, lineHeight: 1.05, letterSpacing: -3 }}>
            Starts Here.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: "#a7b0b6",
            borderTop: "1px solid rgba(240,237,230,0.15)",
            paddingTop: 28,
          }}
        >
          <div>Travel · Discover · Experience</div>
          <div style={{ color: "#5dbb63" }}>Prishtina, Kosovo</div>
        </div>
      </div>
    ),
    size,
  );
}
