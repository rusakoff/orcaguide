import { ImageResponse } from "next/og";
import { appName, siteDescription } from "@/lib/shared";

export const alt = "Orca Guide, документация Orca ADE на русском языке";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#101110",
        color: "#f2f0e8",
        padding: "72px",
        border: "18px solid #d6ff35",
        fontFamily: "monospace",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
          color: "#d6ff35",
          fontSize: 28,
          letterSpacing: "0.12em",
        }}
      >
        <span>●</span>
        НЕЗАВИСИМАЯ БАЗА ЗНАНИЙ · RU
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
        <div style={{ fontSize: 92, fontFamily: "serif", lineHeight: 0.95 }}>
          {appName}
        </div>
        <div style={{ color: "#c5c5bd", fontSize: 30, lineHeight: 1.35 }}>
          {siteDescription}
        </div>
      </div>
      <div style={{ color: "#d6ff35", fontSize: 25 }}>orcaguide.ru</div>
    </div>,
    size,
  );
}
