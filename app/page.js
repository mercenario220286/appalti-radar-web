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
        padding: "28px",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
        textAlign: "center"
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "860px",
          padding: "clamp(34px, 7vw, 68px) clamp(22px, 6vw, 68px)",
          borderRadius: "34px",
          background:
            "linear-gradient(180deg, rgba(8,8,12,0.98), rgba(0,0,0,0.98))",
          border: "1px solid rgba(140,140,160,0.12)",
          boxShadow:
            "0 40px 120px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.035)"
        }}
      >
        <div
          style={{
            width: "clamp(116px, 18vw, 150px)",
            height: "clamp(116px, 18vw, 150px)",
            margin: "0 auto 34px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#000",
            borderRadius: "0",
            overflow: "hidden"
          }}
        >
          <img
            src="/appalti-gara-logo.png"
            alt="Appalti Radar"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
              background: "#000"
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
            padding: "14px 22px",
            borderRadius: "999px",
            color: "rgba(255,255,255,0.76)",
            background: "rgba(255,255,255,0.035)",
            border: "1px solid rgba(255,255,255,0.10)",
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
              "linear-gradient(90deg, transparent, rgba(143,124,255,0.30), transparent)"
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
          Monitoraggio, prioritizzazione e dossier operativi per il mercato dei
          lavori pubblici.
        </p>
      </section>
    </main>
  );
}