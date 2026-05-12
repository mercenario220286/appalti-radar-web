"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { buildGaraViewModel } from "@/lib/garaAdapter";

function anacLink(cig) {
  const cleanCig = String(cig || "").trim().toUpperCase();

  if (!cleanCig) {
    return "https://dettaglio-cig.anticorruzione.it/";
  }

  return "https://dettaglio-cig.anticorruzione.it/cig/" + encodeURIComponent(cleanCig);
}

function getDocUrl(doc) {

  if (doc.nome === "Apri scheda ANAC" || doc.nome === "Apri ANAC") {
    return anacLink(doc.cig);
  }

  if (doc.nome === "JSON gara") {
    return "/api/json/" + doc.cig;
  }

  if (doc.nome === "Report analisi") {
    return "/api/report/" + doc.cig;
  }

  if (doc.url) {
    return doc.url;
  }

  if (doc.tipo === "link") {
    return anacLink(doc.cig);
  }

  return null;
}


function firstValue(a, b, c, d, e) {
  if (a !== undefined && a !== null && a !== "") return a;
  if (b !== undefined && b !== null && b !== "") return b;
  if (c !== undefined && c !== null && c !== "") return c;
  if (d !== undefined && d !== null && d !== "") return d;
  if (e !== undefined && e !== null && e !== "") return e;

  return null;
}


function getMobileDocumentiLink(g) {
  return firstValue(
    g.documenti_link,
    g.documentiLink,
    g.link_documenti,
    g.documenti_di_gara_link,
    g.documentiLinkUfficiale,
    null
  );
}

function resolveDocumentLink(g) {
  const url = getMobileDocumentiLink(g);

  const ente = String(
    firstValue(
      g.ente_appaltante,
      g.ente,
      g.stazione_appaltante,
      "",
      ""
    ) || ""
  ).toLowerCase();

  if (ente.includes("anas")) {
    return {
      type: "ANAS_POST_LIVE",
      url: null,
      label: null
    };
  }

  if (!url) {
    return {
      type: "ASSENTE",
      url: null,
      label: null
    };
  }

  const cleanUrl = String(url).trim();
  const lower = cleanUrl.toLowerCase();

  if (
    lower.includes("tuttogare") ||
    lower.includes("asmecomm") ||
    lower.includes("traspare") ||
    lower.includes("acquistitelematici") ||
    lower.includes("albofornitori") ||
    lower.includes("portaleappalti")
  ) {
    return {
      type: "DOCUMENTI_PROBABILI",
      url: cleanUrl,
      label: "Apri pagina documentale gara"
    };
  }

  return {
    type: "PAGINA_SORGENTE",
    url: cleanUrl,
    label: "Apri pagina sorgente gara"
  };
}

function MobileBlocked({ g, loadError, cig }) {
  const cleanCig = String(cig || g?.cig || "")
    .trim()
    .toUpperCase();

  return (
    <main style={mobileStyles.page}>
      <div style={mobileStyles.card}>
        <img
          src="/appalti-gara-logo.png"
          alt="Appalti Radar"
          style={mobileStyles.logo}
        />

        <div style={mobileStyles.kicker}>APPALTI RADAR</div>

        {!g ? (
          <>
            <h1 style={mobileStyles.title}>Dossier in caricamento</h1>

            <p style={mobileStyles.text}>
              {loadError || "Lettura dati gara in corso..."}
            </p>
          </>
        ) : (
          <>
            <div style={mobileStyles.scoreRow}>
              <span style={mobileStyles.scoreBadge}>
                SCORE {g.score}/100
              </span>

              <span style={mobileStyles.priorityBadge}>
                {g.priorita}
              </span>
            </div>

            <h1 style={mobileStyles.title}>{g.titolo}</h1>

            <p style={mobileStyles.textStrong}>
              {g.sottotitolo}
            </p>

            <div style={mobileStyles.infoBox}>
              <div style={mobileStyles.infoLine}>
                <span>CIG</span>
                <b>{g.cig}</b>
              </div>

              <div style={mobileStyles.infoLine}>
                <span>Categoria</span>
                <b>{g.categoria}</b>
              </div>

              <div style={mobileStyles.infoLine}>
                <span>Importo</span>
                <b>{g.importo}</b>
              </div>

              <div style={mobileStyles.infoLine}>
                <span>Regione</span>
                <b>{g.regione}</b>
              </div>

              <div style={mobileStyles.infoLine}>
                <span>Procedura</span>
                <b>{g.procedura}</b>
              </div>
            </div>

            <div style={mobileStyles.mobileActions}>
              <a
                href={anacLink(g.cig)}
                target="_blank"
                rel="noopener noreferrer"
                style={mobileStyles.mobileActionSecondary}
              >
                Apri ANAC
              </a>

              {(() => {
                const doc = resolveDocumentLink(g);

                if (!doc || !doc.url || !doc.label) {
                  return null;
                }

                return (
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={mobileStyles.mobileActionSecondary}
                  >
                    {doc.label}
                  </a>
                );
              })()}
            </div>

            <div style={mobileStyles.desktopBox}>
              Dashboard completa disponibile da desktop.
            </div>

            <p style={mobileStyles.note}>
              Sintesi mobile essenziale. Analisi completa, mercato,
              competitor, storico e pressione ribassi disponibili da PC.
            </p>
          </>
        )}
      </div>
    </main>
  );
}

function formatDatePremiumIT(value) {
  if (!value) return "N/D";

  const d = new Date(value);

  if (Number.isNaN(d.getTime())) {
    return String(value);
  }

  const months = [
    "GEN", "FEB", "MAR", "APR", "MAG", "GIU",
    "LUG", "AGO", "SET", "OTT", "NOV", "DIC"
  ];

  const day = String(d.getDate()).padStart(2, "0");
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return day + " " + month + " " + year;
}


function formatDateTimePremiumIT(value) {
  if (!value) return "N/D";

  const d = new Date(value);

  if (Number.isNaN(d.getTime())) {
    return String(value);
  }

  return d.toLocaleString("it-IT", {
    timeZone: "Europe/Rome",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}




function getMarketStatus(g) {
  const lettura = String(g.mercato?.lettura || "").toLowerCase();

  if (lettura === "prudente") return "prudente";
  if (lettura === "ordinaria") return "ordinaria";
  if (lettura === "competitivo") return "competitivo";
  if (lettura === "aggressivo") return "aggressivo";

  const pos = Number(g.mercato?.posizione || 0);

  if (pos <= 25) return "prudente";
  if (pos <= 60) return "ordinaria";
  if (pos <= 82) return "competitivo";
  return "aggressivo";
}

function getMarketReading(g) {
  const status = getMarketStatus(g);
  const centro = g.mercato?.centro || "N/D";
  const fascia = g.mercato?.fascia || "N/D";
  const competitivo = g.mercato?.competitivo || "N/D";
  const aggressivo = g.mercato?.aggressivo || "N/D";

  if (status === "prudente") {
    return "Lettura: mercato comparabile prudente. Centro mercato " + centro + ", sotto pressione critica. Scenario favorevole per valutare la gara con margine operativo.";
  }

  if (status === "ordinaria") {
    return "Lettura: mercato comparabile in fascia ordinaria. Centro mercato " + centro + ", fascia tipica " + fascia + ". Pressione coerente con comportamento storico standard.";
  }

  if (status === "competitivo") {
    return "Lettura: mercato comparabile competitivo. Area di pressione " + competitivo + ". Serve attenzione al posizionamento del ribasso e ai competitor ricorrenti.";
  }

  return "Lettura: mercato comparabile aggressivo. Soglia critica " + aggressivo + ". Alta pressione sui margini e rischio di ribassi molto spinti.";
}

function getDynamicHistogram(g) {
  const status = getMarketStatus(g);

  if (status === "prudente") {
    return [8, 16, 30, 46, 60, 52, 36, 22, 13, 7, 4, 2];
  }

  if (status === "ordinaria") {
    return [5, 12, 24, 42, 62, 78, 70, 52, 34, 18, 8, 4];
  }

  if (status === "competitivo") {
    return [2, 5, 10, 20, 34, 50, 68, 82, 74, 55, 32, 14];
  }

  return [1, 3, 6, 12, 24, 40, 58, 76, 88, 72, 50, 26];
}



export default function Page() {

  const params = useParams();
  const cigFromUrl = params && params.cig ? params.cig : null;
  const [deviceReady, setDeviceReady] = useState(false);
  const [mobileBlocked, setMobileBlocked] = useState(false);
  const [activeSide, setActiveSide] = useState("PANORAMICA");
  const [hoverSide, setHoverSide] = useState(null);
  const isPrint =
  typeof window !== "undefined" &&
  window.location.search.includes("print=1");

  const viewStyles = isPrint ? mergeStyles(s, printStyles) : s;

  const [g, setG] = useState(null);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    async function loadGara() {
      const cig = cigFromUrl || "A01E5DB19F";

      setG(null);
      setLoadError("");

      const { data, error } = await supabase
        .from("gare")
        .select("*")
        .eq("cig", String(cig).trim().toUpperCase())
        .maybeSingle();

      if (error) {
        console.log("ERRORE SUPABASE DOSSIER:", error.message);
        setLoadError("Errore caricamento dossier gara");
        return;
      }

      if (!data) {
        console.log("GARA NON TROVATA SU SUPABASE:", cig);
        setLoadError("Gara non trovata su Supabase: " + cig);
        return;
      }

      const gara = buildGaraViewModel(data);

      setG(gara);
    }

    loadGara();
  }, [cigFromUrl]);

  useEffect(() => {
    function checkDevice() {
      const width = window.innerWidth || 0;
      setMobileBlocked(width < 900);
      setDeviceReady(true);
    }

    checkDevice();

    window.addEventListener("resize", checkDevice);
    window.addEventListener("orientationchange", checkDevice);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("orientationchange", checkDevice);
    };
  }, []);

  if (!deviceReady) {
  return (
    <main style={{ width: "100vw", height: "100vh", background: "#000" }} />
  );
}

  if (mobileBlocked) {
  return (
    <MobileBlocked
      g={g}
      loadError={loadError}
      cig={cigFromUrl}
    />
  );
}

if (!g) {
  return (
    <main style={{ width: "100vw", height: "100vh", background: "#000", color: "#fff" }}>
      <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
        {loadError || "Caricamento dossier gara..."}
      </div>
    </main>
  );
}

const mercatoSafe = g.mercato || {
  distribuzione: [],
  lettura: "ordinaria",
  posizione: 50,
  centro: "N/D",
  fascia: "N/D",
  competitivo: "N/D",
  aggressivo: "N/D",
  campione: 0,
  comparabili: "N/D",
  affidabilita: "N/D"
};

g.mercato = mercatoSafe;

const publishedTimestamp = formatDateTimePremiumIT(
  g.data_pubblicazione ||
  g.pubblicazione ||
  g.created_at ||
  g.updated_at
);

const alertTimestamp = formatDateTimePremiumIT(
  g.alert_at ||
  g.alerted_at ||
  g.radar_alert_at ||
  new Date()
);

  
  const menuItems = ["PANORAMICA", "MERCATO", "COMPETITOR", "STORICO", "DOCUMENTI"];
  function isActiveSection(section) {
  return activeSide === section || hoverSide === section;
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

  return (
    <>
      <style jsx global>{`
        .panel-hover {
          will-change: transform, box-shadow, border-color;
        }

        .panel-hover:hover {
          transform: translateY(-3px);
          border-color: rgba(196,181,253,0.48) !important;
          box-shadow:
            0 12px 30px rgba(0,0,0,0.42),
            0 0 20px rgba(139,92,246,0.22),
            0 0 14px rgba(226,232,240,0.10),
            inset 0 0 16px rgba(255,255,255,0.028) !important;
        }

        .soft-button:hover {
          transform: translateY(-2px);
          border-color: rgba(196,181,253,0.58) !important;
          color: #ffffff !important;
          background: rgba(139,92,246,0.13) !important;
          box-shadow:
            0 8px 18px rgba(0,0,0,0.28),
            0 0 20px rgba(139,92,246,0.28),
            0 0 10px rgba(226,232,240,0.12) !important;
        }

        .active-section-pulse {
          animation: sectionPulse 1.45s ease-out 1;
        }

        @keyframes sectionPulse {
          0% {
            box-shadow:
              0 0 0 rgba(139,92,246,0),
              inset 0 0 0 rgba(255,255,255,0);
          }
          32% {
            box-shadow:
              0 0 0 1px rgba(226,232,240,0.18),
              0 0 42px rgba(196,181,253,0.44),
              0 0 30px rgba(139,92,246,0.34),
              inset 0 0 22px rgba(255,255,255,0.055);
          }
          100% {
            box-shadow:
              0 0 0 1px rgba(226,232,240,0.12),
              0 0 28px rgba(196,181,253,0.28),
              0 0 20px rgba(139,92,246,0.25),
              inset 0 0 16px rgba(255,255,255,0.035);
          }
        }

        .data-link:hover {
          color: #e9d5ff !important;
          text-shadow: 0 0 8px rgba(196,181,253,0.45);
        }
      `}</style>

      <main style={viewStyles.page}>
      <div style={viewStyles.sidebar}>
  <div style={viewStyles.brandLogoWrapper}>
    <img
      src="/appalti-gara-logo.png"
      alt="Appalti Radar"
      style={viewStyles.brandLogo}
    />
  </div>

  <div style={viewStyles.sideMenu}>
    {menuItems.map((item) => (
      <div
        key={item}
        style={activeSide === item ? viewStyles.sideItemActive : viewStyles.sideItem}
        onMouseEnter={() => setHoverSide(item)}
        onMouseLeave={() => setHoverSide(null)}
        onClick={() => {
          setActiveSide(item);
          scrollToSection(item);
        }}
      >
        <span>{item}</span>

        {activeSide === item && <div style={viewStyles.sideMarker} />}
      </div>
    ))}
  </div>

 <div style={viewStyles.sideStatus}>
  <div style={viewStyles.statusBadgeRow}>
    <span style={viewStyles.statusDot}></span>
    DOSSIER LIVE
  </div>

  <div style={viewStyles.statusLine}>
    Procurement intelligence attiva
  </div>

  <div style={viewStyles.statusDate}>
    Pubblicazione: {formatDatePremiumIT(
      g.data_pubblicazione ||
      g.pubblicazione
    )}
  </div>

  <div style={viewStyles.statusDate}>
    Rilevazione Radar: {alertTimestamp}
  </div>

  <div style={viewStyles.statusVersion}>
    Coverage: fonti pubbliche operative
  </div>
</div>
</div>

      <div style={viewStyles.main}>
        <div style={viewStyles.header}>
          <div style={viewStyles.headerLeft}>
            <div style={viewStyles.title}>IMPRESIT LAVORI SPA</div>
            <div style={viewStyles.sub}>Dossier intelligence gara · dati da alert operativo</div>
          </div>

          <div style={viewStyles.headerRight}>
            <a href={anacLink(g.cig)} target="_blank" className="soft-button" style={viewStyles.topButton}>
              APRI ANAC
            </a>
            <div style={viewStyles.live}>
  <div style={viewStyles.liveDot}></div>
  LIVE
</div>
          </div>
        </div>

        <div style={viewStyles.grid}>
  <div
    id="PANORAMICA"
    className={
      activeSide === "PANORAMICA"
        ? "panel-hover active-section-pulse"
        : "panel-hover"
    }
    style={{
      ...viewStyles.hero,
      ...(isActiveSection("PANORAMICA") && {
        border: "1px solid rgba(196,181,253,0.62)",
        boxShadow:
          "0 0 0 1px rgba(226,232,240,0.13), 0 0 30px rgba(196,181,253,0.30), 0 0 24px rgba(139,92,246,0.28), inset 0 0 18px rgba(255,255,255,0.04)"
      })
    }}
  >
    <div style={viewStyles.heroLeft}>

  <div style={viewStyles.liveDetected}>
    <span style={viewStyles.liveDetectedDot}></span>

    <span>LIVE DETECTED</span>

    <b>{alertTimestamp}</b>
  </div>

  <div style={viewStyles.priority}>
        <div style={viewStyles.priorityDot}></div>
        PRIORITA {g.priorita} · SCORE {g.score}/100
      </div>

      <h1 style={viewStyles.h1}>{g.titolo}</h1>

      <div style={viewStyles.headline}>
        {g.sottotitolo}
      </div>

      <div style={viewStyles.infoGrid}>
        <div style={viewStyles.infoCell}>
          <span style={viewStyles.infoLabel}>CIG</span>
          <a
            href={anacLink(g.cig)}
            target="_blank"
            className="data-link"
            style={viewStyles.infoValueLink}
          >
            {g.cig}
          </a>
        </div>

        <div style={viewStyles.infoCell}>
          <span style={viewStyles.infoLabel}>Regione</span>
          <b style={viewStyles.infoValue}>{g.regione}</b>
        </div>

        <div style={viewStyles.infoCell}>
          <span style={viewStyles.infoLabel}>Categoria</span>
          <b style={viewStyles.infoValue}>{g.categoria}</b>
        </div>

        <div style={viewStyles.infoCell}>
          <span style={viewStyles.infoLabel}>Importo</span>
          <b style={viewStyles.infoValue}>{g.importo}</b>
        </div>

        <div style={viewStyles.infoCell}>
          <span style={viewStyles.infoLabel}>Procedura</span>
          <b style={viewStyles.infoValue}>{g.procedura}</b>
        </div>

        <div style={viewStyles.infoCell}>
          <span style={viewStyles.infoLabel}>Pubblicazione</span>
          <b style={viewStyles.infoValue}>
  {formatDatePremiumIT(g.pubblicazione)}
</b>
        </div>
      </div>
    </div>

    <div style={viewStyles.heroRight}>
      <div style={viewStyles.gauge}>
        <div style={viewStyles.gaugeInner}>
          <div style={viewStyles.score}>{g.score}</div>
          <div style={viewStyles.scoreLabel}>FIT GARA</div>
        </div>
      </div>

      <div
        style={viewStyles.action}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow =
            "0 0 20px rgba(34,255,136,0.25)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0px)";
          e.currentTarget.style.boxShadow =
            "0 0 14px rgba(34,255,136,0.14), inset 0 0 12px rgba(34,255,136,0.06)";
        }}
      >
        {g.decisione}
      </div>
    </div>
  </div>

  <div style={viewStyles.exec} className="panel-hover">
    <div style={viewStyles.boxTitle}>MOTIVI DI RILEVANZA</div>

    <div style={viewStyles.motiviList}>
      {g.motivi.map((m, i) => (
  <div key={i} style={viewStyles.motivo}>
    <span style={viewStyles.check}>✓</span>

    <span
      style={{
        fontWeight: "900",
        color: "#ffffff",
        letterSpacing: "0.1px"
      }}
    >
      {m}
    </span>
  </div>
))}
    </div>
  </div>

  <div style={viewStyles.fitPanel} className="panel-hover">
    <div style={viewStyles.boxTitle}>FIT IMPRESIT</div>

    <div style={viewStyles.fitRow}>
      <div style={viewStyles.fitCircle}>{g.fit.score}%</div>

      <div style={viewStyles.fitTexts}>
        {g.fit.descrizione.map((x, i) => (
  <div key={i} style={viewStyles.fitText}>
    <span
      style={{
        color: "#22ff88",
        marginRight: "6px"
      }}
    >
      ✓
    </span>

    <span
      style={{
        fontWeight: "900",
        color: "#ffffff",
        letterSpacing: "0.1px"
      }}
    >
      {x}
    </span>
  </div>
))}
      </div>
    </div>
  </div>

  <div
    id="STORICO"
    className={
      activeSide === "STORICO"
        ? "panel-hover active-section-pulse"
        : "panel-hover"
    }
    style={{
      ...viewStyles.actionPanel,
      ...(isActiveSection("STORICO") && {
        border: "1px solid rgba(196,181,253,0.62)",
        boxShadow:
          "0 0 0 1px rgba(226,232,240,0.13), 0 0 30px rgba(196,181,253,0.30), 0 0 24px rgba(139,92,246,0.28), inset 0 0 18px rgba(255,255,255,0.04)"
      })
    }}
  >
    <div style={viewStyles.boxTitle}>STORICO IMPRESIT</div>

    <div style={viewStyles.historyBox}>
      <div style={viewStyles.historyTop}>
        {g.storicoImpresit.label}
      </div>

      <div>
        CIG:{" "}
        <a
          href={anacLink(g.storicoImpresit.cig)}
          target="_blank"
          className="data-link"
          style={viewStyles.cleanLink}
        >
          {g.storicoImpresit.cig}
        </a>
      </div>

      <div>
        Importo:{" "}
        <span style={{ fontWeight: "850", color: "#ffffff" }}>
          {g.storicoImpresit.importo}
        </span>
      </div>

      <div>
        Ribasso:{" "}
        <span style={{ fontWeight: "900", color: "#22ff88" }}>
          {g.storicoImpresit.ribasso}
        </span>
      </div>

      <div>
        Categoria:{" "}
        <span style={{ fontWeight: "850", color: "#ffffff" }}>
          {g.storicoImpresit.categoria}
        </span>
      </div>

      <div>
        Esito:{" "}
        <span
          style={{
            fontWeight: "900",
            color:
              g.storicoImpresit.esito === "AGGIUDICATA"
                ? "#22ff88"
                : "#ffcc33"
          }}
        >
          {g.storicoImpresit.esito}
        </span>
      </div>
    </div>
  </div>

  <div style={viewStyles.summaryPanel} className="panel-hover">
    <div style={viewStyles.boxTitle}>LETTURA MERCATO</div>

    <div>
      Scenario:{" "}
      <span
        style={{
          fontWeight: "900",
          color:
            g.mercato.lettura === "prudente"
              ? "#22ff88"
              : g.mercato.lettura === "competitivo"
              ? "#ffcc33"
              : "#ff4d5e"
        }}
      >
        {g.mercato.lettura}
      </span>
    </div>

    <div style={{ marginTop: "6px" }}>
      Campione:{" "}
      <span style={{ fontWeight: "850", color: "#ffffff" }}>
        {g.mercato.campione} gare
      </span>
    </div>

    <div>
      Comparabili:{" "}
      <span style={{ fontWeight: "850", color: "#ffffff" }}>
        {g.mercato.comparabili}
      </span>
    </div>

    <div>
      Affidabilita:{" "}
      <span style={{ fontWeight: "850", color: "#ffffff" }}>
        {g.mercato.affidabilita}
      </span>
    </div>
  </div>

          <div
  id="MERCATO"
  className={activeSide === "MERCATO" ? "panel-hover active-section-pulse" : "panel-hover"}
  style={{
    ...viewStyles.marketBig,
    ...(isActiveSection("MERCATO") && {
      border: "1px solid rgba(196,181,253,0.62)",
      boxShadow:
        "0 0 0 1px rgba(226,232,240,0.13), 0 0 30px rgba(196,181,253,0.30), 0 0 24px rgba(139,92,246,0.28), inset 0 0 18px rgba(255,255,255,0.04)"
    })
  }}
>
  <div style={viewStyles.marketHeader}>
    <div>
      <div style={viewStyles.marketTitle}>PRESSIONE RIBASSI</div>
      <div style={viewStyles.marketSubtitle}>
        Comportamento storico su gare comparabili
      </div>
    </div>

    <div
  style={{
    ...viewStyles.marketBadge,
    background:
      g.mercato.lettura === "prudente"
        ? "rgba(34,255,136,0.12)"
        : g.mercato.lettura === "competitivo"
        ? "rgba(255,204,51,0.12)"
        : "rgba(255,77,94,0.12)",

    border:
      g.mercato.lettura === "prudente"
        ? "1px solid rgba(34,255,136,0.28)"
        : g.mercato.lettura === "competitivo"
        ? "1px solid rgba(255,204,51,0.28)"
        : "1px solid rgba(255,77,94,0.28)",

    color:
      g.mercato.lettura === "prudente"
        ? "#22ff88"
        : g.mercato.lettura === "competitivo"
        ? "#ffcc33"
        : "#ff4d5e"
  }}
>
  {g.mercato.lettura === "prudente"
    ? "PRESSIONE PRUDENTE"
    : g.mercato.lettura === "competitivo"
    ? "PRESSIONE COMPETITIVA"
    : "PRESSIONE AGGRESSIVA"}
</div>
  </div>

  <div style={viewStyles.marketRow}>
    <div style={viewStyles.marketFacts}>
      <div style={viewStyles.marketKpi}>
        <span style={viewStyles.marketKpiValue}>{g.mercato.centro}</span>
        <span style={viewStyles.marketKpiLabel}>Centro mercato</span>
      </div>

      <div style={viewStyles.marketKpi}>
        <span style={viewStyles.marketKpiValue}>{g.mercato.fascia}</span>
        <span style={viewStyles.marketKpiLabel}>Fascia ordinaria</span>
      </div>

      <div style={viewStyles.marketKpi}>
        <span style={viewStyles.marketKpiValue}>{g.mercato.competitivo}</span>
        <span style={viewStyles.marketKpiLabel}>Area competitiva</span>
      </div>

      <div style={viewStyles.marketKpi}>
        <span style={viewStyles.marketKpiValue}>{g.mercato.aggressivo}</span>
        <span style={viewStyles.marketKpiLabel}>Soglia aggressiva</span>
      </div>

      <div style={viewStyles.marketReading}>
  {getMarketReading(g)}
</div>
    </div>

    <div>
      <div style={viewStyles.chart}>
        {getDynamicHistogram(g).map((h, i) => {
          let color = "#22ff88";

          if (i > getDynamicHistogram(g).length * 0.66) {
            color = "#ff4d5e";
          } else if (i > getDynamicHistogram(g).length * 0.33) {
            color = "#ffcc33";
          }

          return (
            <div
              key={i}
              style={{
                ...viewStyles.histBar,
                height: h + "%",
                background: color,
                opacity: 0.35 + h / 100
              }}
            />
          );
        })}
      </div>

      <div style={viewStyles.marketLegend}>
        Distribuzione reale · {g.mercato.campione} gare
      </div>
    </div>
  </div>

  <div style={viewStyles.rangeBar}>
    <div style={{ ...viewStyles.rangeSegment, background: "#22ff88", width: "25%" }} />
    <div style={{ ...viewStyles.rangeSegment, background: "#ffcc33", width: "35%" }} />
    <div style={{ ...viewStyles.rangeSegment, background: "#ff8a33", width: "22%" }} />
    <div style={{ ...viewStyles.rangeSegment, background: "#ff4d5e", width: "18%" }} />

    <div style={{ ...viewStyles.marker, left: g.mercato.posizione + "%" }} />
  </div>

  <div style={viewStyles.rangeLabels}>
    <span>Prudente</span>
    <span>Ordinaria</span>
    <span>Competitiva</span>
    <span>Aggressiva</span>
  </div>
</div>

         <div
  id="COMPETITOR"
  className={
    activeSide === "COMPETITOR"
      ? "panel-hover active-section-pulse"
      : "panel-hover"
  }
  style={{
    ...viewStyles.competitor,
    ...(isActiveSection("COMPETITOR") && {
      border: "1px solid rgba(196,181,253,0.62)",
      boxShadow:
        "0 0 0 1px rgba(226,232,240,0.13), 0 0 30px rgba(196,181,253,0.30), 0 0 24px rgba(139,92,246,0.28), inset 0 0 18px rgba(255,255,255,0.04)"
    })
  }}
>
  <div style={viewStyles.marketHeader}>
    <div>
      <div style={viewStyles.marketTitle}>PRESSIONE COMPETITIVA</div>
      <div style={viewStyles.marketSubtitle}>
        Competitor storici rilevati su gare realmente comparabili
      </div>
    </div>

    <div style={viewStyles.marketBadge}>
      {g.competitor.length} COMPETITOR ATTIVI
    </div>
  </div>

  <div style={viewStyles.compGrid}>
    {g.competitor.map((c, i) => {
      const media = parseFloat(c.mediaRibassi);

      const riskColor =
        c.rischio === "ALTO"
          ? "#ff4d5e"
          : c.rischio === "MEDIO"
          ? "#ffcc33"
          : "#22ff88";

      const mediaColor =
        media > 30
          ? "#ff4d5e"
          : media > 15
          ? "#ffcc33"
          : "#22ff88";

      return (
        <div
          key={i}
          style={{
            ...viewStyles.compCard,
            border:
              c.rischio === "ALTO"
                ? "1px solid rgba(255,77,94,0.32)"
                : c.rischio === "MEDIO"
                ? "1px solid rgba(255,204,51,0.24)"
                : "1px solid rgba(255,255,255,0.06)"
          }}
        >
          <div style={viewStyles.compTop}>
            <div style={viewStyles.compName}>{c.nome}</div>

            <div
              style={{
                ...viewStyles.compRiskBadge,
                color: riskColor,
                border: "1px solid " + riskColor + "33",
                background:
                  c.rischio === "ALTO"
                    ? "rgba(255,77,94,0.10)"
                    : c.rischio === "MEDIO"
                    ? "rgba(255,204,51,0.10)"
                    : "rgba(34,255,136,0.10)"
              }}
            >
              {c.rischio}
            </div>
          </div>

          <div style={viewStyles.compMetaRow}>
            <span style={viewStyles.compMetaLabel}>Gare vinte rilevate</span>
            <span style={viewStyles.compMetaValue}>{c.gareVinte}</span>
          </div>

          <div style={viewStyles.compMetaRow}>
            <span style={viewStyles.compMetaLabel}>Comportamento medio</span>
            <span style={{ ...viewStyles.compMediaValue, color: mediaColor }}>
              {c.mediaRibassi}
            </span>
          </div>

          {c.segnale && (
            <div
              style={{
                ...viewStyles.warning,
                marginTop: "10px",
                border:
                  c.rischio === "ALTO"
                    ? "1px solid rgba(255,77,94,0.35)"
                    : "1px solid rgba(255,204,51,0.28)",
                background:
                  c.rischio === "ALTO"
                    ? "rgba(255,77,94,0.08)"
                    : "rgba(255,204,51,0.08)"
              }}
            >
              {c.segnale}
            </div>
          )}

          <div style={viewStyles.compDivider} />

          <div style={viewStyles.miniTitle}>Storico CIG comparabili</div>

          {c.cig.map((x) => (
            <div key={x.id} style={viewStyles.cigLine}>
              <a
                href={anacLink(x.id)}
                target="_blank"
                className="data-link"
                style={viewStyles.cleanLink}
              >
                {x.id}
              </a>

              <span
  style={{
    fontWeight: "800",
    fontVariantNumeric: "tabular-nums",
    letterSpacing: "0.15px",
    color:
      x.ribasso === "N/D"
        ? "rgba(255,255,255,0.30)"
        : parseFloat(x.ribasso) > 30
        ? "#ff4d5e"
        : parseFloat(x.ribasso) > 15
        ? "#ffcc33"
        : "#22ff88"
  }}
>
  {x.ribasso}
</span>
            </div>
          ))}
        </div>
      );
    })}
  </div>
</div>
          <div
  id="DOCUMENTI"
  className={activeSide === "DOCUMENTI" ? "panel-hover active-section-pulse" : "panel-hover"}
  style={{
    ...viewStyles.decision,
    ...(isActiveSection("DOCUMENTI") && {
      border: "1px solid rgba(196,181,253,0.62)",
      boxShadow:
        "0 0 0 1px rgba(226,232,240,0.13), 0 0 30px rgba(196,181,253,0.30), 0 0 24px rgba(139,92,246,0.28), inset 0 0 18px rgba(255,255,255,0.04)"
    })
  }}
>
            <div style={viewStyles.boxTitle}>LETTURA FINALE</div>

<div style={viewStyles.finalVerdict}>
  <div style={viewStyles.finalBadge}>VERDETTO OPERATIVO</div>
  <div style={viewStyles.finalBig}>{g.finale}</div>

  <div style={viewStyles.finalMiniGrid}>
  <div style={viewStyles.finalMiniItem}>
    <span>Fit</span>
    <b>{g.fit.score}%</b>
  </div>

  <div style={viewStyles.finalMiniItem}>
    <span>Mercato</span>
    <b>{g.mercato.lettura}</b>
  </div>

  <div style={viewStyles.finalMiniItem}>
    <span>Azione</span>
    <b>{g.decisione}</b>
  </div>
</div>
</div>

<div style={viewStyles.docBox}>
  <div style={viewStyles.boxTitle}>RISORSE OPERATIVE</div>

  {g.documenti.map((d, i) => {
    const url = getDocUrl({
      ...d,
      cig: g.cig
    });

    const label =
      d.nome === "Apri scheda ANAC" ? "Apri ANAC" : d.nome;

    const isJson = label === "JSON gara";
    const isReport = label === "Report analisi";

    const cleanCig = String(g.cig || "").trim().toUpperCase();

    const jsonUrl =
  isJson && cleanCig
    ? "/json/gara_" + cleanCig + ".json"
    : null;

const reportUrl =
  isReport && cleanCig
    ? "/report/report_" + cleanCig + ".pdf"
    : null;

    if (url) {
      return (
        <a
          key={i}
          href={
  isJson && jsonUrl
    ? jsonUrl
    : isReport && reportUrl
      ? reportUrl
      : url
}
          target={isJson ? undefined : "_blank"}
          className="soft-button"
          style={viewStyles.docButton}
          download={
  isJson
    ? "gara_" + cleanCig + ".json"
    : isReport
      ? "report_" + cleanCig + ".pdf"
      : undefined
}
        >
          <span>{label}</span>

          <span style={viewStyles.docIcon}>
            {isJson ? "{ }" : isReport ? "PDF" : "↗️"}
          </span>
        </a>
      );
    }

    return (
      <div
        key={i}
        style={{
          ...viewStyles.docButton,
          opacity: 0.42,
          cursor: "not-allowed"
        }}
      >
        <span>{label}</span>
        <span style={viewStyles.docIcon}>...</span>
      </div>
    );
  })}
</div>
          </div>

          <div style={viewStyles.footer}>
 Appalti Radar • Procurement intelligence per uffici gare • Output operativo basato su fonti pubbliche e analisi comparabile
</div>
        </div>
      </div>
      </main>
    </>
  );
}

const mobileStyles = {
  page: {
    width: "100vw",
    minHeight: "100svh",
    background: "#000000",
    color: "#ffffff",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "18px 18px 28px 18px",
    boxSizing: "border-box",
    overflowY: "auto"
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    marginTop: "6px",
    border: "1px solid rgba(196,181,253,0.22)",
    borderRadius: "22px",
    background: "#000000",
    boxShadow:
      "0 18px 50px rgba(0,0,0,0.75), 0 0 34px rgba(139,92,246,0.13), inset 0 0 18px rgba(255,255,255,0.018)",
    padding: "22px 18px",
    boxSizing: "border-box",
    textAlign: "center"
  },

  logo: {
    width: "74px",
    height: "74px",
    objectFit: "contain",
    display: "block",
    margin: "0 auto 12px auto",
    background: "transparent",
    filter: "none"
  },

  kicker: {
    color: "rgba(196,181,253,0.92)",
    fontSize: "10px",
    fontWeight: "900",
    letterSpacing: "2.4px",
    marginBottom: "12px"
  },

  title: {
    margin: "0 0 13px 0",
    color: "#ffffff",
    fontSize: "20px",
    lineHeight: "1.18",
    fontWeight: "900",
    letterSpacing: "-0.35px"
  },

  text: {
    margin: "0 auto 12px auto",
    color: "rgba(255,255,255,0.68)",
    fontSize: "14px",
    lineHeight: "1.5",
    fontWeight: "500"
  },

  textStrong: {
    margin: "0 auto 14px auto",
    color: "rgba(255,255,255,0.92)",
    fontSize: "14px",
    lineHeight: "1.52",
    fontWeight: "800"
  },

  scoreRow: {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "14px",
    flexWrap: "wrap"
  },

  scoreBadge: {
    padding: "7px 11px",
    borderRadius: "999px",
    background: "rgba(34,255,136,0.10)",
    border: "1px solid rgba(34,255,136,0.28)",
    color: "#22ff88",
    fontSize: "11px",
    fontWeight: "900",
    letterSpacing: "0.6px",
    boxShadow: "0 0 16px rgba(34,255,136,0.08)"
  },

  priorityBadge: {
    padding: "7px 11px",
    borderRadius: "999px",
    background: "rgba(139,92,246,0.14)",
    border: "1px solid rgba(196,181,253,0.25)",
    color: "#e9d5ff",
    fontSize: "11px",
    fontWeight: "900",
    letterSpacing: "0.6px"
  },

  infoBox: {
    marginTop: "16px",
    marginBottom: "14px",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.028)",
    overflow: "hidden"
  },

  infoLine: {
    display: "flex",
    justifyContent: "space-between",
    gap: "14px",
    padding: "10px 12px",
    borderBottom: "1px solid rgba(255,255,255,0.055)",
    color: "rgba(255,255,255,0.64)",
    fontSize: "13px",
    fontWeight: "700",
    textAlign: "left"
  },

  mobileActions: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "8px",
    marginTop: "16px",
    marginBottom: "14px"
  },

  mobileActionSecondary: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "42px",
    borderRadius: "13px",
    background: "rgba(255,255,255,0.026)",
    border: "1px solid rgba(196,181,253,0.20)",
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "12px",
    fontWeight: "900",
    letterSpacing: "0.3px",
    boxSizing: "border-box",
    transition: "all 0.2s ease"
  },

  desktopBox: {
    marginTop: "13px",
    padding: "12px 14px",
    borderRadius: "14px",
    border: "1px solid rgba(196,181,253,0.20)",
    background: "rgba(139,92,246,0.06)",
    color: "#ffffff",
    fontSize: "12.5px",
    fontWeight: "800",
    lineHeight: "1.4"
  },

  note: {
    borderTop: "1px solid rgba(255,255,255,0.07)",
    marginTop: "14px",
    paddingTop: "13px",
    color: "rgba(255,255,255,0.48)",
    fontSize: "11.5px",
    lineHeight: "1.45",
    fontWeight: "650"
  }
};

const s = {
  page: {
  display: "flex",
  background: "#000000",
  color: "#ffffff",
  minHeight: "100vh",
  height: "100vh",
  fontFamily: "Arial, sans-serif",
  overflowX: "hidden",
  overflowY: "auto",
  paddingTop: "0px"
},

sidebar: {
  width: "156px",
  background: "#000000",
  padding: "9px 9px",
  borderRight: "1px solid rgba(255,255,255,0.06)",
  boxShadow: "none",
  flexShrink: 0
},

brandLogoWrapper: {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "8px",
  background: "#000000"
},

brandLogo: {
  width: "142px",
  height: "142px",
  display: "block",
  margin: "0 auto",
  objectFit: "contain",
  objectPosition: "center",
  background: "#000000",
  filter: "none"
},

sideMenu: {
  marginTop: "4px"
},

sideItem: {
  width: "100%",
  position: "relative",
  padding: "8px 0",
  textAlign: "center",
  color: "rgba(255,255,255,0.58)",
  background: "transparent",
  border: "none",
  fontSize: "9px",
  fontWeight: "850",
  letterSpacing: "1.25px",
  transition: "all 0.18s ease",
  cursor: "pointer"
},

sideItemActive: {
  width: "100%",
  position: "relative",
  padding: "8px 0",
  textAlign: "center",
  color: "#ffffff",
  background: "transparent",
  border: "none",
  fontSize: "9px",
  fontWeight: "900",
  letterSpacing: "1.25px",
  textShadow: "0 0 10px rgba(196,181,253,0.48), 0 0 16px rgba(139,92,246,0.24)",
  transition: "all 0.18s ease",
  cursor: "pointer"
},

sideMarker: {
  position: "absolute",
  left: "6px",
  top: "50%",
  transform: "translateY(-50%)",
  width: "2px",
  height: "18px",
  borderRadius: "10px",
  background: "linear-gradient(180deg, #e5e7eb, #8b5cf6)",
  boxShadow: "0 0 12px rgba(196,181,253,0.68), 0 0 18px rgba(139,92,246,0.32)"
},

sideStatus: {
  marginTop: "32px",
  padding: "9px",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: "8px",
  background: "rgba(255,255,255,0.02)",
  color: "rgba(255,255,255,0.55)",
  fontSize: "9px",
  lineHeight: "1.35"
},

statusLine: {
  color: "rgba(255,255,255,0.82)",
  marginBottom: "5px"
},

statusDate: {
  color: "#22ff88"
},

main: {
  flex: 1,
  padding: "15px 12px 18px 12px",
  width: "100%",
  background: "#000000",
  minWidth: 0
},

  header: {
  height: "48px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
  padding: "2px 6px 0 6px",
  background: "#000000",
  borderBottom: "1px solid rgba(255,255,255,0.06)"
},

  headerLeft: {
    minWidth: 0
  },

  headerRight: {
  display: "flex",
  alignItems: "center",
  gap: "14px",
  background: "transparent",
  flexShrink: 0,
  paddingLeft: "8px"
},

  title: {
  fontWeight: "800",
  fontSize: "19px",
  letterSpacing: "0.6px",
  color: "#ffffff",
  background: "transparent",
  lineHeight: "1"
},

  sub: {
  fontSize: "11px",
  color: "rgba(255,255,255,0.75)",
  background: "transparent",
  marginTop: "3px",
  letterSpacing: "0.2px",
  lineHeight: "1.3"
},

  live: {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "9.5px",
  fontWeight: "700",
  color: "#22c55e",
  letterSpacing: "0.4px",
  background: "transparent"
},

  liveDot: {
  width: "6px",
  height: "6px",
  borderRadius: "50%",
  background: "#22c55e",
  boxShadow: "0 0 3px rgba(34,197,94,0.5)"
},

  topButton: {
  background: "rgba(255,255,255,0.04)",
  color: "#ffffff",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "6px",
  padding: "6px 12px",
  fontSize: "9.5px",
  fontWeight: "700",
  textDecoration: "none",
  letterSpacing: "0.3px",
  whiteSpace: "nowrap",
  transition: "all 0.22s ease"
},

  grid: {
  display: "grid",
  gridTemplateColumns: "repeat(12, 1fr)",
  gap: "11px",
  minHeight: "auto",
  height: "auto",
  paddingBottom: "36px",
  background: "#000000"
},

  hero: {
  gridColumn: "span 12",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  minHeight: "154px",
  padding: "12px 14px",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: "14px",
  background: "linear-gradient(180deg, rgba(6,10,16,0.96), rgba(0,0,0,1))",
  boxShadow: "inset 0 0 18px rgba(255,255,255,0.02)",
  overflow: "hidden",
  scrollMarginTop: "18px",
  transition: "all 0.25s ease",
  cursor: "default"
},

heroLeft: {
  flex: 1,
  minWidth: 0,
  paddingRight: "18px" // più aria tra testo e score
},

heroRight: {
  width: "154px", // più presenza
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  flexShrink: 0
},


liveDetected: {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "5px 9px",
  borderRadius: "999px",
  border: "1px solid rgba(34,255,136,0.22)",
  background: "rgba(34,255,136,0.07)",
  color: "#22ff88",
  fontSize: "9.5px",
  fontWeight: "900",
  letterSpacing: "0.7px",
  marginBottom: "7px"
},

liveDetectedDot: {
  width: "6px",
  height: "6px",
  borderRadius: "50%",
  background: "#22ff88",
  boxShadow: "0 0 10px rgba(34,255,136,0.80)"
},

  priority: {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  color: "rgba(255,107,114,0.92)",
  fontSize: "10.5px",
  fontWeight: "800",
  letterSpacing: "0.45px",
  background: "rgba(255,255,255,0.025)",
  border: "1px solid rgba(255,255,255,0.09)",
  borderRadius: "6px",
  padding: "3px 8px"
},

priorityDot: {
  width: "5px",
  height: "5px",
  borderRadius: "50%",
  background: "#ff6b72"
},

h1: {
  margin: "7px 0 4px 0",
  fontSize: "24px",
  lineHeight: "1.04",
  fontWeight: "850",
  color: "#ffffff",
  background: "transparent",
  letterSpacing: "-0.2px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  textShadow: "none"
},

headline: {
  color: "rgba(255,255,255,0.66)",
  fontSize: "12px",
  fontWeight: "500",
  marginTop: "2px",
  background: "transparent",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  letterSpacing: "0.15px"
},

  infoGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(6, 1fr)",
  gap: "10px",
  marginTop: "10px",
  fontSize: "10.5px",
  background: "transparent"
},

infoCell: {
  padding: "7px 8px",
  border: "1px solid rgba(255,255,255,0.075)",
  borderRadius: "8px",
  background: "rgba(255,255,255,0.018)",
  lineHeight: "1.18",
  minWidth: 0,
  overflow: "hidden"
},

infoLabel: {
  display: "block",
  color: "rgba(255,255,255,0.48)",
  fontSize: "9.5px",
  marginBottom: "3px",
  letterSpacing: "0.35px",
  fontWeight: "600"
},

infoValue: {
  display: "block",
  color: "#ffffff",
  fontWeight: "750",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis"
},

infoValueLink: {
  display: "block",
  color: "#ffffff",
  fontWeight: "750",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  textDecoration: "none"
},

  gauge: {
  width: "84px",
  height: "84px",
  borderRadius: "50%",
  border: "2px solid rgba(34,255,136,0.65)",
  background: "#000000",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0 0 18px rgba(34,255,136,0.18), inset 0 0 18px rgba(34,255,136,0.04)",
  transition: "all 0.25s ease"
},

gaugeInner: {
  textAlign: "center",
  background: "transparent"
},

score: {
  fontSize: "30px",
  fontWeight: "900",
  color: "#22ff88",
  lineHeight: "1",
  background: "transparent"
},

scoreLabel: {
  marginTop: "5px",
  color: "rgba(255,255,255,0.86)",
  fontSize: "9.5px",
  fontWeight: "800",
  letterSpacing: "1.3px",
  background: "transparent"
},

action: {
  background: "rgba(34,255,136,0.08)",
  color: "#22ff88",
  padding: "9px 16px",
  border: "1px solid rgba(34,255,136,0.25)",
  borderRadius: "6px",
  fontWeight: "850",
  fontSize: "10.8px",
  letterSpacing: "0.8px",
  whiteSpace: "nowrap",
  boxShadow: "0 0 14px rgba(34,255,136,0.10), inset 0 0 10px rgba(34,255,136,0.045)",
  transition: "all 0.22s ease"
},

  exec: {
  gridColumn: "span 3",
  minHeight: "132px",
  padding: "12px",
  border: "1px solid rgba(255,255,255,0.085)",
  borderRadius: "12px",
  background: "linear-gradient(180deg, rgba(6,10,16,0.90), rgba(0,0,0,0.98))",
  overflow: "hidden",
  boxShadow: "inset 0 0 14px rgba(255,255,255,0.018)",
  transition: "all 0.25s ease",
  cursor: "default"
},

motiviList: {
  display: "grid",
  gap: "4px"
},

check: {
  color: "#22ff88",
  marginRight: "6px"
},

fitPanel: {
  gridColumn: "span 3",
  minHeight: "132px",
  padding: "12px",
  border: "1px solid rgba(255,255,255,0.085)",
  borderRadius: "12px",
  background: "linear-gradient(180deg, rgba(6,10,16,0.90), rgba(0,0,0,0.98))",
  overflow: "hidden",
  boxShadow: "inset 0 0 14px rgba(255,255,255,0.018)",
  transition: "all 0.25s ease",
  cursor: "default"
},

fitRow: {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  height: "76px",
  background: "transparent"
},

fitCircle: {
  width: "54px",
  height: "54px",
  borderRadius: "50%",
  border: "2px solid rgba(34,255,136,0.45)",
  background: "#000000",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#22ff88",
  fontWeight: "800",
  fontSize: "16px",
  boxShadow: "0 0 4px rgba(34,255,136,0.12)",
  flexShrink: 0
},

fitTexts: {
  minWidth: 0
},

fitText: {
  fontSize: "11.2px",
  color: "rgba(255,255,255,0.80)",
  marginTop: "5px",
  lineHeight: "1.22",
  background: "transparent"
},

actionPanel: {
  gridColumn: "span 3",
  minHeight: "132px",
  padding: "12px",
  border: "1px solid rgba(255,255,255,0.085)",
  borderRadius: "12px",
  background: "linear-gradient(180deg, rgba(6,10,16,0.90), rgba(0,0,0,0.98))",
  overflow: "hidden",
  boxShadow: "inset 0 0 14px rgba(255,255,255,0.018)",
  transition: "all 0.25s ease",
  cursor: "default",
  scrollMarginTop: "22px"
},

  historyBox: {
  fontSize: "11.4px",
  fontWeight: "650",
  lineHeight: "1.32",
  color: "rgba(255,255,255,0.82)",
  background: "transparent"
},

historyTop: {
  color: "#22ff88",
  fontWeight: "900",
  marginBottom: "5px",
  background: "transparent",
  textShadow: "0 0 7px rgba(34,255,136,0.16)"
},

cleanLink: {
  color: "#ffffff",
  textDecoration: "none",
  fontWeight: "700"
},

summaryPanel: {
  gridColumn: "span 3",
  minHeight: "132px",
  padding: "12px",
  border: "1px solid rgba(255,255,255,0.085)",
  borderRadius: "12px",
  background: "linear-gradient(180deg, rgba(6,10,16,0.90), rgba(0,0,0,0.98))",
  fontSize: "11.4px",
  fontWeight: "650",
  lineHeight: "1.38",
  overflow: "hidden",
  boxShadow: "inset 0 0 14px rgba(255,255,255,0.018)",
  transition: "all 0.25s ease",
  cursor: "default"
},

marketBig: {
  gridColumn: "span 12",
  minHeight: "184px",
  padding: "13px 14px",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "10px",
  background: "linear-gradient(180deg, rgba(6,10,16,0.90), rgba(0,0,0,0.98))",
  overflow: "visible",
  boxShadow: "inset 0 0 14px rgba(255,255,255,0.02)",
  transition: "all 0.25s ease",
  cursor: "default",
  scrollMarginTop: "18px"
},

marketHeader: {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "10px",
  background: "transparent"
},

marketTitle: {
  fontWeight: "900",
  marginBottom: "5px",
  fontSize: "11.2px",
  color: "rgba(255,255,255,0.94)",
  letterSpacing: "0.72px",
  background: "transparent",
  textTransform: "uppercase"
},

marketSubtitle: {
  fontSize: "10.2px",
  fontWeight: "700",
  color: "rgba(255,255,255,0.62)",
  marginTop: "1px",
  letterSpacing: "0.02em",
  background: "transparent"
},

marketBadge: {
  fontSize: "9.3px",
  fontWeight: "900",
  letterSpacing: "0.08em",
  color: "#ffcc33",
  padding: "4px 9px",
  borderRadius: "999px",
  border: "1px solid rgba(255,204,51,0.28)",
  background: "rgba(255,204,51,0.08)",
  height: "28px",
  display: "flex",
  alignItems: "center",
  whiteSpace: "nowrap"
},

marketRow: {
  display: "grid",
  gridTemplateColumns: "1fr 214px",
  alignItems: "center",
  gap: "16px",
  marginTop: "10px",
  fontSize: "11px",
  lineHeight: "1.22",
  background: "transparent"
},

marketFacts: {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "8px 24px",
  background: "transparent"
},

marketKpi: {
  display: "flex",
  flexDirection: "column",
  gap: "1px",
  minWidth: 0,
  background: "transparent"
},

marketKpiValue: {
  fontSize: "14px",
  fontWeight: "900",
  color: "#ffffff",
  lineHeight: "1"
},

marketKpiLabel: {
  fontSize: "10.2px",
  fontWeight: "750",
  color: "rgba(255,255,255,0.62)",
  lineHeight: "1.15"
},

marketReading: {
  gridColumn: "span 2",
  marginTop: "10px",
  padding: "10px 12px",
  borderRadius: "10px",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.06)",
  fontSize: "10.5px",
  lineHeight: "1.45",
  color: "rgba(255,255,255,0.78)",
  fontWeight: "650"
},

note: {
  gridColumn: "span 2",
  color: "rgba(255,255,255,0.55)",
  fontSize: "9.5px",
  marginTop: "2px",
  background: "transparent"
},

chart: {
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "flex-end",
  height: "66px",
  gap: "4px",
  background: "transparent"
},

histBar: {
  width: "8px",
  borderRadius: "3px 3px 1px 1px",
  boxShadow: "0 0 8px rgba(255,255,255,0.10)"
},

marketLegend: {
  fontSize: "9.3px",
  fontWeight: "750",
  color: "rgba(255,255,255,0.60)",
  marginTop: "4px",
  textAlign: "right",
  background: "transparent"
},

rangeBar: {
  position: "relative",
  display: "flex",
  height: "11px",
  borderRadius: "999px",
  marginTop: "13px",
  background: "rgba(255,255,255,0.10)",
  boxShadow: "0 0 14px rgba(255,255,255,0.13), 0 0 18px rgba(139,92,246,0.10)",
  overflow: "visible"
},

rangeSegment: {
  height: "100%"
},

marker: {
  position: "absolute",
  top: "-6px",
  width: "2px",
  height: "23px",
  background: "#ffffff",
  boxShadow: "0 0 10px rgba(255,255,255,0.82), 0 0 14px rgba(196,181,253,0.42)"
},


rangeLabels: {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "9px",
  fontWeight: "800",
  marginTop: "5px",
  color: "rgba(255,255,255,0.56)",
  background: "transparent"
},

competitor: {
  gridColumn: "span 8",
  minHeight: "250px",
  padding: "14px",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "14px",
  background:
    "linear-gradient(180deg, rgba(4,8,18,0.96), rgba(0,0,0,0.98))",
  overflow: "hidden",
  boxShadow:
    "0 0 20px rgba(0,0,0,0.45), inset 0 0 18px rgba(139,92,246,0.03)",
  transition: "all 0.25s ease",
  scrollMarginTop: "22px"
},

compGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "12px",
  marginTop: "12px",
  background: "transparent"
},

compCard: {
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.025), rgba(0,0,0,0.34))",
  padding: "12px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.06)",
  minHeight: "228px",
  overflow: "hidden",
  backdropFilter: "blur(8px)",
  boxShadow:
    "0 0 14px rgba(0,0,0,0.34), inset 0 0 10px rgba(255,255,255,0.02)",
    display: "flex",
flexDirection: "column",
justifyContent: "flex-start",
  transition: "all 0.22s ease"
},

compTop: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "8px",
  marginBottom: "10px",
  background: "transparent"
},

compName: {
  fontWeight: "900",
  color: "#ffffff",
  fontSize: "13px",
  lineHeight: "1.2",
  letterSpacing: "0.2px",
  background: "transparent",
  maxWidth: "78%"
},

compRiskBadge: {
  padding: "4px 8px",
  borderRadius: "999px",
  fontSize: "9px",
  fontWeight: "900",
  letterSpacing: "0.5px",
  textTransform: "uppercase",
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(6px)"
},

compMetaRow: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "6px",
  background: "transparent"
},

compMetaLabel: {
  color: "rgba(255,255,255,0.58)",
  fontSize: "10px",
  fontWeight: "700",
  background: "transparent"
},

compMetaValue: {
  color: "#ffffff",
  fontSize: "11px",
  fontWeight: "900",
  background: "transparent"
},

compMediaValue: {
  fontSize: "11.2px",
  fontWeight: "900",
  letterSpacing: "0.1px",
  background: "transparent"
},

warning: {
  color: "#ff7b86",
  fontSize: "9.8px",
  fontWeight: "850",
  lineHeight: "1.25",
  letterSpacing: "0.15px",
  borderRadius: "7px",
  padding: "5px 7px",
  background: "rgba(255,77,94,0.06)"
},

compDivider: {
  height: "1px",
  width: "100%",
  background: "rgba(255,255,255,0.06)",
  marginTop: "10px",
  marginBottom: "10px"
},

miniTitle: {
  color: "rgba(255,255,255,0.42)",
  fontSize: "8.8px",
  fontWeight: "900",
  marginBottom: "6px",
  letterSpacing: "0.6px",
  textTransform: "uppercase",
  background: "transparent"
},

cigLine: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "10px",
  fontSize: "10px",
  lineHeight: "1.35",
  paddingBottom: "3px",
  marginBottom: "3px",
  borderBottom: "1px solid rgba(255,255,255,0.04)",
  color: "rgba(255,255,255,0.74)",
  background: "transparent",
  fontVariantNumeric: "tabular-nums"
},

decision: {
  gridColumn: "span 4",
  minHeight: "250px",
  padding: "14px",
  border: "1px solid rgba(34,255,136,0.26)",
  borderRadius: "16px",
  background:
    "radial-gradient(circle at 20% 0%, rgba(34,255,136,0.12), transparent 34%), linear-gradient(180deg, rgba(4,18,10,0.96), rgba(0,0,0,0.98))",
  overflow: "hidden",
  boxShadow:
    "0 0 22px rgba(34,255,136,0.10), inset 0 0 16px rgba(34,255,136,0.05)",
  transition: "all 0.25s ease",
  scrollMarginTop: "22px"
},

finalVerdict: {
  padding: "11px 12px",
  borderRadius: "12px",
  border: "1px solid rgba(34,255,136,0.18)",
  background:
    "linear-gradient(180deg, rgba(34,255,136,0.075), rgba(0,0,0,0.18))",
  boxShadow: "inset 0 0 12px rgba(34,255,136,0.035)"
},

finalBadge: {
  display: "inline-flex",
  alignItems: "center",
  width: "fit-content",
  padding: "4px 8px",
  marginBottom: "8px",
  borderRadius: "999px",
  border: "1px solid rgba(34,255,136,0.26)",
  background: "rgba(34,255,136,0.08)",
  color: "#22ff88",
  fontSize: "8.8px",
  fontWeight: "950",
  letterSpacing: "0.55px",
  textTransform: "uppercase"
},

finalBig: {
  color: "#22ff88",
  fontWeight: "950",
  fontSize: "15.4px",
  lineHeight: "1.28",
  letterSpacing: "0.1px",
  background: "transparent",
  textShadow: "0 0 10px rgba(34,255,136,0.18)"
},

finalMiniGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "7px",
  marginTop: "12px",
  background: "transparent"
},

finalMiniItem: {
  padding: "7px 8px",
  borderRadius: "9px",
  border: "1px solid rgba(255,255,255,0.07)",
  background: "rgba(255,255,255,0.035)",
  display: "flex",
  flexDirection: "column",
  gap: "3px",
  color: "rgba(255,255,255,0.68)",
  fontSize: "8.7px",
  fontWeight: "800",
  textTransform: "uppercase"
},

docBox: {
  marginTop: "12px",
  background: "transparent"
},

docButton: {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  background:
    "linear-gradient(180deg, rgba(139,92,246,0.10), rgba(15,23,42,0.22))",
  color: "#f3e8ff",
  border: "1px solid rgba(196,181,253,0.28)",
  borderRadius: "9px",
  padding: "8px 10px",
  marginTop: "7px",
  fontSize: "10.7px",
  fontWeight: "900",
  textAlign: "left",
  textDecoration: "none",
  boxShadow:
    "0 0 9px rgba(139,92,246,0.09), inset 0 0 8px rgba(255,255,255,0.025)",
  cursor: "pointer",
  transition: "all 0.22s ease"
},

docIcon: {
  opacity: 0.72,
  fontSize: "9px",
  marginLeft: "10px",
  fontWeight: "950",
  color: "rgba(255,255,255,0.82)"
},

boxTitle: {
  fontWeight: "950",
  marginBottom: "10px",
  fontSize: "10.5px",
  color: "rgba(255,255,255,0.92)",
  letterSpacing: "0.75px",
  textTransform: "uppercase",
  background: "transparent"
},

motivo: {
  marginBottom: "6px",
  fontSize: "11.2px",
  color: "rgba(255,255,255,0.84)",
  lineHeight: "1.28",
  background: "transparent"
},

footer: {
  gridColumn: "span 12",
  minHeight: "28px",
  padding: "10px 12px 0 12px",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  textAlign: "center",
  color: "rgba(255,255,255,0.70)",
  fontSize: "9.4px",
  lineHeight: "1.2",
  letterSpacing: "0.2px",
  borderTop: "1px solid rgba(255,255,255,0.06)",
  background: "#000000"
},
}

/*
PDF / PRINT ENTERPRISE OVERRIDES
Questo blocco serve a rendere il PDF piu pulito, leggibile e stabile.
Uso:
1. Lascia const s come blocco base live.
2. Crea isPrint nella pagina.
3. Usa const viewStyles = isPrint ? mergeStyles(s, printStyles) : s;
4. Poi sostituisci style={viewStyles.nome} con style={viewStyles.nome} solo quando vuoi applicare la versione print.
*/

const printStyles = {
  heroRight: {
  width: "148px",
  background: "transparent",
  boxShadow: "none"
},

action: {
  background: "transparent",
  boxShadow: "none"
},

fitBadgeWrap: {
  background: "transparent",
  boxShadow: "none"
},

fitBadge: {
  background: "#000000",
  boxShadow: "none"
},

liveBadge: {
  background: "transparent",
  boxShadow: "none"
},

liveDot: {
  background: "#22c55e",
  boxShadow: "none"
},


  page: {
  width: "1920px",
  minWidth: "1920px",
  height: "1080px",
  minHeight: "1080px",
  overflow: "hidden",
  background: "#000000",
  boxSizing: "border-box",
  zoom: "0.56"
},

  sidebar: {
    width: "148px",
    padding: "8px 8px",
    boxShadow: "none"
  },

  brandLogo: {
    width: "128px",
    height: "128px"
  },

  main: {
    padding: "12px 12px 10px 12px",
    width: "1772px",
    minWidth: "1772px",
    overflow: "hidden",
    boxSizing: "border-box"
  },

  header: {
    height: "44px",
    marginBottom: "8px"
  },

  title: {
    fontSize: "18px"
  },

  sub: {
    fontSize: "10px"
  },

  grid: {
    gap: "9px",
    paddingBottom: "0px"
  },

  hero: {
    minHeight: "132px",
    padding: "10px 12px",
    borderRadius: "12px",
    boxShadow: "inset 0 0 10px rgba(255,255,255,0.018)"
  },

  h1: {
    fontSize: "22px"
  },

  headline: {
    fontSize: "10.8px"
  },

  infoGrid: {
    gap: "8px",
    marginTop: "9px"
  },

  infoCell: {
    padding: "6px 7px"
  },

  gauge: {
    width: "76px",
    height: "76px",
    boxShadow: "0 0 10px rgba(34,255,136,0.12)"
  },

  score: {
    fontSize: "27px"
  },

  action: {
    padding: "8px 13px",
    boxShadow: "none"
  },

  exec: {
    minHeight: "118px",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "none"
  },

  fitPanel: {
    minHeight: "118px",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "none",
    boxSizing: "border-box"
  },

  fitRow: {
    gap: "9px",
    minHeight: "68px",
    height: "auto"
  },

  fitCircle: {
    width: "46px",
    height: "46px",
    fontSize: "14px",
    boxShadow: "none"
  },

  fitTexts: {
    flex: 1,
    minWidth: 0,
    overflow: "hidden"
  },

  fitText: {
    fontSize: "9.9px",
    lineHeight: "1.18",
    marginTop: "3px",
    overflowWrap: "break-word"
  },

  actionPanel: {
    minHeight: "118px",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "none"
  },

  summaryPanel: {
    minHeight: "118px",
    padding: "10px",
    borderRadius: "10px",
    fontSize: "10.2px",
    boxShadow: "none"
  },

  marketBig: {
    minHeight: "174px",
    padding: "11px 12px",
    borderRadius: "10px",
    boxShadow: "none",
    overflow: "hidden"
  },

  marketRow: {
    gridTemplateColumns: "1fr 190px",
    gap: "12px",
    marginTop: "8px"
  },

  marketReading: {
    marginTop: "8px",
    padding: "8px 10px",
    fontSize: "9.6px",
    lineHeight: "1.32"
  },

  chart: {
    height: "56px",
    gap: "3px"
  },

  histBar: {
    width: "7px",
    boxShadow: "none"
  },

  rangeBar: {
    height: "9px",
    marginTop: "10px",
    boxShadow: "none"
  },

  marker: {
    height: "18px",
    top: "-4px",
    boxShadow: "none"
  },

  competitor: {
    minHeight: "228px",
    padding: "12px",
    borderRadius: "12px",
    boxShadow: "none"
  },

  compGrid: {
    gap: "10px",
    marginTop: "10px"
  },

  compCard: {
    minHeight: "206px",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "none",
    backdropFilter: "none"
  },

  compName: {
    fontSize: "11.6px",
    lineHeight: "1.16"
  },

  compMetaLabel: {
    fontSize: "9.1px"
  },

  compMetaValue: {
    fontSize: "10px"
  },

  cigLine: {
    fontSize: "9.2px",
    lineHeight: "1.22",
    marginBottom: "2px"
  },

  decision: {
    minHeight: "228px",
    padding: "12px",
    borderRadius: "12px",
    boxShadow: "none"
  },

  finalVerdict: {
    padding: "9px 10px",
    boxShadow: "none"
  },

  finalBig: {
    fontSize: "13.8px",
    lineHeight: "1.18",
    textShadow: "none"
  },

  finalMiniGrid: {
    gap: "6px",
    marginTop: "9px"
  },

  finalMiniItem: {
    padding: "6px 7px",
    fontSize: "7.9px"
  },

  docButton: {
    padding: "7px 9px",
    marginTop: "6px",
    fontSize: "9.6px",
    boxShadow: "none"
  },

  footer: {
    minHeight: "20px",
    padding: "7px 12px 0 12px",
    fontSize: "8.4px"
  },

  /* PDF MOBILE CLEAN FINAL OVERRIDES */
  historyTop: {
    color: "#22ff88",
    fontWeight: "900",
    marginBottom: "5px",
    background: "transparent",
    textShadow: "none",
    boxShadow: "none"
  },

  finalBig: {
    color: "#22ff88",
    fontWeight: "950",
    fontSize: "13.8px",
    lineHeight: "1.18",
    letterSpacing: "0.1px",
    background: "transparent",
    textShadow: "none",
    boxShadow: "none"
  },

  heroRight: {
    width: "142px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "9px",
    flexShrink: 0,
    background: "transparent",
    boxShadow: "none"
  },

  gauge: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    border: "2px solid rgba(34,255,136,0.62)",
    background: "#000000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "none"
  },

  gaugeInner: {
    textAlign: "center",
    background: "transparent",
    boxShadow: "none"
  },

  score: {
    fontSize: "24px",
    fontWeight: "900",
    color: "#22ff88",
    lineHeight: "1",
    background: "transparent",
    boxShadow: "none"
  },

  scoreLabel: {
    marginTop: "4px",
    color: "rgba(255,255,255,0.86)",
    fontSize: "8px",
    fontWeight: "900",
    letterSpacing: "1.1px",
    background: "transparent",
    boxShadow: "none"
  },

  action: {
    background: "transparent",
    color: "#22ff88",
    padding: "6px 10px",
    border: "1px solid rgba(34,255,136,0.34)",
    borderRadius: "6px",
    fontWeight: "900",
    fontSize: "9.2px",
    letterSpacing: "0.6px",
    whiteSpace: "nowrap",
    boxShadow: "none"
  },

  live: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "8.2px",
    fontWeight: "900",
    color: "#22c55e",
    letterSpacing: "0.35px",
    background: "transparent",
    boxShadow: "none"
  },

  liveDot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    background: "#22c55e",
    boxShadow: "none"
  },
};

function mergeStyles(base, overrides) {
  const merged = { ...base };

  Object.keys(overrides).forEach((key) => {
    merged[key] = {
      ...(base[key] || {}),
      ...(overrides[key] || {})
    };
  });

  return merged;
}
