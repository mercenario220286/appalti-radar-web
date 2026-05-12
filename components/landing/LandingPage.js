export default function LandingPage() {
  return (
    <main className="ar-page">
      <header className="ar-nav">
        <a className="ar-brand" href="/">
          <div className="ar-logo-slot">
            <span>AR</span>
          </div>
          <div>
            <strong>APPALTI RADAR</strong>
            <small>Procurement Intelligence</small>
          </div>
        </a>

        <nav className="ar-menu">
          <a href="#prodotto">Prodotto</a>
          <a href="#funziona">Funzionalita</a>
          <a href="#dossier">Dossier</a>
          <a href="#aziende">Aziende</a>
          <a href="#contatti">Contatti</a>
        </nav>

        <a className="ar-nav-cta" href="#contatti">
          Richiedi accesso
        </a>
      </header>

      <section className="ar-hero">
        <div className="ar-hero-glow ar-hero-glow-one" />
        <div className="ar-hero-glow ar-hero-glow-two" />

        <div className="ar-hero-content">
          <p className="ar-kicker">PROCUREMENT INTELLIGENCE</p>

          <h1>
            Trasformiamo i dati pubblici in{" "}
            <span>opportunita concrete.</span>
          </h1>

          <p className="ar-lead">
            Appalti Radar monitora le nuove opportunita pubbliche, le analizza
            in profondita e porta all'ufficio gare solo le occasioni realmente
            coerenti con il profilo aziendale.
          </p>

          <div className="ar-hero-actions">
            <a className="ar-btn ar-btn-primary" href="#contatti">
              Richiedi accesso
            </a>
            <a className="ar-btn ar-btn-secondary" href="#dossier">
              Guarda il dossier
            </a>
          </div>

          <div className="ar-trust-row">
            <div>
              <strong>Radar live</strong>
              <span>Nuove gare rilevanti</span>
            </div>
            <div>
              <strong>Score operativo</strong>
              <span>Priorita e fit aziendale</span>
            </div>
            <div>
              <strong>Dossier dinamico</strong>
              <span>Analisi pronta per decidere</span>
            </div>
          </div>
        </div>

        <div className="ar-hero-visual">
          <div className="ar-dashboard-shell">
            <div className="ar-window-bar">
              <span />
              <span />
              <span />
              <strong>APPALTI RADAR</strong>
            </div>

            <div className="ar-dashboard-grid">
              <aside className="ar-side-menu">
                <span />
                <span />
                <span />
                <span />
              </aside>

              <div className="ar-map-panel">
                <div className="ar-panel-title">
                  <small>Panoramica</small>
                  <strong>Copertura nazionale</strong>
                </div>

                <div className="ar-italy-placeholder">
                  <div className="ar-map-pulse ar-map-pulse-one" />
                  <div className="ar-map-pulse ar-map-pulse-two" />
                  <div className="ar-map-pulse ar-map-pulse-three" />
                  <span>ITALIA</span>
                </div>

                <div className="ar-mini-chart">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>

              <div className="ar-opportunity-panel">
                <div className="ar-panel-title">
                  <small>Ultime opportunita</small>
                  <strong>Shortlist operativa</strong>
                </div>

                <div className="ar-mini-alert">
                  <b>Nuova opportunita rilevata</b>
                  <span>Fit alto - lavori pubblici</span>
                </div>
                <div className="ar-mini-alert">
                  <b>Dossier pronto</b>
                  <span>Analisi, score e priorita</span>
                </div>
                <div className="ar-mini-alert">
                  <b>Report esportabile</b>
                  <span>PDF condivisibile</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="prodotto" className="ar-section ar-benefits">
        <div className="ar-section-head ar-center">
          <p className="ar-kicker">UN SISTEMA. TUTTO IL VANTAGGIO.</p>
          <h2>Dal rumore del mercato alla decisione operativa.</h2>
        </div>

        <div className="ar-benefit-grid">
          <article>
            <div className="ar-icon">◎</div>
            <h3>Monitoraggio continuo</h3>
            <p>
              Intercetta nuove opportunita pubbliche e le porta in un flusso
              ordinato, leggibile e pronto per la valutazione.
            </p>
          </article>

          <article>
            <div className="ar-icon">◍</div>
            <h3>Profilo aziendale intelligente</h3>
            <p>
              Legge categorie, territori, importi, pattern storici e coerenza
              operativa rispetto al profilo dell'azienda.
            </p>
          </article>

          <article>
            <div className="ar-icon">✦</div>
            <h3>Scoring proprietario</h3>
            <p>
              Ogni gara viene classificata con priorita, motivazioni e livello
              di compatibilita commerciale.
            </p>
          </article>

          <article>
            <div className="ar-icon">▣</div>
            <h3>Dossier dinamici</h3>
            <p>
              Ogni opportunita rilevante diventa una scheda operativa chiara,
              consultabile e condivisibile.
            </p>
          </article>

          <article>
            <div className="ar-icon">➤</div>
            <h3>Alert immediati</h3>
            <p>
              Le gare piu interessanti arrivano al team con sintesi, priorita e
              collegamento al dossier completo.
            </p>
          </article>
        </div>
      </section>

      <section id="funziona" className="ar-section ar-flow-section">
        <div className="ar-flow-copy">
          <p className="ar-kicker">COME FUNZIONA</p>
          <h2>Dalla pubblicazione all'opportunita, in pochi passaggi.</h2>
          <p>
            Il sistema lavora come un livello di intelligence sopra il mercato
            pubblico: filtra, ordina, valuta e trasforma i dati in segnali
            utili per l'ufficio gare.
          </p>
        </div>

        <div className="ar-flow">
          <div>
            <span>01</span>
            <strong>Pubblicazione</strong>
          </div>
          <i />
          <div>
            <span>02</span>
            <strong>Raccolta</strong>
          </div>
          <i />
          <div>
            <span>03</span>
            <strong>Analisi</strong>
          </div>
          <i />
          <div>
            <span>04</span>
            <strong>Score</strong>
          </div>
          <i />
          <div>
            <span>05</span>
            <strong>Dossier</strong>
          </div>
          <i />
          <div>
            <span>06</span>
            <strong>Alert</strong>
          </div>
        </div>

        <div className="ar-phone-wrap">
          <div className="ar-phone">
            <div className="ar-phone-top" />
            <div className="ar-phone-screen">
              <small>Appalti Radar</small>
              <div className="ar-message-card">
                <b>Nuova opportunita rilevata</b>
                <p>
                  Gara compatibile con il profilo aziendale. Score alto,
                  importo coerente, dossier pronto.
                </p>
                <button>Apri dossier completo</button>
              </div>
              <div className="ar-message-line" />
              <div className="ar-message-line short" />
            </div>
          </div>
        </div>
      </section>

      <section id="dossier" className="ar-section ar-dossier">
        <div className="ar-dossier-copy">
          <p className="ar-kicker">DOSSIER OPERATIVO</p>
          <h2>Tutto cio che serve, gia organizzato.</h2>
          <p>
            La landing deve vendere il prodotto senza scoprire il motore. Qui
            mostriamo il risultato: un dossier chiaro, serio e utile per chi
            deve decidere se guardare una gara, approfondirla o scartarla.
          </p>

          <ul>
            <li>Dati principali e dettagli tecnici</li>
            <li>Score di compatibilita e priorita</li>
            <li>Motivi del match con il profilo aziendale</li>
            <li>Contesto competitivo e storico utile</li>
            <li>Report PDF condivisibile</li>
          </ul>
        </div>

        <div className="ar-dossier-visual">
          <div className="ar-card-mock ar-card-main">
            <small>Dossier Gara</small>
            <h3>Opportunita pubblica</h3>
            <div className="ar-data-row">
              <span>Score</span>
              <strong>Alto</strong>
            </div>
            <div className="ar-data-row">
              <span>Priorita</span>
              <strong>Operativa</strong>
            </div>
            <div className="ar-data-row">
              <span>Output</span>
              <strong>Dossier + PDF</strong>
            </div>
            <div className="ar-ring">
              <span>FIT</span>
            </div>
          </div>

          <div className="ar-card-mock ar-card-pdf">
            <small>APPALTI RADAR</small>
            <h3>Report PDF</h3>
            <p>Snapshot condivisibile per il team.</p>
            <button>Scarica PDF</button>
          </div>
        </div>
      </section>

      <section className="ar-section ar-showcase">
        <div className="ar-section-head">
          <p className="ar-kicker">IMMAGINI PRODOTTO</p>
          <h2>Spazi pronti per screenshot reali.</h2>
          <p>
            Qui inserirai dashboard, alert Telegram, dossier mobile e report
            ufficiali. Gli slot sono gia calibrati per non rompere il layout.
          </p>
        </div>

        <div className="ar-showcase-grid">
          <div className="ar-image-slot ar-image-large">
            <div>
              <strong>Dashboard desktop</strong>
              <span>Inserisci: /dashboard.png</span>
            </div>
          </div>

          <div className="ar-image-slot">
            <div>
              <strong>Alert Telegram</strong>
              <span>Inserisci: /telegram.png</span>
            </div>
          </div>

          <div className="ar-image-slot">
            <div>
              <strong>Dossier mobile</strong>
              <span>Inserisci: /mobile-dossier.png</span>
            </div>
          </div>

          <div className="ar-image-slot ar-image-wide">
            <div>
              <strong>Report PDF</strong>
              <span>Inserisci: /pdf-report.png</span>
            </div>
          </div>
        </div>
      </section>

      <section id="aziende" className="ar-section ar-why">
        <div>
          <p className="ar-kicker">PERCHE APPALTI RADAR</p>
          <h2>Piu opportunita. Meno tempo perso.</h2>
          <p>
            L'obiettivo non e sostituire l'ufficio gare. E dargli una macchina
            di lettura piu veloce, ordinata e selettiva, capace di evidenziare
            cio che merita attenzione.
          </p>

          <div className="ar-metrics">
            <div>
              <strong>Radar</strong>
              <span>Monitoraggio continuo</span>
            </div>
            <div>
              <strong>Priorita</strong>
              <span>Focus sulle gare rilevanti</span>
            </div>
            <div>
              <strong>Dossier</strong>
              <span>Analisi pronta da leggere</span>
            </div>
            <div>
              <strong>Team</strong>
              <span>Condivisione immediata</span>
            </div>
          </div>
        </div>

        <div className="ar-cta-card">
          <div className="ar-city-glow" />
          <p className="ar-kicker">ACCESSO RISERVATO</p>
          <h2>Sei un'azienda?</h2>
          <p>
            Richiedi una valutazione preliminare e scopri se Appalti Radar puo
            essere configurato sul tuo profilo operativo.
          </p>
          <a className="ar-btn ar-btn-primary" href="#contatti">
            Richiedi accesso
          </a>
        </div>
      </section>

      <footer id="contatti" className="ar-footer">
        <div className="ar-footer-brand">
          <div className="ar-logo-slot small">
            <span>AR</span>
          </div>
          <div>
            <strong>APPALTI RADAR</strong>
            <p>Procurement Intelligence per lavori pubblici.</p>
          </div>
        </div>

        <div className="ar-footer-cols">
          <div>
            <strong>Prodotto</strong>
            <a href="#prodotto">Funzionalita</a>
            <a href="#dossier">Dossier</a>
            <a href="#funziona">Workflow</a>
          </div>

          <div>
            <strong>Azienda</strong>
            <a href="#aziende">Per imprese</a>
            <a href="#contatti">Accesso</a>
            <a href="#contatti">Contatti</a>
          </div>

          <div>
            <strong>Contatti</strong>
            <a href="mailto:info@appaltiradar.it">info@appaltiradar.it</a>
            <a href="#contatti">Richiedi demo</a>
            <a href="#contatti">Accesso riservato</a>
          </div>
        </div>
      </footer>

      <style>{`
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        html,
body {
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  min-height: 100% !important;
  height: auto !important;
  overflow-x: hidden !important;
  overflow-y: auto !important;
  background: #000 !important;
  color: #f6f7ff;
  -webkit-overflow-scrolling: touch;
}

body {
  position: static !important;
  touch-action: auto !important;
}

        .ar-page {
  width: 100%;
  min-height: 100vh;
  height: auto;
  overflow-x: hidden;
  overflow-y: visible;
          background:
            radial-gradient(circle at 50% 0%, rgba(103, 69, 255, 0.11), transparent 34rem),
            radial-gradient(circle at 90% 15%, rgba(0, 116, 255, 0.14), transparent 30rem),
            linear-gradient(180deg, #000 0%, #02030a 42%, #000 100%);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .ar-nav {
          width: min(1180px, calc(100% - 36px));
          height: 82px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          position: sticky;
          top: 0;
          z-index: 20;
          backdrop-filter: blur(18px);
          background: rgba(0, 0, 0, 0.58);
        }

        .ar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #fff;
          text-decoration: none;
          min-width: 190px;
        }

        .ar-logo-slot {
          width: 52px;
          height: 52px;
          border-radius: 17px;
          display: grid;
          place-items: center;
          background:
            linear-gradient(145deg, rgba(118, 82, 255, 0.42), rgba(0, 117, 255, 0.14)),
            rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(143, 121, 255, 0.38);
          box-shadow: 0 0 34px rgba(103, 69, 255, 0.28);
        }

        .ar-logo-slot span {
          font-weight: 900;
          letter-spacing: -0.08em;
          font-size: 18px;
          color: #fff;
        }

        .ar-logo-slot.small {
          width: 44px;
          height: 44px;
          border-radius: 14px;
        }

        .ar-brand strong {
          display: block;
          font-size: 12px;
          letter-spacing: 0.12em;
        }

        .ar-brand small {
          display: block;
          margin-top: 3px;
          color: rgba(255, 255, 255, 0.52);
          font-size: 11px;
        }

        .ar-menu {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .ar-menu a,
        .ar-footer a {
          color: rgba(255, 255, 255, 0.64);
          text-decoration: none;
          font-size: 13px;
          transition: 0.2s ease;
        }

        .ar-menu a:hover,
        .ar-footer a:hover {
          color: #fff;
        }

        .ar-nav-cta,
        .ar-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          padding: 0 20px;
          border-radius: 14px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: -0.01em;
          transition: 0.2s ease;
          white-space: nowrap;
        }

        .ar-nav-cta,
        .ar-btn-primary {
          color: #fff;
          background: linear-gradient(135deg, #5f42ff, #8a5cff);
          box-shadow: 0 0 34px rgba(103, 69, 255, 0.42);
        }

        .ar-btn-secondary {
          color: #fff;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.14);
        }

        .ar-nav-cta:hover,
        .ar-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.08);
        }

        .ar-hero {
          width: min(1180px, calc(100% - 36px));
          margin: 0 auto;
          min-height: calc(100vh - 82px);
          display: grid;
          grid-template-columns: 0.92fr 1.08fr;
          gap: 52px;
          align-items: center;
          position: relative;
          padding: 64px 0 70px;
        }

        .ar-hero-glow {
          position: absolute;
          pointer-events: none;
          filter: blur(10px);
          opacity: 0.8;
        }

        .ar-hero-glow-one {
          width: 420px;
          height: 420px;
          left: -170px;
          bottom: 10%;
          background: radial-gradient(circle, rgba(93, 64, 255, 0.22), transparent 68%);
        }

        .ar-hero-glow-two {
          width: 520px;
          height: 520px;
          right: -150px;
          top: 8%;
          background: radial-gradient(circle, rgba(20, 115, 255, 0.16), transparent 70%);
        }

        .ar-kicker {
          margin: 0 0 14px;
          color: #8a7dff;
          font-size: 12px;
          line-height: 1;
          font-weight: 900;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .ar-hero h1 {
          margin: 0;
          max-width: 630px;
          font-size: clamp(46px, 6vw, 86px);
          line-height: 0.93;
          letter-spacing: -0.07em;
        }

        .ar-hero h1 span {
          color: #7b63ff;
          text-shadow: 0 0 44px rgba(123, 99, 255, 0.35);
        }

        .ar-lead {
          margin: 26px 0 0;
          max-width: 560px;
          color: rgba(255, 255, 255, 0.68);
          font-size: 18px;
          line-height: 1.65;
          letter-spacing: -0.02em;
        }

        .ar-hero-actions {
          margin-top: 34px;
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .ar-trust-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 38px;
          max-width: 620px;
        }

        .ar-trust-row div {
          padding: 15px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.035);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .ar-trust-row strong {
          display: block;
          font-size: 13px;
          color: #fff;
        }

        .ar-trust-row span {
          display: block;
          margin-top: 5px;
          font-size: 12px;
          line-height: 1.35;
          color: rgba(255, 255, 255, 0.5);
        }

        .ar-hero-visual {
          position: relative;
          z-index: 2;
        }

        .ar-dashboard-shell {
          min-height: 520px;
          border-radius: 32px;
          padding: 16px;
          background:
            linear-gradient(145deg, rgba(255,255,255,0.13), rgba(255,255,255,0.03)),
            rgba(10, 12, 24, 0.72);
          border: 1px solid rgba(255, 255, 255, 0.16);
          box-shadow:
            0 40px 120px rgba(0, 0, 0, 0.8),
            0 0 80px rgba(91, 65, 255, 0.18);
        }

        .ar-window-bar {
          height: 42px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 10px 12px;
          color: rgba(255, 255, 255, 0.68);
        }

        .ar-window-bar span {
          width: 9px;
          height: 9px;
          border-radius: 99px;
          background: rgba(255, 255, 255, 0.22);
        }

        .ar-window-bar strong {
          margin-left: 10px;
          font-size: 11px;
          letter-spacing: 0.14em;
        }

        .ar-dashboard-grid {
          min-height: 450px;
          display: grid;
          grid-template-columns: 58px 1fr 230px;
          gap: 14px;
        }

        .ar-side-menu,
        .ar-map-panel,
        .ar-opportunity-panel,
        .ar-phone-screen,
        .ar-card-mock,
        .ar-cta-card,
        .ar-image-slot {
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.025)),
            rgba(5, 7, 17, 0.88);
          border: 1px solid rgba(255, 255, 255, 0.09);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        .ar-side-menu {
          border-radius: 22px;
          padding: 18px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .ar-side-menu span {
          width: 22px;
          height: 22px;
          border-radius: 8px;
          border: 1px solid rgba(138, 92, 255, 0.45);
          background: rgba(138, 92, 255, 0.12);
        }

        .ar-map-panel,
        .ar-opportunity-panel {
          border-radius: 24px;
          padding: 18px;
          overflow: hidden;
        }

        .ar-panel-title small {
          display: block;
          color: rgba(255, 255, 255, 0.46);
          font-size: 11px;
          margin-bottom: 4px;
        }

        .ar-panel-title strong {
          display: block;
          font-size: 18px;
          letter-spacing: -0.04em;
        }

        .ar-italy-placeholder {
          height: 270px;
          margin: 18px 0;
          border-radius: 24px;
          position: relative;
          display: grid;
          place-items: center;
          overflow: hidden;
          background:
            radial-gradient(circle at 50% 45%, rgba(114, 85, 255, 0.38), transparent 28%),
            radial-gradient(circle at 48% 52%, rgba(0, 119, 255, 0.22), transparent 42%),
            rgba(255, 255, 255, 0.025);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .ar-italy-placeholder:before {
          content: "";
          width: 130px;
          height: 210px;
          border-radius: 48% 36% 54% 44%;
          border: 1px solid rgba(166, 151, 255, 0.6);
          background:
            linear-gradient(140deg, rgba(118, 82, 255, 0.28), rgba(0, 117, 255, 0.04));
          transform: rotate(18deg);
          filter: drop-shadow(0 0 26px rgba(123, 99, 255, 0.35));
        }

        .ar-italy-placeholder span {
          position: absolute;
          bottom: 20px;
          color: rgba(255, 255, 255, 0.48);
          font-size: 11px;
          letter-spacing: 0.22em;
        }

        .ar-map-pulse {
          position: absolute;
          width: 7px;
          height: 7px;
          border-radius: 99px;
          background: #8a7dff;
          box-shadow: 0 0 24px #8a7dff;
        }

        .ar-map-pulse-one {
          top: 34%;
          left: 44%;
        }

        .ar-map-pulse-two {
          top: 52%;
          left: 53%;
        }

        .ar-map-pulse-three {
          top: 63%;
          left: 48%;
        }

        .ar-mini-chart {
          height: 68px;
          display: flex;
          align-items: end;
          gap: 8px;
          padding: 10px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.025);
        }

        .ar-mini-chart i {
          flex: 1;
          border-radius: 99px 99px 0 0;
          background: linear-gradient(180deg, #755dff, rgba(117, 93, 255, 0.12));
        }

        .ar-mini-chart i:nth-child(1) { height: 22%; }
        .ar-mini-chart i:nth-child(2) { height: 44%; }
        .ar-mini-chart i:nth-child(3) { height: 36%; }
        .ar-mini-chart i:nth-child(4) { height: 68%; }
        .ar-mini-chart i:nth-child(5) { height: 46%; }
        .ar-mini-chart i:nth-child(6) { height: 76%; }
        .ar-mini-chart i:nth-child(7) { height: 58%; }

        .ar-mini-alert {
          margin-top: 14px;
          padding: 14px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.07);
        }

        .ar-mini-alert b {
          display: block;
          font-size: 12px;
          color: #fff;
        }

        .ar-mini-alert span {
          display: block;
          margin-top: 5px;
          color: rgba(255, 255, 255, 0.48);
          font-size: 11px;
          line-height: 1.4;
        }

        .ar-section {
          width: min(1180px, calc(100% - 36px));
          margin: 0 auto;
          padding: 86px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .ar-section-head {
          max-width: 690px;
          margin-bottom: 34px;
        }

        .ar-center {
          text-align: center;
          margin-left: auto;
          margin-right: auto;
        }

        .ar-section h2,
        .ar-flow-copy h2,
        .ar-dossier-copy h2,
        .ar-why h2,
        .ar-cta-card h2 {
          margin: 0;
          font-size: clamp(31px, 4vw, 52px);
          line-height: 1.02;
          letter-spacing: -0.055em;
        }

        .ar-section-head p,
        .ar-flow-copy p,
        .ar-dossier-copy p,
        .ar-why p,
        .ar-cta-card p {
          color: rgba(255, 255, 255, 0.62);
          line-height: 1.65;
          font-size: 16px;
        }

        .ar-benefit-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
        }

        .ar-benefit-grid article {
          min-height: 230px;
          padding: 24px;
          border-radius: 26px;
          background:
            radial-gradient(circle at 50% 0%, rgba(111, 83, 255, 0.16), transparent 60%),
            rgba(255, 255, 255, 0.035);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .ar-icon {
          width: 52px;
          height: 52px;
          border-radius: 18px;
          display: grid;
          place-items: center;
          margin-bottom: 22px;
          color: #9f8fff;
          font-size: 26px;
          background: rgba(112, 82, 255, 0.12);
          border: 1px solid rgba(138, 92, 255, 0.28);
          box-shadow: 0 0 34px rgba(112, 82, 255, 0.18);
        }

        .ar-benefit-grid h3 {
          margin: 0 0 10px;
          font-size: 17px;
          letter-spacing: -0.03em;
        }

        .ar-benefit-grid p {
          margin: 0;
          color: rgba(255, 255, 255, 0.55);
          line-height: 1.55;
          font-size: 13px;
        }

        .ar-flow-section {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 46px;
          align-items: center;
        }

        .ar-flow {
          grid-column: 1 / 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 24px;
          border-radius: 30px;
          background: rgba(255, 255, 255, 0.028);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .ar-flow div {
          text-align: center;
          flex: 1;
        }

        .ar-flow span {
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          margin: 0 auto 12px;
          border-radius: 18px;
          color: #9f8fff;
          font-size: 12px;
          font-weight: 900;
          background: rgba(112, 82, 255, 0.13);
          border: 1px solid rgba(138, 92, 255, 0.26);
        }

        .ar-flow strong {
          display: block;
          color: rgba(255, 255, 255, 0.72);
          font-size: 12px;
          line-height: 1.3;
        }

        .ar-flow i {
          width: 18px;
          height: 1px;
          background: rgba(138, 92, 255, 0.54);
        }

        .ar-phone-wrap {
          grid-column: 2 / 3;
          grid-row: 1 / 3;
          display: flex;
          justify-content: center;
        }

        .ar-phone {
          width: 286px;
          min-height: 560px;
          border-radius: 42px;
          padding: 13px;
          background: linear-gradient(145deg, rgba(255,255,255,0.16), rgba(255,255,255,0.04));
          border: 1px solid rgba(255, 255, 255, 0.16);
          box-shadow: 0 34px 90px rgba(0, 0, 0, 0.7);
        }

        .ar-phone-top {
          width: 84px;
          height: 24px;
          border-radius: 0 0 16px 16px;
          background: #000;
          margin: 0 auto -12px;
          position: relative;
          z-index: 2;
        }

        .ar-phone-screen {
          min-height: 528px;
          border-radius: 34px;
          padding: 46px 18px 18px;
        }

        .ar-phone-screen small {
          display: block;
          color: rgba(255, 255, 255, 0.54);
          font-size: 12px;
          margin-bottom: 20px;
        }

        .ar-message-card {
          padding: 17px;
          border-radius: 20px;
          background: rgba(255,255,255,0.055);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .ar-message-card b {
          display: block;
          font-size: 14px;
        }

        .ar-message-card p {
          margin: 10px 0 14px;
          color: rgba(255,255,255,0.56);
          font-size: 12px;
          line-height: 1.55;
        }

        .ar-message-card button,
        .ar-card-pdf button {
          width: 100%;
          border: 0;
          min-height: 38px;
          border-radius: 12px;
          color: #fff;
          font-weight: 800;
          background: linear-gradient(135deg, #5f42ff, #8a5cff);
        }

        .ar-message-line {
          height: 12px;
          margin-top: 16px;
          border-radius: 99px;
          background: rgba(255,255,255,0.08);
        }

        .ar-message-line.short {
          width: 64%;
        }

        .ar-dossier {
          display: grid;
          grid-template-columns: 0.86fr 1.14fr;
          gap: 56px;
          align-items: center;
        }

        .ar-dossier-copy ul {
          list-style: none;
          padding: 0;
          margin: 28px 0 0;
          display: grid;
          gap: 12px;
        }

        .ar-dossier-copy li {
          color: rgba(255,255,255,0.72);
          font-size: 15px;
          position: relative;
          padding-left: 28px;
        }

        .ar-dossier-copy li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #8a7dff;
          font-weight: 900;
        }

        .ar-dossier-visual {
          min-height: 430px;
          position: relative;
          border-radius: 34px;
          background:
            radial-gradient(circle at 55% 35%, rgba(119, 91, 255, 0.25), transparent 38%),
            rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.08);
          overflow: hidden;
        }

        .ar-dossier-visual:after {
          content: "";
          position: absolute;
          left: -10%;
          right: -10%;
          bottom: 70px;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(121, 93, 255, 0.8), transparent);
          box-shadow: 0 0 34px rgba(121, 93, 255, 0.7);
        }

        .ar-card-mock {
          position: absolute;
          border-radius: 28px;
          padding: 24px;
        }

        .ar-card-main {
          width: 330px;
          min-height: 330px;
          left: 64px;
          top: 56px;
          transform: rotate(-4deg);
          z-index: 2;
        }

        .ar-card-pdf {
          width: 220px;
          min-height: 290px;
          right: 70px;
          top: 82px;
          transform: rotate(3deg);
          z-index: 3;
          background: #f3f5ff;
          color: #10131f;
        }

        .ar-card-mock small {
          display: block;
          color: rgba(255,255,255,0.48);
          font-size: 11px;
          margin-bottom: 10px;
        }

        .ar-card-pdf small {
          color: #5f42ff;
          font-weight: 900;
        }

        .ar-card-mock h3 {
          margin: 0 0 20px;
          font-size: 22px;
          letter-spacing: -0.04em;
        }

        .ar-data-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          font-size: 13px;
        }

        .ar-data-row span {
          color: rgba(255,255,255,0.48);
        }

        .ar-ring {
          width: 76px;
          height: 76px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          margin: 28px 0 0 auto;
          border: 7px solid rgba(138, 92, 255, 0.28);
          border-top-color: #8a5cff;
        }

        .ar-ring span {
          font-size: 12px;
          font-weight: 900;
          color: #fff;
        }

        .ar-card-pdf p {
          font-size: 13px;
          line-height: 1.5;
          color: rgba(16, 19, 31, 0.62);
          margin-bottom: 24px;
        }

        .ar-showcase-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr;
          gap: 16px;
        }

        .ar-image-slot {
          min-height: 250px;
          border-radius: 30px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: end;
          padding: 22px;
          background:
            radial-gradient(circle at 50% 20%, rgba(115, 87, 255, 0.2), transparent 48%),
            linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02)),
            #050712;
        }

        .ar-image-slot:before {
          content: "";
          position: absolute;
          inset: 18px;
          border-radius: 22px;
          border: 1px dashed rgba(255,255,255,0.16);
          background:
            linear-gradient(135deg, rgba(255,255,255,0.04), transparent);
        }

        .ar-image-slot div {
          position: relative;
          z-index: 2;
        }

        .ar-image-slot strong {
          display: block;
          font-size: 17px;
          margin-bottom: 6px;
        }

        .ar-image-slot span {
          display: block;
          color: rgba(255,255,255,0.48);
          font-size: 13px;
        }

        .ar-image-large {
          grid-row: span 2;
          min-height: 516px;
        }

        .ar-image-wide {
          grid-column: span 2;
        }

        .ar-why {
          display: grid;
          grid-template-columns: 0.82fr 1.18fr;
          gap: 46px;
          align-items: stretch;
        }

        .ar-metrics {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-top: 30px;
        }

        .ar-metrics div {
          padding: 18px;
          border-radius: 20px;
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .ar-metrics strong {
          display: block;
          font-size: 16px;
        }

        .ar-metrics span {
          display: block;
          margin-top: 6px;
          color: rgba(255,255,255,0.5);
          font-size: 12px;
        }

        .ar-cta-card {
          position: relative;
          overflow: hidden;
          min-height: 360px;
          border-radius: 34px;
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .ar-city-glow {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(5,7,17,0.95), rgba(5,7,17,0.38)),
            radial-gradient(circle at 78% 46%, rgba(126, 92, 255, 0.38), transparent 28%);
        }

        .ar-cta-card > *:not(.ar-city-glow) {
          position: relative;
          z-index: 2;
          max-width: 460px;
        }

        .ar-footer {
          width: min(1180px, calc(100% - 36px));
          margin: 0 auto;
          padding: 46px 0 54px;
          border-top: 1px solid rgba(255,255,255,0.08);
          display: flex;
          justify-content: space-between;
          gap: 40px;
        }

        .ar-footer-brand {
          display: flex;
          gap: 14px;
          max-width: 300px;
        }

        .ar-footer-brand strong {
          display: block;
          font-size: 13px;
          letter-spacing: 0.12em;
        }

        .ar-footer-brand p {
          margin: 8px 0 0;
          color: rgba(255,255,255,0.48);
          font-size: 13px;
          line-height: 1.5;
        }

        .ar-footer-cols {
          display: flex;
          gap: 68px;
        }

        .ar-footer-cols div {
          display: grid;
          gap: 10px;
          align-content: start;
        }

        .ar-footer-cols strong {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        @media (max-width: 1050px) {
          .ar-menu {
            display: none;
          }

          .ar-hero,
          .ar-flow-section,
          .ar-dossier,
          .ar-why {
            grid-template-columns: 1fr;
          }

          .ar-hero {
            min-height: auto;
            padding-top: 46px;
          }

          .ar-dashboard-grid {
            grid-template-columns: 52px 1fr;
          }

          .ar-opportunity-panel {
            grid-column: 1 / -1;
          }

          .ar-benefit-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .ar-flow {
            grid-column: auto;
            overflow-x: auto;
            justify-content: flex-start;
          }

          .ar-flow div {
            min-width: 95px;
          }

          .ar-phone-wrap {
            grid-column: auto;
            grid-row: auto;
          }

          .ar-showcase-grid {
            grid-template-columns: 1fr 1fr;
          }

          .ar-image-large,
          .ar-image-wide {
            grid-column: span 2;
          }
        }

        @media (max-width: 720px) {
          .ar-nav {
            width: min(100% - 24px, 1180px);
            height: 74px;
          }

          .ar-brand {
            min-width: 0;
          }

          .ar-brand div:last-child {
            display: none;
          }

          .ar-nav-cta {
            min-height: 40px;
            padding: 0 14px;
            font-size: 12px;
          }

          .ar-hero,
          .ar-section,
          .ar-footer {
            width: min(100% - 24px, 1180px);
          }

          .ar-hero {
            gap: 34px;
            padding: 38px 0 56px;
          }

          .ar-hero h1 {
            font-size: 48px;
          }

          .ar-lead {
            font-size: 16px;
          }

          .ar-hero-actions {
            align-items: stretch;
          }

          .ar-btn {
            width: 100%;
          }

          .ar-trust-row {
            grid-template-columns: 1fr;
          }

          .ar-dashboard-shell {
            min-height: auto;
            border-radius: 26px;
            padding: 12px;
          }

          .ar-dashboard-grid {
            grid-template-columns: 1fr;
            min-height: auto;
          }

          .ar-side-menu {
            display: none;
          }

          .ar-map-panel,
          .ar-opportunity-panel {
            border-radius: 22px;
          }

          .ar-italy-placeholder {
            height: 230px;
          }

          .ar-section {
            padding: 64px 0;
          }

          .ar-benefit-grid {
            grid-template-columns: 1fr;
          }

          .ar-benefit-grid article {
            min-height: auto;
          }

          .ar-flow {
            padding: 18px;
            border-radius: 24px;
          }

          .ar-phone {
            width: 100%;
            max-width: 320px;
          }

          .ar-dossier-visual {
            min-height: 520px;
          }

          .ar-card-main {
            width: calc(100% - 44px);
            left: 22px;
            top: 30px;
          }

          .ar-card-pdf {
            width: 210px;
            right: 22px;
            top: 270px;
          }

          .ar-showcase-grid,
          .ar-metrics {
            grid-template-columns: 1fr;
          }

          .ar-image-large,
          .ar-image-wide {
            grid-column: auto;
            min-height: 260px;
          }

          .ar-why {
            gap: 28px;
          }

          .ar-cta-card {
            padding: 28px;
            min-height: 340px;
          }

          .ar-footer {
            flex-direction: column;
          }

          .ar-footer-cols {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 28px;
          }
        }
      `}</style>
    </main>
  );
}