function formatEuro(value) {
  if (value === null || value === undefined || value === "") return "N/D";

  const numberValue = Number(value);

  if (!Number.isFinite(numberValue)) {
    return String(value);
  }

  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(numberValue);
}

function formatPercent(value) {
  if (value === null || value === undefined || value === "") return "N/D";

  const numberValue = Number(value);

  if (!Number.isFinite(numberValue)) {
    return String(value);
  }

  return numberValue.toFixed(1).replace(".", ",") + "%";
}

function text(value, fallback) {
  if (value === null || value === undefined || value === "") return fallback;
  return String(value);
}

function upper(value, fallback) {
  return text(value, fallback).toUpperCase();
}

function firstValue(a, b, c, d) {
  if (a !== undefined && a !== null && a !== "") return a;
  if (b !== undefined && b !== null && b !== "") return b;
  if (c !== undefined && c !== null && c !== "") return c;
  if (d !== undefined && d !== null && d !== "") return d;
  return null;
}

function getMainJson(row) {
  if (row && row.analysis_json) return row.analysis_json;
  if (row && row.normalized_json) return row.normalized_json;
  return row || {};
}

function buildAnacLink(cig) {
  return "https://dettaglio-cig.anticorruzione.it/cig/" + cig;
}

function buildPriority(score) {
  const n = Number(score);

  if (!Number.isFinite(n)) {
    return "MONITORARE";
  }

  if (n >= 85) {
    return "ALTA";
  }

  if (n >= 72) {
    return "INTERESSANTE";
  }

  if (n >= 60) {
    return "MONITORARE";
  }

  return "BASSA";
}

function buildDecision(score) {
  if (score >= 80) return "AZIONE CONSIGLIATA";
  if (score >= 60) return "DA VALUTARE";
  return "NO-GO";
}

function cleanLine(value) {
  return text(value, "")
    .replace("lettura: ", "")
    .replace("CASO 1 - ", "")
    .replace("CASO 2 - ", "")
    .replace("gara analoga gia aggiudicata", "gara analoga aggiudicata")
    .trim();
}

function findLine(lines, prefix) {
  if (!lines) return null;

  for (let i = 0; i < lines.length; i++) {
    const row = text(lines[i], "");

    if (row.toLowerCase().indexOf(prefix.toLowerCase()) === 0) {
      return row;
    }
  }

  return null;
}

function extractAfterColon(value) {
  if (!value) return null;

  const parts = String(value).split(":");

  if (parts.length < 2) return null;

  return parts.slice(1).join(":").trim();
}

function extractNumber(value) {
  if (!value) return null;

  const match = String(value).replace(",", ".").match(/[-+]?[0-9]*\.?[0-9]+/);

  if (!match) return null;

  const n = Number(match[0]);

  if (!Number.isFinite(n)) return null;

  return n;
}

function extractPercentText(value) {
  if (!value) return "N/D";

  const match = String(value).match(/[0-9]+(?:[.,][0-9]+)?%/);

  if (!match) return "N/D";

  return match[0].replace(".", ",");
}

function parseRange(value) {
  if (!value) return { min: 0, max: 0 };

  const matches = String(value).replace(",", ".").match(/[0-9]+(?:\.[0-9]+)?/g);

  if (!matches || matches.length === 0) return { min: 0, max: 0 };

  const min = Number(matches[0]);
  const max = matches.length > 1 ? Number(matches[1]) : min;

  return {
    min: Number.isFinite(min) ? min : 0,
    max: Number.isFinite(max) ? max : 0
  };
}

function buildMercatoPosition(value) {
  const n = Number(value);

  if (!Number.isFinite(n)) return 50;

  const pos = Math.round((n / 50) * 100);

  if (pos < 0) return 0;
  if (pos > 100) return 100;

  return pos;
}

function extractSection(analisi, startTitle, stopTitles) {
  const rows = [];
  let active = false;

  if (!analisi || !Array.isArray(analisi)) return rows;

  for (let i = 0; i < analisi.length; i++) {
    const row = analisi[i];

    if (!row) continue;

    if (row === startTitle) {
      active = true;
      continue;
    }

    if (active) {
      if (stopTitles && stopTitles.indexOf(row) !== -1) {
        return rows;
      }

      rows.push(row);
    }
  }

  return rows;
}

function buildFinale(gara, score) {
  const indicazione = extractSection(
    gara.analisi,
    "INDICAZIONE OPERATIVA",
    []
  );

  if (indicazione.length > 0) {
    return cleanLine(indicazione[0]);
  }

  if (gara.finale) return String(gara.finale);

  if (score >= 80) {
    return "GO: gara coerente con operativita e storico Impresit";
  }

  if (score >= 60) {
    return "VALUTARE: gara potenzialmente coerente, da verificare con ufficio gare";
  }

  return "NO-GO: gara con compatibilita debole rispetto al profilo operativo";
}

function buildMotivi(gara) {
  const motivi = [];

  const posizionamento = extractSection(gara.analisi, "POSIZIONAMENTO OPERATIVO", [
    "LETTURA COMPETITIVA DEL CONTESTO",
    "COMPETITOR SU GARE REALMENTE COMPARABILI",
    "SINTESI OPERATIVA",
    "INDICAZIONE OPERATIVA"
  ]);

  if (gara.categoria) {
    motivi.push("Categoria " + gara.categoria + " coerente con storico");
  }

  if (gara.importo) {
    motivi.push("Importo in fascia operativa");
  }

  const accesso = findLine(posizionamento, "accesso gara:");
  if (accesso) {
    motivi.push("Accesso: " + upper(extractAfterColon(accesso), "N/D"));
  } else if (gara.tipo_procedura || gara.procedura) {
    motivi.push("Accesso: " + upper(gara.tipo_procedura || gara.procedura, "N/D"));
  }

  if (gara.regione) {
    motivi.push("Territorio: " + upper(gara.regione, "N/D"));
  }

  if (motivi.length === 0) {
    motivi.push("Dati gara disponibili per valutazione preliminare");
  }

  return motivi;
}

function buildFit(gara, score) {
  const posizionamento = extractSection(gara.analisi, "POSIZIONAMENTO OPERATIVO", [
    "LETTURA COMPETITIVA DEL CONTESTO",
    "COMPETITOR SU GARE REALMENTE COMPARABILI",
    "SINTESI OPERATIVA",
    "INDICAZIONE OPERATIVA"
  ]);

  const rows = [];

  for (let i = 0; i < posizionamento.length; i++) {
    const original = cleanLine(posizionamento[i]);
    const r = original.toLowerCase();

    if (r.indexOf("fascia economica coerente") !== -1) {
      rows.push("Fascia importo: coerente");
    }

    if (r.indexOf("dimensione operativa gia presidiata") !== -1) {
      rows.push("Operativita: gia presidiata");
    }

    if (r.indexOf("accesso gara:") !== -1) {
      rows.push("Accesso: " + upper(extractAfterColon(original), "N/D"));
    }
  }

  if (rows.length === 0) {
    rows.push("Fascia importo: coerente");
    rows.push("Operativita: da verificare su storico Impresit");
    rows.push("Accesso: " + upper(gara.tipo_procedura || gara.procedura, "N/D"));
  }

  return {
    score: score,
    descrizione: rows.slice(0, 3)
  };
}

function buildMercato(gara) {
  const analisi = gara.analisi || [];

  const comparabiliLine = findLine(analisi, "gare comparabili analizzate:");
  const centroLine = findLine(analisi, "centro gara:");
  const fasciaLine = findLine(analisi, "fascia tipica:");
  const campioneLine = findLine(analisi, "campione:");
  const competitivaLine = findLine(analisi, "zona competitiva:");
  const aggressivaLine = findLine(analisi, "zona aggressiva:");
  const consigliataLine = findLine(analisi, "zona consigliata:");
  const posizionamentoLine = findLine(analisi, "posizionamento consigliato:");
  const affidibilitaA = findLine(analisi, "affidabilita previsione:");
  const affidibilitaB = findLine(analisi, "affidabilità previsione:");

  const comparabili = extractNumber(comparabiliLine) || 0;
  const campione = extractNumber(campioneLine) || 0;

  const centro = extractAfterColon(centroLine) || "N/D";
  const fascia = extractAfterColon(fasciaLine) || "N/D";
  const competitivo = extractAfterColon(competitivaLine) || extractAfterColon(consigliataLine) || "N/D";

  let aggressivo = "N/D";
  if (aggressivaLine) {
    const parts = String(aggressivaLine).split("oltre");
    aggressivo = parts.length > 1 ? "> " + parts[1].trim() : extractAfterColon(aggressivaLine);
  }

  const lettura = extractAfterColon(posizionamentoLine) || "prudente";

  let affidabilita = "da calcolare";
  const affidRaw = affidibilitaA || affidibilitaB;
  if (affidRaw) {
    const val = extractAfterColon(affidRaw);
    affidabilita = val ? val.replace("→", "-").trim() : "ALTA";
  } else if (campione >= 50) {
    affidabilita = "affidabile";
  }

  const centroValue = extractNumber(centro);
  const fasciaParts = parseRange(fascia);
  const competitivoParts = parseRange(competitivo);
  const aggressivoValue = extractNumber(aggressivo);

  return {
    comparabili: comparabili,
    campione: campione,
    affidabilita: affidabilita,

    centroValue: centroValue || 0,
    fasciaMin: fasciaParts.min || 0,
    fasciaMax: fasciaParts.max || 0,
    competitivoMin: competitivoParts.min || 0,
    competitivoMax: competitivoParts.max || 0,
    aggressivoThreshold: aggressivoValue || 0,

    centro: centro,
    fascia: fascia,
    competitivo: competitivo,
    aggressivo: aggressivo,

    lettura: lettura,
    nota: "dati ricavati dal motore Intelligence Clean",

    distribuzione: [8, 16, 34, 55, 78, 100, 92, 72, 48, 30, 18, 9],

    posizione: buildMercatoPosition(centroValue),

    scala: {
      min: 0,
      max: 50
    }
  };
}

function buildStorico(gara) {
  const storico = Array.isArray(gara.matchStorico) ? gara.matchStorico[0] : null;

  if (storico) {
    return {
      label: "gara analoga aggiudicata",
      cig: text(storico.cig, "N/D"),
      importo: formatEuro(storico.importo || storico.importo_lavori),
      categoria: text(storico.categoria, "N/D"),
      ribasso:
  Number(storico.ribasso) === 0
    ? "0,0% • OEPV / non competitivo"
    : formatPercent(storico.ribasso),
      esito: text(storico.esito || storico.stato, "DA VERIFICARE")
    };
  }

  return {
    label: "storico Impresit da collegare",
    cig: text(gara.cig, "N/D"),
    importo: formatEuro(gara.importo),
    categoria: text(gara.categoria, "N/D"),
    ribasso: formatPercent(gara.ribasso),
    esito: text(gara.esito, "DA VERIFICARE")
  };
}

function buildCompetitor(gara) {
  const analisi = gara.analisi || [];
  const start = analisi.indexOf("COMPETITOR SU GARE REALMENTE COMPARABILI");

  if (start === -1) {
    return buildFallbackCompetitor(gara);
  }

  const competitors = [];
  let current = null;
  let readingCases = false;

  for (let i = start + 1; i < analisi.length; i++) {
    const row = text(analisi[i], "").trim();

    if (!row) continue;

    if (row === "SINTESI OPERATIVA" || row === "INDICAZIONE OPERATIVA") {
      break;
    }

    if (
      row.indexOf("gare comparabili analizzate:") === 0 ||
      row.indexOf("mercato ribassi comparabili") === 0 ||
      row.indexOf("centro gara:") === 0 ||
      row.indexOf("fascia tipica:") === 0 ||
      row.indexOf("campione:") === 0 ||
      row.indexOf("fascia ribassi") !== -1 ||
      row.indexOf("zona mercato:") === 0 ||
      row.indexOf("zona competitiva:") === 0 ||
      row.indexOf("zona aggressiva:") === 0 ||
      row.indexOf("posizionamento consigliato:") === 0 ||
      row.indexOf("zona consigliata:") === 0 ||
      row.indexOf("lettura:") === 0 ||
      row.indexOf("affidabilita previsione:") === 0 ||
      row.indexOf("affidabilità previsione:") === 0
    ) {
      continue;
    }

    if (row.indexOf(" - ") !== -1 && row.indexOf("gare simili vinte") !== -1) {
      if (current) {
        competitors.push(current);
      }

      current = parseCompetitorHeader(row);
      readingCases = false;
      continue;
    }

    if (!current) continue;

    if (row.indexOf("ribassi osservati:") === 0) {
      current.mediaRibassi = parseMediaRibassi(row);
      continue;
    }

    if (row.indexOf("gare usate per la media") === 0) {
      readingCases = true;
      continue;
    }

    if (readingCases && row.indexOf("ribasso") !== -1) {
      const item = parseCompetitorCase(row);
      if (item) current.cig.push(item);
    }
  }

  if (current) {
    competitors.push(current);
  }

  if (competitors.length === 0) {
    return buildFallbackCompetitor(gara);
  }

  return competitors.slice(0, 3);
}

function parseCompetitorHeader(row) {
  const parts = row.split(" - ");
  const nome = cleanCompanyName(parts[0]);
  const rest = parts.slice(1).join(" - ");

  const gareVinte = extractNumber(rest) || 0;

  let rischio = "N/D";
  const rischioMatch = rest.match(/rischio\s+([A-Z]+)/i);
  if (rischioMatch && rischioMatch[1]) {
    rischio = rischioMatch[1].toUpperCase();
  }

  let segnale = null;
  if (rest.toLowerCase().indexOf("spinge fascia alta") !== -1) {
    segnale = "spinge fascia alta";
  }

  if (rest.toLowerCase().indexOf("aggressivo") !== -1) {
    segnale = "segnale aggressivo";
  }

  return {
    nome: nome,
    rischio: rischio,
    gareVinte: gareVinte,
    mediaRibassi: "N/D",
    segnale: segnale,
    cig: []
  };
}

function parseMediaRibassi(row) {
  const mediaMatch = String(row).match(/media\s+([0-9]+(?:[.,][0-9]+)?%)/i);

  if (mediaMatch && mediaMatch[1]) {
    return mediaMatch[1].replace(".", ",");
  }

  return extractPercentText(row);
}

function parseCompetitorCase(row) {
  const parts = row.split("→ ribasso");
  if (parts.length < 2) return null;

  return {
    id: parts[0].trim(),
    ribasso: parts[1].trim().replace(".", ",")
  };
}

function cleanCompanyName(value) {
  return text(value, "N/D")
    .replace("COSTRUZIONI GENERALI GIRARDINI SPA UNIPERSONALE", "GIRARDINI SPA")
    .replace("COSTRUZIONI GENERALI GIRARDINI S.P.A. UNIPERSONALE", "GIRARDINI SPA")
    .replace("UNIPERSONALE", "")
    .replace(/\s+/g, " ")
    .trim();
}

function buildFallbackCompetitor(gara) {
  return [
    {
      nome: text(gara.aggiudicatario, "Competitor da calcolare"),
      rischio: "N/D",
      gareVinte: 0,
      mediaRibassi: formatPercent(gara.ribasso),
      cig: [
        {
          id: text(gara.cig, "N/D"),
          ribasso: formatPercent(gara.ribasso)
        }
      ]
    }
  ];
}

export function buildGaraViewModel(row) {
  const gara = getMainJson(row);

  const cig = text(firstValue(row.cig, gara.cig, null, null), "N/D");

  const score = Number(firstValue(gara.score, row.score, 70, null));
  const safeScore = Number.isFinite(score) ? score : 70;

  const ente = text(
    firstValue(row.ente_appaltante, gara.ente_appaltante, gara.ente, gara.titolo),
    "ENTE NON DISPONIBILE"
  );

  const regione = upper(firstValue(row.regione, gara.regione, null, null), "N/D");
  const categoria = upper(firstValue(row.categoria, gara.categoria, null, null), "N/D");

  const procedura = upper(
    firstValue(row.procedura, row.tipo_procedura, gara.tipo_procedura, gara.procedura),
    "N/D"
  );

  const importo = firstValue(row.importo, gara.importo, null, null);

  const pubblicazione = text(
    firstValue(row.pubblicazione, row.data_pubblicazione, gara.data_pubblicazione, gara.pubblicazione),
    "N/D"
  );

  return {
    priorita: buildPriority(safeScore),
    score: safeScore,
    decisione: buildDecision(safeScore),

    titolo: ente,
    sottotitolo: "Gara rilevata dal sistema Appalti Radar, da valutare con priorita operativa",

    cig: cig,

    ente: ente,
    regione: regione,
    categoria: categoria,
    importo: formatEuro(importo),
    pubblicazione: pubblicazione,
    procedura: procedura,

    linkAnac: buildAnacLink(cig),

    motivi: buildMotivi(gara),

    fit: buildFit(gara, safeScore),

    storicoImpresit: buildStorico(gara),

    mercato: buildMercato(gara),

    competitor: buildCompetitor(gara),

    documenti: [
      {
        nome: "Apri scheda ANAC",
        tipo: "link",
        url: buildAnacLink(cig)
      },
      {
        nome: "JSON gara",
        tipo: "json"
      },
      {
        nome: "Report analisi",
        tipo: "report"
      }
    ],

    finale: buildFinale(gara, safeScore)
  };
}
