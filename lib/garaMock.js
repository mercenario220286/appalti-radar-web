export const garaMock = {
  priorita: "ALTA",
  score: 82,
  decisione: "AZIONE CONSIGLIATA",

  titolo: "COMUNE DI SAN MINIATO",
  sottotitolo: "Gara coerente con profilo Impresit, da valutare con priorita",

  cig: "926757981F",

  ente: "COMUNE DI SAN MINIATO",
  regione: "TOSCANA",
  categoria: "OG 3",
  importo: "1.178.049 €",
  pubblicazione: "2022-08-11",
  procedura: "PROCEDURA APERTA",

  linkAnac: "https://dati.anticorruzione.it/superset/dashboard/appalti/?cig=926757981F",

  motivi: [
    "Categoria OG 3 coerente con storico",
    "Importo in fascia operativa",
    "Precedenti Impresit presenti",
    "Competitor rilevati"
  ],

  fit: {
    score: 92,
    descrizione: [
      "Fascia importo: coerente",
      "Operativita: gia presidiata",
      "Accesso: procedura aperta"
    ]
  },

  storicoImpresit: {
    label: "gara analoga aggiudicata",
    cig: "7043077301",
    importo: "800.000 €",
    categoria: "OG 3",
    ribasso: "34%",
    esito: "AGGIUDICATA"
  },

  mercato: {
  comparabili: 258,
  campione: 239,
  affidabilita: "affidabile",

  // valori numerici (fondamentali per UI dinamica)
  centroValue: 11.2,
  fasciaMin: 9.2,
  fasciaMax: 13.2,
  competitivoMin: 12.5,
  competitivoMax: 17.2,
  aggressivoThreshold: 29.9,

  // versioni formattate per UI
  centro: "11,2%",
  fascia: "9,2% - 13,2%",
  competitivo: "12,5% - 17,2%",
  aggressivo: "> 29,9%",

  lettura: "prudente",
  nota: "dati indicativi, non vincolanti",

  // distribuzione reale (istogramma)
  distribuzione: [8, 16, 34, 55, 78, 100, 92, 72, 48, 30, 18, 9],

  // posizione su scala 0–100
  posizione: 58,

  // NUOVO — mappa reale scala (fondamentale per futuro)
  scala: {
    min: 0,
    max: 50
  }
},

  competitor: [
    {
      nome: "MOVITER SRL",
      rischio: "MEDIO",
      gareVinte: 4,
      mediaRibassi: "17,5%",
      cig: [
        { id: "87134939E3", ribasso: "48,5%" },
        { id: "8881598E84", ribasso: "6,9%" },
        { id: "9049515804", ribasso: "2,5%" },
        { id: "926744598A", ribasso: "12,1%" }
      ]
    },
    {
      nome: "BINDI SPA",
      rischio: "MEDIO",
      gareVinte: 4,
      mediaRibassi: "15,9%",
      cig: [
        { id: "9172102204", ribasso: "25,0%" },
        { id: "927712099A", ribasso: "10,9%" },
        { id: "93246207D8", ribasso: "11,9%" },
        { id: "9298993BC5", ribasso: "N/D" }
      ]
    },
    {
      nome: "GIRARDINI SPA",
      rischio: "MEDIO",
      segnale: "aggressivo fuori scala",
      gareVinte: 2,
      mediaRibassi: "43,3%",
      cig: [
        { id: "9245656CAF", ribasso: "45,4%" },
        { id: "922220437E", ribasso: "41,3%" }
      ]
    }
  ],

  documenti: [
    {
      nome: "Apri scheda ANAC",
      tipo: "link",
      url: "https://dati.anticorruzione.it/superset/dashboard/appalti/?cig=926757981F"
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

  finale: "GO: gara coerente con operativita e storico Impresit"
};