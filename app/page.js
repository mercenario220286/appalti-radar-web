"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { buildGaraViewModel } from "@/lib/garaAdapter";

function anacLink(cig) {
  return "https://dettaglio-cig.anticorruzione.it/cig/" + cig;
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

function MobileBlocked() {
  return (
    <main
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        minHeight: "100dvh",
        background: "#000000",
        color: "#ffffff",
        zIndex: 999999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "360px",
          textAlign: "center"
        }}
      >
        <img
          src="/appalti-gara-logo.png"
          alt="Appalti Radar"
          style={{
            width: "54px",
            height: "54px",
            objectFit: "contain",
            marginBottom: "24px"
          }}
        />

        <div
          style={{
            fontSize: "13px",
            fontWeight: "700",
            letterSpacing: "2px",
            marginBottom: "14px",
            color: "rgba(255,255,255,0.7)"
          }}
        >
          APPALTI RADAR
        </div>

        <div
          style={{
            fontSize: "26px",
            fontWeight: "800",
            lineHeight: "1.2",
            marginBottom: "18px",
            color: "#ffffff"
          }}
        >
          Accesso desktop richiesto
        </div>

        <div
          style={{
            fontSize: "15px",
            lineHeight: "1.7",
            color: "rgba(255,255,255,0.72)"
          }}
        >
          Il dossier completo della gara e disponibile solo da PC o monitor desktop.
        </div>
      </div>
    </main>
  );
}


export default function Page() {
  const [deviceReady, setDeviceReady] = useState(false);
  const [mobileBlocked, setMobileBlocked] = useState(false);
  const [activeSide, setActiveSide] = useState("PANORAMICA");
  const [hoverSide, setHoverSide] = useState(null);

  const [g, setG] = useState(null);

useEffect(() => {
  async function loadGara() {

    const cig = "A01E5DB19F";

    const { data, error } = await supabase
      .from("gare")
      .select("*")
      .eq("cig", cig)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    const gara = buildGaraViewModel(data);

    setG(gara);
  }

  loadGara();
}, []);

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
    <main style={{
      width: "100vw",
      height: "100vh",
      background: "#000",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Arial, sans-serif",
      padding: "30px",
      boxSizing: "border-box"
    }}>
      <div style={{ textAlign: "center", maxWidth: "360px" }}>
        <div style={{ fontSize: "18px", fontWeight: "700", marginBottom: "14px" }}>
          APPALTI RADAR
        </div>

        <div style={{ fontSize: "26px", fontWeight: "800", marginBottom: "18px" }}>
          Accesso desktop richiesto
        </div>

        <div style={{ fontSize: "15px", lineHeight: "1.6", opacity: 0.72 }}>
          Il dossier completo e disponibile solo da PC o monitor desktop.
        </div>
      </div>
    </main>
  );
}

if (!g) {
  return null;
}

  const histogram = g.mercato.distribuzione || [];
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

      <main style={s.page}>
      <div style={s.sidebar}>
        <div style={s.brandLogoWrapper}>
          <img
            src="/appalti-gara-logo.png"
            alt="Appalti Radar"
            style={s.brandLogo}
          />
        </div>

        <div style={s.sideMenu}>
          {menuItems.map((item) => (
            <div
              key={item}
              style={activeSide === item ? s.sideItemActive : s.sideItem}
              onMouseEnter={() => setHoverSide(item)}
              onMouseLeave={() => setHoverSide(null)}
              onClick={() => {
  setActiveSide(item);
  scrollToSection(item);
}}
            >
              <span>{item}</span>

              {activeSide === item && <div style={s.sideMarker} />}
            </div>
          ))}
        </div>

        <div style={s.sideStatus}>
          <div style={s.statusLine}>Dossier aggiornato</div>
          <div style={s.statusDate}>Fonte dati: ANAC + BDNCP</div>
        </div>
      </div>

      <div style={s.main}>
        <div style={s.header}>
          <div style={s.headerLeft}>
            <div style={s.title}>IMPRESIT LAVORI SPA</div>
            <div style={s.sub}>Dossier intelligence gara · dati da alert operativo</div>
          </div>

          <div style={s.headerRight}>
            <a href={anacLink(g.cig)} target="_blank" className="soft-button" style={s.topButton}>
              APRI ANAC
            </a>
            <div style={s.live}>
  <div style={s.liveDot}></div>
  LIVE
</div>
          </div>
        </div>

        <div style={s.grid}>
          <div
  id="PANORAMICA"
  className={activeSide === "PANORAMICA" ? "panel-hover active-section-pulse" : "panel-hover"}
  style={{
    ...s.hero,
    ...(isActiveSection("PANORAMICA") && {
      border: "1px solid rgba(196,181,253,0.62)",
      boxShadow:
        "0 0 0 1px rgba(226,232,240,0.13), 0 0 30px rgba(196,181,253,0.30), 0 0 24px rgba(139,92,246,0.28), inset 0 0 18px rgba(255,255,255,0.04)"
    })
  }}
>
            <div style={s.heroLeft}>
              <div style={s.priority}>
  <div style={s.priorityDot}></div>
  PRIORITA {g.priorita} · SCORE {g.score}/100
</div>

              <h1 style={s.h1}>{g.titolo}</h1>
              <div style={s.headline}>{g.sottotitolo}</div>

              <div style={s.infoGrid}>
                <div style={s.infoCell}>
                  <span style={s.infoLabel}>CIG</span>
                  <a href={anacLink(g.cig)} target="_blank" className="data-link" style={s.infoValueLink}>{g.cig}</a>
                </div>

                <div style={s.infoCell}><span style={s.infoLabel}>Regione</span><b style={s.infoValue}>{g.regione}</b></div>
                <div style={s.infoCell}><span style={s.infoLabel}>Categoria</span><b style={s.infoValue}>{g.categoria}</b></div>
                <div style={s.infoCell}><span style={s.infoLabel}>Importo</span><b style={s.infoValue}>{g.importo}</b></div>
                <div style={s.infoCell}><span style={s.infoLabel}>Procedura</span><b style={s.infoValue}>{g.procedura}</b></div>
                <div style={s.infoCell}><span style={s.infoLabel}>Pubblicazione</span><b style={s.infoValue}>{g.pubblicazione}</b></div>
              </div>
            </div>

            <div style={s.heroRight}>
              <div style={s.gauge}>
                <div style={s.gaugeInner}>
                  <div style={s.score}>{g.score}</div>
                  <div style={s.scoreLabel}>FIT GARA</div>
                </div>
              </div>

              <div
  style={s.action}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow = "0 0 20px rgba(34,255,136,0.25)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0px)";
    e.currentTarget.style.boxShadow = "0 0 14px rgba(34,255,136,0.14), inset 0 0 12px rgba(34,255,136,0.06)";
  }}
>
  {g.decisione}
</div>
            </div>
          </div>

          <div style={s.exec} className="panel-hover">
            <div style={s.boxTitle}>MOTIVI DI RILEVANZA</div>
            <div style={s.motiviList}>
              {g.motivi.map((m, i) => (
                <div key={i} style={s.motivo}>
  <span style={s.check}>✓</span>
  <span
    style={{
      fontWeight: "800",
      color: "#ffffff"
    }}
  >
    {m.split(":")[0]}:
  </span>{" "}
  <span style={{ color: "rgba(255,255,255,0.7)" }}>
    {m.split(":")[1]}
  </span>
</div>
              ))}
            </div>
          </div>

          <div style={s.fitPanel} className="panel-hover">
            <div style={s.boxTitle}>FIT IMPRESIT</div>

            <div style={s.fitRow}>
              <div style={s.fitCircle}>{g.fit.score}%</div>

              <div style={s.fitTexts}>
                {g.fit.descrizione.map((x, i) => {
  const parts = x.split(":");

  return (
    <div key={i} style={s.fitText}>
      <span style={{ color: "#22ff88", marginRight: "6px" }}>✓</span>

      <span
        style={{
          fontWeight: "800",
          color: "#ffffff"
        }}
      >
        {parts[0]}:
      </span>{" "}

      <span style={{ color: "rgba(255,255,255,0.7)" }}>
        {parts[1]}
      </span>
    </div>
  );
})}
              </div>
            </div>
          </div>

          <div
  id="STORICO"
  className={activeSide === "STORICO" ? "panel-hover active-section-pulse" : "panel-hover"}
  style={{
    ...s.actionPanel,
    ...(isActiveSection("STORICO") && {
      border: "1px solid rgba(196,181,253,0.62)",
      boxShadow:
        "0 0 0 1px rgba(226,232,240,0.13), 0 0 30px rgba(196,181,253,0.30), 0 0 24px rgba(139,92,246,0.28), inset 0 0 18px rgba(255,255,255,0.04)"
    })
  }}
>
            <div style={s.boxTitle}>STORICO IMPRESIT</div>

            <div style={s.historyBox}>
  <div style={s.historyTop}>{g.storicoImpresit.label}</div>

  <div>
    CIG:{" "}
    <a href={anacLink(g.storicoImpresit.cig)} target="_blank" className="data-link" style={s.cleanLink}>
      {g.storicoImpresit.cig}
    </a>
  </div>

  <div>
    Importo:{" "}
    <span style={{ fontWeight: "800", color: "#ffffff" }}>
      {g.storicoImpresit.importo}
    </span>
  </div>

  <div>
    Ribasso:{" "}
    <span style={{ fontWeight: "800", color: "#22ff88" }}>
      {g.storicoImpresit.ribasso}
    </span>
  </div>

  <div>
    Categoria:{" "}
    <span style={{ fontWeight: "800" }}>
      {g.storicoImpresit.categoria}
    </span>
  </div>

  <div>
    Esito:{" "}
    <span
      style={{
        fontWeight: "800",
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

          <div style={s.summaryPanel} className="panel-hover">
  <div style={s.boxTitle}>LETTURA MERCATO</div>

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
    <span style={{ fontWeight: "800" }}>
      {g.mercato.campione} gare
    </span>
  </div>

  <div>
    Comparabili:{" "}
    <span style={{ fontWeight: "800" }}>
      {g.mercato.comparabili}
    </span>
  </div>

  <div>
    Affidabilita:{" "}
    <span style={{ fontWeight: "800" }}>
      {g.mercato.affidabilita}
    </span>
  </div>
</div>

          <div
  id="MERCATO"
  className={activeSide === "MERCATO" ? "panel-hover active-section-pulse" : "panel-hover"}
  style={{
    ...s.marketBig,
    ...(isActiveSection("MERCATO") && {
      border: "1px solid rgba(196,181,253,0.62)",
      boxShadow:
        "0 0 0 1px rgba(226,232,240,0.13), 0 0 30px rgba(196,181,253,0.30), 0 0 24px rgba(139,92,246,0.28), inset 0 0 18px rgba(255,255,255,0.04)"
    })
  }}
>
  <div style={s.marketHeader}>
    <div>
      <div style={s.marketTitle}>PRESSIONE RIBASSI</div>
      <div style={s.marketSubtitle}>
        Lettura storica dei ribassi su gare realmente comparabili
      </div>
    </div>

    <div style={s.marketBadge}>PRESSIONE MODERATA</div>
  </div>

  <div style={s.marketRow}>
    <div style={s.marketFacts}>
      <div style={s.marketKpi}>
        <span style={s.marketKpiValue}>{g.mercato.centro}</span>
        <span style={s.marketKpiLabel}>Centro mercato comparabile</span>
      </div>

      <div style={s.marketKpi}>
        <span style={s.marketKpiValue}>{g.mercato.fascia}</span>
        <span style={s.marketKpiLabel}>Fascia ordinaria ricorrente</span>
      </div>

      <div style={s.marketKpi}>
        <span style={s.marketKpiValue}>{g.mercato.competitivo}</span>
        <span style={s.marketKpiLabel}>Area competitiva spinta</span>
      </div>

      <div style={s.marketKpi}>
        <span style={s.marketKpiValue}>{g.mercato.aggressivo}</span>
        <span style={s.marketKpiLabel}>Soglia aggressiva</span>
      </div>

      <div style={s.marketReading}>
        Lettura: il mercato comparabile si concentra in area ordinaria; ribassi oltre la fascia competitiva indicano pressione elevata.
      </div>
    </div>

    <div>
      <div style={s.chart}>
        {histogram.map((h, i) => {
          let color = "#22ff88";

          if (i > histogram.length * 0.66) {
            color = "#ff4d5e";
          } else if (i > histogram.length * 0.33) {
            color = "#ffcc33";
          }

          return (
            <div
              key={i}
              style={{
                ...s.histBar,
                height: h + "%",
                background: color,
                opacity: 0.35 + h / 100
              }}
            />
          );
        })}
      </div>

      <div style={s.marketLegend}>
        Distribuzione storica · {g.mercato.campione} gare
      </div>
    </div>
  </div>

  <div style={s.rangeBar}>
    <div style={{ ...s.rangeSegment, background: "#22ff88", width: "25%" }} />
    <div style={{ ...s.rangeSegment, background: "#ffcc33", width: "35%" }} />
    <div style={{ ...s.rangeSegment, background: "#ff8a33", width: "22%" }} />
    <div style={{ ...s.rangeSegment, background: "#ff4d5e", width: "18%" }} />

    <div style={{ ...s.marker, left: g.mercato.posizione + "%" }} />
  </div>

  <div style={s.rangeLabels}>
    <span>Prudente</span>
    <span>Ordinaria</span>
    <span>Competitiva</span>
    <span>Aggressiva</span>
  </div>
</div>

          <div
  id="COMPETITOR"
  className={activeSide === "COMPETITOR" ? "panel-hover active-section-pulse" : "panel-hover"}
  style={{
    ...s.competitor,
    ...(isActiveSection("COMPETITOR") && {
      border: "1px solid rgba(196,181,253,0.62)",
      boxShadow:
        "0 0 0 1px rgba(226,232,240,0.13), 0 0 30px rgba(196,181,253,0.30), 0 0 24px rgba(139,92,246,0.28), inset 0 0 18px rgba(255,255,255,0.04)"
    })
  }}
>
            <div style={s.boxTitle}>PRESSIONE COMPETITIVA</div>

            <div style={s.compGrid}>
              {g.competitor.map((c, i) => (
                <div key={i} style={s.compCard}>
                  <div style={s.compName}>{c.nome}</div>

                  <div
  style={{
    ...s.compRisk,
    color:
      c.rischio === "ALTO"
        ? "#ff4d5e"
        : c.rischio === "MEDIO"
        ? "#facc15"
        : "#22ff88"
  }}
>
  Rischio: {c.rischio} · Gare vinte: {c.gareVinte}
</div>
                  <div style={s.compMedia}>
  Comportamento medio:{" "}
  <span
    style={{
      fontWeight: "800",
      color:
        parseFloat(c.mediaRibassi) > 30
          ? "#ff4d5e"
          : parseFloat(c.mediaRibassi) > 15
          ? "#ffcc33"
          : "#22ff88"
    }}
  >
    {c.mediaRibassi}
  </span>
</div>

                  {c.segnale && (
  <div
    style={{
      ...s.warning,
      display: "inline-block",
      padding: "3px 6px",
      borderRadius: "6px",
      border: "1px solid rgba(255,77,94,0.4)",
      background: "rgba(255,77,94,0.08)"
    }}
  >
    {c.segnale}
  </div>
)}

                  <div style={s.miniTitle}>CIG usati</div>

                  {c.cig.map((x) => (
                    <div key={x.id} style={s.cigLine}>
  <a href={anacLink(x.id)} target="_blank" className="data-link" style={s.cleanLink}>
    {x.id}
  </a>

  <span
    style={{
      fontWeight: "800",
      color:
        x.ribasso === "N/D"
          ? "rgba(255,255,255,0.35)"
          : "#ffffff"
    }}
  >
    {x.ribasso}
  </span>
</div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div
  id="DOCUMENTI"
  className={activeSide === "DOCUMENTI" ? "panel-hover active-section-pulse" : "panel-hover"}
  style={{
    ...s.decision,
    ...(isActiveSection("DOCUMENTI") && {
      border: "1px solid rgba(196,181,253,0.62)",
      boxShadow:
        "0 0 0 1px rgba(226,232,240,0.13), 0 0 30px rgba(196,181,253,0.30), 0 0 24px rgba(139,92,246,0.28), inset 0 0 18px rgba(255,255,255,0.04)"
    })
  }}
>
            <div style={s.boxTitle}>LETTURA FINALE</div>
            <div style={s.finalBig}>{g.finale}</div>

            <div style={s.docBox}>
              <div style={s.boxTitle}>RISORSE</div>

              {g.documenti.map((d, i) => {
                const url = getDocUrl({
  ...d,
  cig: g.cig
});
                const label = d.nome === "Apri scheda ANAC" ? "Apri ANAC" : d.nome;
                const isJson = label === "JSON gara";

                if (url) {
                  return (
                    <a
                      key={i}
                      href={url}
                      target="_blank"
                      className="soft-button"
                      style={s.docButton}
                      download={isJson ? "gara_" + g.cig + ".json" : undefined}
                    >
                      <span>{label}</span>
                      <span style={s.docIcon}>
                        {label === "JSON gara" ? "{ }" : label === "Report analisi" ? "PDF" : "↗"}
                      </span>
                    </a>
                  );
                }

                return (
                  <div
                    key={i}
                    style={{
                      ...s.docButton,
                      opacity: 0.45,
                      cursor: "not-allowed"
                    }}
                  >
                    <span>{label}</span>
                    <span style={s.docIcon}>...</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={s.footer}>
  Analisi automatizzata basata su dati ANAC e storico gare. Output a supporto decisionale, non vincolante.
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
    minHeight: "100vh",
    background: "radial-gradient(circle at top, rgba(24,32,48,0.95) 0%, #000000 58%)",
    color: "#ffffff",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "28px",
    boxSizing: "border-box",
    overflow: "hidden"
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    border: "1px solid rgba(196,181,253,0.22)",
    borderRadius: "22px",
    background: "linear-gradient(180deg, rgba(10,14,22,0.94), rgba(0,0,0,0.98))",
    boxShadow: "0 18px 50px rgba(0,0,0,0.55), 0 0 30px rgba(139,92,246,0.14)",
    padding: "30px 24px",
    boxSizing: "border-box",
    textAlign: "center"
  },

  logo: {
    width: "92px",
    height: "92px",
    objectFit: "contain",
    display: "block",
    margin: "0 auto 18px auto"
  },

  kicker: {
    color: "rgba(196,181,253,0.92)",
    fontSize: "11px",
    fontWeight: "900",
    letterSpacing: "2px",
    marginBottom: "10px"
  },

  title: {
    margin: "0 0 16px 0",
    color: "#ffffff",
    fontSize: "24px",
    lineHeight: "1.15",
    fontWeight: "900",
    letterSpacing: "-0.3px"
  },

  text: {
    margin: "0 auto 14px auto",
    color: "rgba(255,255,255,0.72)",
    fontSize: "15px",
    lineHeight: "1.55",
    fontWeight: "500"
  },

  textStrong: {
    margin: "0 auto 20px auto",
    color: "#ffffff",
    fontSize: "15px",
    lineHeight: "1.55",
    fontWeight: "800"
  },

  note: {
    borderTop: "1px solid rgba(255,255,255,0.08)",
    paddingTop: "16px",
    color: "rgba(255,255,255,0.52)",
    fontSize: "12px",
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
  fontSize: "10.4px",
  fontWeight: "750",
  lineHeight: "1.25",
  color: "rgba(255,255,255,0.72)",
  marginTop: "4px",
  marginBottom: "10px",
  background: "transparent"
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
  marginTop: "22px",
  background: "rgba(255,255,255,0.10)",
  boxShadow: "0 0 14px rgba(255,255,255,0.13), 0 0 18px rgba(139,92,246,0.10)",
  overflow: "visible"
},

rangeSegment: {
  height: "100%"
},

marker: {
  position: "absolute",
  top: "-10px",
  width: "2px",
  height: "28px",
  background: "#ffffff",
  boxShadow:
    "0 0 10px rgba(255,255,255,0.82), 0 0 14px rgba(196,181,253,0.42)"
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
  minHeight: "226px",
  padding: "12px",
  border: "1px solid rgba(255,255,255,0.085)",
  borderRadius: "12px",
  background: "linear-gradient(180deg, rgba(3,9,18,0.92), rgba(0,0,0,0.98))",
  overflow: "hidden",
  boxShadow: "inset 0 0 16px rgba(139,92,246,0.025)",
  transition: "all 0.25s ease",
  scrollMarginTop: "22px"
},

compGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "8px",
  marginTop: "8px",
  background: "transparent"
},

compCard: {
  background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.25))",
  padding: "9px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.06)",
  minHeight: "192px",
  overflow: "hidden",

  boxShadow: "0 0 10px rgba(0,0,0,0.35)",
},

compName: {
  fontWeight: "900",
  marginBottom: "5px",
  color: "rgba(255,255,255,0.96)",
  fontSize: "12.2px",
  letterSpacing: "0.25px",
  background: "transparent"
},

compRisk: {
  fontSize: "10px",
  fontWeight: "850",
  marginBottom: "3px",
  color: "#facc15",
  lineHeight: "1.22",
  letterSpacing: "0.1px",
  background: "transparent"
},

compMedia: {
  fontSize: "10.2px",
  fontWeight: "650",
  color: "rgba(255,255,255,0.70)",
  lineHeight: "1.22",
  letterSpacing: "0.1px",
  background: "transparent"
},

warning: {
  color: "#ff6b72",
  fontSize: "9.8px",
  fontWeight: "850",
  marginTop: "4px",
  letterSpacing: "0.1px",
  background: "transparent"
},

miniTitle: {
  color: "rgba(255,255,255,0.46)",
  fontSize: "8.6px",
  fontWeight: "850",
  marginTop: "7px",
  marginBottom: "4px",
  letterSpacing: "0.45px",
  textTransform: "uppercase",
  background: "transparent"
},

cigLine: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "10px",
  fontSize: "10px",
  lineHeight: "1.30",
  borderBottom: "1px solid rgba(255,255,255,0.04)",
  paddingBottom: "2px",
  marginBottom: "2px",
  color: "rgba(255,255,255,0.74)",
  background: "transparent",
  fontVariantNumeric: "tabular-nums"
},

decision: {
  gridColumn: "span 4",
  minHeight: "210px",
  padding: "12px 14px",

  border: "1px solid rgba(34,255,136,0.24)",
  borderRadius: "12px",

  background: "linear-gradient(180deg, rgba(4,14,10,0.92), rgba(0,0,0,0.98))",

  overflow: "hidden",

  boxShadow: "0 0 15px rgba(34,255,136,0.09), inset 0 0 12px rgba(34,255,136,0.045)",

  transition: "all 0.25s ease",
  cursor: "default",
  scrollMarginTop: "22px"
},

docBox: {
  marginTop: "8px",
  background: "transparent"
},

docButton: {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  width: "100%",

  background: "rgba(139,92,246,0.08)",
  color: "#e9d5ff",

  border: "1px solid rgba(196,181,253,0.24)",
  borderRadius: "7px",

  padding: "6px 8px",
  marginTop: "5px",

  fontSize: "10.5px",
  fontWeight: "800",

  textAlign: "left",
  textDecoration: "none",

  boxShadow: "0 0 6px rgba(139,92,246,0.08)",

  cursor: "pointer",
  transition: "all 0.22s ease"
},

docIcon: {
  opacity: 0.62,
  fontSize: "9.5px",
  marginLeft: "10px"
},

boxTitle: {
  fontWeight: "900",
  marginBottom: "9px",
  fontSize: "10.2px",
  color: "rgba(255,255,255,0.88)",
  letterSpacing: "0.68px",
  background: "transparent",
  textShadow: "none",
  textTransform: "uppercase"
},

motivo: {
  marginBottom: "5px",
  fontSize: "11.4px",
  color: "rgba(255,255,255,0.80)",
  lineHeight: "1.24",
  background: "transparent"
},

  finalBig: {
  color: "#22ff88",
  fontWeight: "850",
  fontSize: "14.5px",
  lineHeight: "1.28",
  letterSpacing: "0.1px",
  background: "transparent",
  textShadow: "0 0 6px rgba(34,255,136,0.14)"
},

footer: {
  gridColumn: "span 12",
  minHeight: "26px",
  padding: "8px 12px 0 12px",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  textAlign: "center",

  color: "rgba(255,255,255,0.76)",
  fontSize: "9.5px",
  lineHeight: "1",
  letterSpacing: "0.2px",

  borderTop: "1px solid rgba(255,255,255,0.07)",
  background: "#000000"
},
};