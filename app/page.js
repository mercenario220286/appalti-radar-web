export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        fontFamily: "Inter, sans-serif",
        textAlign: "center"
      }}
    >
      <div style={{ maxWidth: "700px" }}>
        <p
          style={{
            color: "#8b5cf6",
            letterSpacing: "0.18em",
            fontSize: "12px",
            fontWeight: 800,
            marginBottom: "24px"
          }}
        >
          APPALTI RADAR
        </p>

        <h1
          style={{
            fontSize: "clamp(42px, 8vw, 88px)",
            lineHeight: "0.92",
            letterSpacing: "-0.06em",
            margin: 0
          }}
        >
          Procurement
          <br />
          Intelligence
        </h1>

        <p
          style={{
            marginTop: "28px",
            color: "rgba(255,255,255,0.64)",
            lineHeight: 1.7,
            fontSize: "18px"
          }}
        >
          Sistema operativo di intelligence per uffici gare.
          <br />
          Accesso attualmente riservato.
        </p>

        <div
          style={{
            marginTop: "40px",
            display: "inline-flex",
            padding: "14px 22px",
            borderRadius: "16px",
            background:
              "linear-gradient(135deg, #5f42ff, #8b5cf6)",
            fontWeight: 700
          }}
        >
          Coming Soon
        </div>
      </div>
    </main>
  );
}