import { ImageResponse } from "next/og";

export const alt = "EverySpaces office space and coworking solutions";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #123524 0%, #244734 58%, #eff3d4 100%)",
          color: "#f9fbf5",
          padding: "56px 64px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                width: 18,
                height: 18,
                borderRadius: 9999,
                backgroundColor: "#d8ff5e",
              }}
            />
            EVERYSPACES
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              maxWidth: 820,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 74,
                lineHeight: 1.02,
                fontWeight: 700,
              }}
            >
              Office Space & Coworking Solutions
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 30,
                lineHeight: 1.35,
                color: "#d9e6d2",
              }}
            >
              Find premium office space, managed workspaces, and coworking
              options across Bangalore and Hyderabad.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              fontSize: 28,
            }}
          >
            <div style={{ display: "flex", color: "#d8ff5e" }}>everyspaces.com</div>
            <div style={{ display: "flex" }}>Bangalore • Hyderabad</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
