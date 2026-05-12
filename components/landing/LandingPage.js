"use client";

import React from "react";

const features = [
  {
    n: "01",
    title: "Monitoraggio live",
    text: "Il sistema intercetta nuove gare pubbliche e aggiornamenti operativi dalle fonti monitorate.",
  },
  {
    n: "02",
    title: "Analisi intelligence",
    text: "Ogni gara viene letta contro profilo aziendale, storico, categoria, territorio e contesto competitivo.",
  },
  {
    n: "03",
    title: "Dossier operativo",
    text: "Le opportunita rilevanti diventano dossier consultabili, con sintesi, scoring, mercato e risorse.",
  },
  {
    n: "04",
    title: "Alert mirati",
    text: "L'ufficio gare riceve solo segnalazioni utili, gia pesate e pronte per una prima valutazione.",
  },
];

const cards = [
  {
    title: "Alert Telegram",
    subtitle: "Segnalazioni compatte, rapide e leggibili da mobile.",
    image: "/landing/telegram-alert.jpg",
  },
  {
    title: "Dossier gara",
    subtitle: "Pagina dinamica con priorita, dati chiave e lettura operativa.",
    image: "/landing/mobile-dossier.jpg",
  },
  {
    title: "Report PDF",
    subtitle: "Snapshot enterprise scaricabile e condivisibile internamente.",
    image: "/landing/documenti.jpg",
  },
];

const stats = [
  ["Radar", "Monitoraggio continuo"],
  ["DNA", "Profilo operativo aziendale"],
  ["Score", "Priorita gara"],
  ["Dossier", "Decisione rapida"],
];

export default function LandingPage() {
  return (
    <main className="page">
      <div className="noise" />

      <header className="nav">
        <a className="brand" href="/">
          <img src="/appalti-gara-logo.png" alt="Appalti Radar" />
          <span>Appalti Radar</span>
        </a>

        <nav className="links">
          <a href="#funzionalita">Funzionalita</a>
          <a href="#flusso">Come funziona</a>
          <a href="#dossier">Dossier intelligence</a>
          <a href="#vantaggi">Vantaggi</a>
          <a href="#contatti">Contatti</a>
        </nav>

        <a className="navCta" href="#contatti">
          Richiedi accesso
          <span>lock</span>
        </a>
      </header>

      <section className="hero">
        <div className="heroText">
          <div className="eyebrow">Monitoraggio live · dati reali · alert mirati</div>

          <h1>
            Procurement intelligence per{" "}
            <span>lavori pubblici.</span>
          </h1>

          <p>
            Appalti Radar monitora le opportunita pubbliche, seleziona le gare
            coerenti con il profilo operativo dell'impresa e trasforma i dati in
            alert, dossier e report pronti per l'ufficio gare.
          </p>

          <div className="heroActions">
            <a href="#contatti" className="primaryBtn">
              Richiedi accesso al radar operativo
            </a>
            <a href="#dossier" className="secondaryBtn">
              Guarda il flusso reale
            </a>
          </div>

          <div className="trust">
            <span />
            Accesso riservato a imprese qualificate
          </div>
        </div>

        <div className="heroVisual">
          <div className="monitor">
            <div className="monitorTop">
              <div>
                <strong>IMPRESIT LAVORI SPA</strong>
                <small>Dossier intelligence gara</small>
              </div>
              <div className="live">LIVE</div>
            </div>

            <div className="tenderHead">
              <div>
                <small>ANAS - SOCIETA' PER AZIONI</small>
                <h3>Gara rilevata dal sistema</h3>
              </div>
              <div className="score">
                <b>70</b>
                <span>FIT GARA</span>
              </div>
            </div>

            <div className="miniGrid">
              <div><small>CIG</small><b>BB81DC887E</b></div>
              <div><small>Regione</small><b>MOLISE</b></div>
              <div><small>Categoria</small><b>OG 3</b></div>
              <div><small>Importo</small><b>1.662.000 EUR</b></div>
            </div>

            <div className="intelGrid">
              <div>
                <h4>Motivi di rilevanza</h4>
                <p>Categoria coerente con storico</p>
                <p>Importo in fascia operativa</p>
                <p>Procedura aperta</p>
              </div>
              <div>
                <h4>Lettura mercato</h4>
                <p>Scenario competitivo</p>
                <p>Campione comparabile</p>
                <p>Affidabilita alta</p>
              </div>
            </div>

            <div className="pressure">
              <div className="pressureTop">
                <strong>Pressione ribassi</strong>
                <span>competitiva</span>
              </div>
              <div className="bar">
                <i />
              </div>
            </div>
          </div>

          <div className="radarGlow" />
        </div>
      </section>

      <section id="flusso" className="flow">
        <div className="sectionHead">
          <span>Il nostro flusso operativo</span>
          <h2>Dai dati pubblici alle decisioni operative.</h2>
        </div>

        <div className="steps">
          {features.map((item) => (
            <article className="step" key={item.n}>
              <div className="stepIcon">{item.n}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="dossier" className="proof">
        <div className="sectionHead">
          <span>Flusso reale</span>
          <h2>Alert, pagina dossier e documentazione nello stesso ecosistema.</h2>
        </div>

        <div className="proofGrid">
          {cards.map((card) => (
            <article className="proofCard" key={card.title}>
              <div>
                <h3>{card.title}</h3>
                <p>{card.subtitle}</p>
              </div>
              <div className="phoneFrame">
                <img src={card.image} alt={card.title} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="funzionalita" className="radarSection">
        <div className="radarPanel">
          <div className="italyRadar">
            <img src="/appalti-gara-logo.png" alt="Appalti Radar logo" />
            <div className="rings" />
          </div>

          <div className="radarText">
            <span>Copertura nazionale</span>
            <h2>Un radar operativo costruito per leggere il mercato degli appalti.</h2>
            <p>
              Il sistema nasce per dare all'ufficio gare una lettura piu rapida
              delle opportunita: non una lista generica di bandi, ma una selezione
              ragionata, collegata a profilo aziendale, categorie, territori,
              storico e pressione competitiva.
            </p>

            <div className="stats">
              {stats.map(([a, b]) => (
                <div key={a}>
                  <strong>{a}</strong>
                  <small>{b}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="vantaggi" className="advantages">
        <article>
          <h3>Meno rumore</h3>
          <p>Solo opportunita coerenti, prioritarie e leggibili rapidamente.</p>
        </article>
        <article>
          <h3>Decisione piu veloce</h3>
          <p>Ogni alert porta a un dossier con dati chiave e lettura operativa.</p>
        </article>
        <article>
          <h3>Memoria aziendale</h3>
          <p>Lo storico diventa un profilo di lettura per valutare nuove gare.</p>
        </article>
        <article>
          <h3>Output condivisibile</h3>
          <p>Telegram, pagina dinamica e PDF parlano la stessa lingua operativa.</p>
        </article>
      </section>

      <section id="contatti" className="access">
        <div>
          <span>Accesso riservato</span>
          <h2>Entra nel radar operativo.</h2>
          <p>
            Il monitoraggio e riservato a imprese qualificate. Compila la richiesta:
            verificheremo il profilo e attiveremo il canale operativo dedicato.
          </p>
        </div>

        <form>
          <input placeholder="Azienda" />
          <input placeholder="Nome e cognome" />
          <input placeholder="Telefono" />
          <input placeholder="Email aziendale" />
          <input placeholder="Partita IVA" />
          <input placeholder="Ruolo in azienda" />
          <label>
            <input type="checkbox" />
            Autorizzo il trattamento dei dati secondo la Privacy Policy.
          </label>
          <button type="button">Richiedi accesso</button>
        </form>
      </section>

      <footer className="footer">
        <div>
          <img src="/appalti-gara-logo.png" alt="Appalti Radar" />
          <p>Intelligence operativa per lavori pubblici.</p>
        </div>

        <div>
          <strong>Prodotto</strong>
          <a href="#funzionalita">Funzionalita</a>
          <a href="#flusso">Come funziona</a>
          <a href="#dossier">Dossier intelligence</a>
        </div>

        <div>
          <strong>Risorse</strong>
          <a href="#contatti">Contatti</a>
          <a href="#vantaggi">Vantaggi</a>
        </div>

        <div>
          <strong>Legale</strong>
          <a>Privacy Policy</a>
          <a>Termini di utilizzo</a>
        </div>

        <small>© 2026 Appalti Radar. Tutti i diritti riservati.</small>
      </footer>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background:
            radial-gradient(circle at 70% 10%, rgba(105, 44, 255, 0.28), transparent 34%),
            radial-gradient(circle at 20% 0%, rgba(0, 184, 255, 0.18), transparent 30%),
            linear-gradient(180deg, #030306 0%, #06070c 45%, #020204 100%);
          color: #fff;
          overflow: hidden;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .noise {
          pointer-events: none;
          position: fixed;
          inset: 0;
          opacity: 0.18;
          background-image:
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 52px 52px;
          mask-image: linear-gradient(to bottom, #000, transparent 78%);
        }

        .nav {
          position: sticky;
          top: 0;
          z-index: 20;
          height: 84px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 42px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(3, 3, 8, 0.74);
          backdrop-filter: blur(18px);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 14px;
          color: #fff;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-size: 12px;
          font-weight: 800;
        }

        .brand img {
          width: 72px;
          height: 46px;
          object-fit: contain;
          filter: drop-shadow(0 0 18px rgba(108, 69, 255, 0.55));
        }

        .links {
          display: flex;
          gap: 30px;
          align-items: center;
        }

        .links a {
          color: rgba(255,255,255,0.74);
          text-decoration: none;
          font-size: 13px;
          font-weight: 650;
        }

        .links a:hover {
          color: #fff;
        }

        .navCta {
          color: #fff;
          text-decoration: none;
          border: 1px solid rgba(168, 92, 255, 0.55);
          padding: 13px 18px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 850;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          background: rgba(104, 40, 255, 0.16);
          box-shadow: 0 0 30px rgba(111, 39, 255, 0.18);
        }

        .hero {
          max-width: 1320px;
          margin: 0 auto;
          padding: 96px 42px 70px;
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 58px;
          align-items: center;
        }

        .eyebrow,
        .sectionHead span,
        .radarText span,
        .access span {
          display: inline-block;
          color: #b879ff;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-size: 12px;
          font-weight: 900;
          margin-bottom: 16px;
        }

        h1 {
          font-size: clamp(46px, 6vw, 86px);
          line-height: 0.94;
          letter-spacing: -0.075em;
          margin: 0 0 28px;
        }

        h1 span {
          display: block;
          background: linear-gradient(90deg, #9b5cff, #39d5ff);
          -webkit-background-clip: text;
          color: transparent;
        }

        .heroText p {
          color: rgba(255,255,255,0.72);
          font-size: 18px;
          line-height: 1.7;
          max-width: 620px;
          margin: 0;
        }

        .heroActions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-top: 34px;
        }

        .primaryBtn,
        .secondaryBtn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 54px;
          padding: 0 24px;
          border-radius: 12px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .primaryBtn {
          color: #fff;
          background: linear-gradient(135deg, #7938ff, #b442ff);
          box-shadow: 0 14px 38px rgba(113, 51, 255, 0.35);
        }

        .secondaryBtn {
          color: #d8c9ff;
          border: 1px solid rgba(154, 103, 255, 0.35);
          background: rgba(255,255,255,0.04);
        }

        .trust {
          margin-top: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,0.62);
          font-size: 14px;
        }

        .trust span {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 1px solid rgba(120, 255, 183, 0.45);
          box-shadow: 0 0 18px rgba(34, 255, 145, 0.24);
        }

        .heroVisual {
          position: relative;
          min-height: 530px;
          display: grid;
          place-items: center;
        }

        .monitor {
          position: relative;
          z-index: 2;
          width: min(760px, 100%);
          padding: 18px;
          border: 1px solid rgba(166, 124, 255, 0.42);
          border-radius: 18px;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.025)),
            rgba(4, 5, 10, 0.92);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04) inset,
            0 42px 90px rgba(0,0,0,0.72),
            0 0 70px rgba(111, 67, 255, 0.24);
          transform: perspective(1000px) rotateY(-6deg) rotateX(2deg);
        }

        .monitorTop,
        .tenderHead,
        .pressureTop {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .monitorTop {
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .monitorTop strong {
          display: block;
          font-size: 14px;
          letter-spacing: 0.05em;
        }

        .monitorTop small,
        .miniGrid small {
          color: rgba(255,255,255,0.48);
          font-size: 11px;
        }

        .live {
          color: #32ff99;
          border: 1px solid rgba(50,255,153,0.35);
          background: rgba(50,255,153,0.08);
          padding: 8px 12px;
          border-radius: 99px;
          font-size: 11px;
          font-weight: 900;
        }

        .tenderHead {
          margin-top: 18px;
          padding: 18px;
          border-radius: 15px;
          border: 1px solid rgba(137, 104, 255, 0.36);
          background: rgba(95, 67, 255, 0.08);
        }

        .tenderHead h3 {
          font-size: 30px;
          margin: 4px 0 0;
          letter-spacing: -0.04em;
        }

        .tenderHead small {
          color: rgba(255,255,255,0.64);
          font-weight: 800;
        }

        .score {
          width: 86px;
          height: 86px;
          border-radius: 50%;
          border: 2px solid #00e978;
          display: grid;
          place-items: center;
          text-align: center;
          color: #20ff91;
        }

        .score b {
          display: block;
          font-size: 28px;
          line-height: 1;
        }

        .score span {
          font-size: 9px;
          font-weight: 900;
        }

        .miniGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-top: 12px;
        }

        .miniGrid div,
        .intelGrid > div {
          border: 1px solid rgba(255,255,255,0.11);
          background: rgba(255,255,255,0.035);
          border-radius: 12px;
          padding: 13px;
        }

        .miniGrid b {
          display: block;
          margin-top: 3px;
          font-size: 13px;
        }

        .intelGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 12px;
        }

        .intelGrid h4 {
          margin: 0 0 10px;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .intelGrid p {
          margin: 7px 0;
          color: rgba(255,255,255,0.74);
          font-size: 12px;
          font-weight: 700;
        }

        .pressure {
          margin-top: 12px;
          padding: 15px;
          border-radius: 14px;
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .pressureTop strong {
          font-size: 14px;
          text-transform: uppercase;
        }

        .pressureTop span {
          color: #ffc83d;
          text-transform: uppercase;
          font-size: 11px;
          font-weight: 900;
        }

        .bar {
          position: relative;
          height: 10px;
          border-radius: 99px;
          margin-top: 18px;
          background: linear-gradient(90deg, #00e978, #ffd43d 43%, #ff7a2f 70%, #ff366e);
        }

        .bar i {
          position: absolute;
          left: 30%;
          top: -6px;
          width: 2px;
          height: 22px;
          background: #fff;
          box-shadow: 0 0 14px #fff;
        }

        .radarGlow {
          position: absolute;
          width: 520px;
          height: 520px;
          border-radius: 50%;
          background:
            radial-gradient(circle, rgba(0, 211, 255, 0.22), transparent 55%),
            conic-gradient(from 45deg, rgba(145, 75, 255, 0.28), rgba(0, 219, 255, 0.28), transparent, rgba(145, 75, 255, 0.28));
          filter: blur(12px);
          opacity: 0.82;
        }

        .flow,
        .proof,
        .radarSection,
        .advantages,
        .access,
        .footer {
          max-width: 1320px;
          margin: 0 auto;
          padding-left: 42px;
          padding-right: 42px;
        }

        .sectionHead {
          text-align: center;
          margin-bottom: 42px;
        }

        .sectionHead h2,
        .radarText h2,
        .access h2 {
          font-size: clamp(30px, 4vw, 52px);
          line-height: 1.05;
          letter-spacing: -0.055em;
          margin: 0;
        }

        .steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .step {
          padding: 28px;
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 20px;
          background: rgba(255,255,255,0.035);
          text-align: center;
        }

        .stepIcon {
          width: 52px;
          height: 52px;
          margin: 0 auto 18px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          color: #d7c2ff;
          background: rgba(123, 73, 255, 0.16);
          border: 1px solid rgba(161, 113, 255, 0.32);
          font-weight: 950;
        }

        .step h3 {
          margin: 0 0 10px;
          font-size: 16px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .step p,
        .proofCard p,
        .radarText p,
        .advantages p,
        .access p {
          color: rgba(255,255,255,0.66);
          line-height: 1.65;
          margin: 0;
        }

        .proof {
          padding-top: 92px;
        }

        .proofGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .proofCard {
          min-height: 520px;
          padding: 24px;
          border-radius: 24px;
          border: 1px solid rgba(151, 94, 255, 0.25);
          background:
            radial-gradient(circle at 50% 0%, rgba(119, 75, 255, 0.18), transparent 34%),
            rgba(255,255,255,0.035);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
        }

        .proofCard h3 {
          color: #c99dff;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: 16px;
          margin: 0 0 8px;
        }

        .phoneFrame {
          margin: 24px auto 0;
          width: min(280px, 100%);
          height: 390px;
          border-radius: 28px;
          border: 1px solid rgba(255,255,255,0.16);
          background: #050509;
          overflow: hidden;
          box-shadow: 0 28px 70px rgba(0,0,0,0.55);
        }

        .phoneFrame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .radarSection {
          padding-top: 92px;
        }

        .radarPanel {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 40px;
          align-items: center;
          padding: 42px;
          border-radius: 30px;
          border: 1px solid rgba(143, 91, 255, 0.28);
          background:
            radial-gradient(circle at 28% 35%, rgba(0, 207, 255, 0.16), transparent 30%),
            radial-gradient(circle at 65% 0%, rgba(150, 72, 255, 0.2), transparent 34%),
            rgba(255,255,255,0.035);
        }

        .italyRadar {
          position: relative;
          min-height: 420px;
          display: grid;
          place-items: center;
        }

        .italyRadar img {
          position: relative;
          z-index: 3;
          width: min(360px, 80%);
          filter: drop-shadow(0 0 40px rgba(57, 213, 255, 0.42));
        }

        .rings,
        .rings:before,
        .rings:after {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(87, 208, 255, 0.35);
        }

        .rings {
          width: 360px;
          height: 360px;
          box-shadow: 0 0 80px rgba(116, 73, 255, 0.24);
        }

        .rings:before {
          content: "";
          inset: 44px;
        }

        .rings:after {
          content: "";
          inset: 88px;
          border-color: rgba(178, 78, 255, 0.45);
        }

        .radarText p {
          font-size: 17px;
          margin-top: 20px;
          max-width: 680px;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-top: 30px;
        }

        .stats div {
          padding: 18px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(0,0,0,0.24);
        }

        .stats strong {
          display: block;
          font-size: 22px;
          color: #fff;
        }

        .stats small {
          color: rgba(255,255,255,0.58);
        }

        .advantages {
          padding-top: 34px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .advantages article {
          padding: 24px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.09);
          background: rgba(255,255,255,0.032);
        }

        .advantages h3 {
          margin: 0 0 10px;
          font-size: 18px;
        }

        .access {
          margin-top: 80px;
          padding-top: 32px;
          padding-bottom: 32px;
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 34px;
          align-items: center;
          border: 1px solid rgba(143, 91, 255, 0.35);
          border-radius: 24px;
          background:
            radial-gradient(circle at 100% 0%, rgba(132, 71, 255, 0.18), transparent 35%),
            rgba(255,255,255,0.035);
        }

        form {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        input {
          min-height: 50px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(0,0,0,0.28);
          color: #fff;
          padding: 0 14px;
          outline: none;
        }

        input::placeholder {
          color: rgba(255,255,255,0.42);
        }

        label {
          grid-column: span 2;
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,0.58);
          font-size: 12px;
        }

        label input {
          min-height: auto;
        }

        button {
          border: 0;
          border-radius: 10px;
          color: #fff;
          background: linear-gradient(135deg, #7938ff, #b442ff);
          font-weight: 900;
          text-transform: uppercase;
          cursor: pointer;
        }

        .footer {
          padding-top: 54px;
          padding-bottom: 50px;
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr auto;
          gap: 34px;
          align-items: start;
          color: rgba(255,255,255,0.58);
        }

        .footer img {
          width: 86px;
          height: auto;
          object-fit: contain;
        }

        .footer p {
          margin: 12px 0 0;
        }

        .footer strong {
          display: block;
          color: #fff;
          margin-bottom: 12px;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 0.08em;
        }

        .footer a {
          display: block;
          color: rgba(255,255,255,0.58);
          text-decoration: none;
          margin: 7px 0;
          font-size: 13px;
        }

        .footer small {
          white-space: nowrap;
        }

        @media (max-width: 980px) {
          .nav {
            padding: 0 20px;
          }

          .links {
            display: none;
          }

          .brand span {
            display: none;
          }

          .hero {
            grid-template-columns: 1fr;
            padding: 62px 20px 50px;
          }

          .heroVisual {
            min-height: auto;
          }

          .monitor {
            transform: none;
          }

          .steps,
          .proofGrid,
          .advantages,
          .stats {
            grid-template-columns: 1fr;
          }

          .radarPanel,
          .access {
            grid-template-columns: 1fr;
            padding: 24px;
          }

          form {
            grid-template-columns: 1fr;
          }

          label {
            grid-column: auto;
          }

          .footer {
            grid-template-columns: 1fr 1fr;
            padding-left: 20px;
            padding-right: 20px;
          }
        }

        @media (max-width: 640px) {
          .navCta {
            padding: 11px 12px;
            font-size: 10px;
          }

          .heroActions {
            flex-direction: column;
          }

          .primaryBtn,
          .secondaryBtn {
            width: 100%;
          }

          .miniGrid,
          .intelGrid {
            grid-template-columns: 1fr;
          }

          .flow,
          .proof,
          .radarSection,
          .advantages,
          .access {
            padding-left: 20px;
            padding-right: 20px;
          }

          .proofCard {
            min-height: 480px;
          }

          .footer {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}