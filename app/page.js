export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 50% 0%, rgba(96, 70, 255, 0.16), transparent 34%), radial-gradient(circle at 80% 72%, rgba(0, 102, 255, 0.10), transparent 30%), #000",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "28px",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
        textAlign: "center",
        overflow: "hidden"
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "860px",
          padding: "clamp(36px, 7vw, 72px) clamp(22px, 6vw, 70px)",
          borderRadius: "34px",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.018))",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow:
            "0 40px 120px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.08)",
          position: "relative"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "-1px",
            borderRadius: "34px",
            background:
              "linear-gradient(135deg, rgba(116,82,255,0.28), transparent 26%, transparent 70%, rgba(0,119,255,0.14))",
            pointerEvents: "none",
            opacity: 0.75
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <img
            src="/appalti-gara-logo.png"
            alt="Appalti Radar"
            style={{
              width: "clamp(92px, 16vw, 138px)",
              height: "auto",
              marginBottom: "34px",
              filter: "drop-shadow(0 0 34px rgba(104, 74, 255, 0.34))"
            }}
          />

          <p
            style={{
              margin: "0 0 18px",
              color: "#8f7cff",
              letterSpacing: "0.18em",
              fontSize: "12px",
              fontWeight: 900
            }}
          >
            APPALTI RADAR
          </p>

          <h1
            style={{
              margin: 0,
              fontSize: "clamp(44px, 8vw, 92px)",
              lineHeight: "0.92",
              letterSpacing: "-0.065em",
              fontWeight: 900
            }}
          >
            Procurement
            <br />
            Intelligence
          </h1>

          <p
            style={{
              margin: "30px auto 0",
              maxWidth: "650px",
              color: "rgba(255,255,255,0.68)",
              lineHeight: 1.7,
              fontSize: "clamp(16px, 2.2vw, 20px)"
            }}
          >
            Sistema operativo di intelligence per uffici gare.
            <br />
            La piattaforma e attualmente in accesso riservato.
          </p>

          <div
            style={{
              margin: "38px auto 0",
              width: "fit-content",
              padding: "14px 22px",
              borderRadius: "999px",
              color: "rgba(255,255,255,0.76)",
              background: "rgba(255,255,255,0.045)",
              border: "1px solid rgba(255,255,255,0.12)",
              fontSize: "13px",
              fontWeight: 800,
              letterSpacing: "0.02em"
            }}
          >
            Coming Soon — accesso privato
          </div>

          <div
            style={{
              margin: "34px auto 0",
              width: "100%",
              maxWidth: "520px",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(143,124,255,0.46), transparent)"
            }}
          />

          <p
            style={{
              margin: "26px 0 0",
              color: "rgba(255,255,255,0.42)",
              fontSize: "13px",
              lineHeight: 1.6
            }}
          >
            Monitoraggio, prioritizzazione e dossier operativi per il mercato
            dei lavori pubblici.
          </p>
        </div>
      </section>
    </main>
    );
}