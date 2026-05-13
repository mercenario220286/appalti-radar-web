export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 50% 0%, rgba(82, 56, 255, 0.10), transparent 38%), #000",
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
          padding: "clamp(34px, 7vw, 68px) clamp(22px, 6vw, 68px)",
          borderRadius: "34px",
          background: "#000",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.92)",
          position: "relative"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "34px",
            pointerEvents: "none",
            background:
              "radial-gradient(circle at top, rgba(96,70,255,0.12), transparent 38%), radial-gradient(circle at bottom right, rgba(0,102,255,0.08), transparent 34%)"
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2
          }}
        >
          <div
            style={{
              width: "clamp(120px, 18vw, 150px)",
              height: "clamp(120px, 18vw, 150px)",
              margin: "0 auto 34px",
              background: "#000",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <img
              src="/appalti-gara-logo.png"
              alt="Appalti Radar"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block"
              }}
            />
          </div>

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
            Accesso attualmente riservato.
          </p>

          <div
            style={{
              margin: "38px auto 0",
              width: "fit-content",
              padding: "14px 24px",
              borderRadius: "999px",
              color: "rgba(255,255,255,0.82)",
              background: "rgba(255,255,255,0.035)",
              border: "1px solid rgba(255,255,255,0.08)",
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
                "linear-gradient(90deg, transparent, rgba(143,124,255,0.22), transparent)"
            }}
          />

          <p
            style={{
              margin: "26px 0 0",
              color: "rgba(255,255,255,0.40)",
              fontSize: "13px",
              lineHeight: 1.7
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