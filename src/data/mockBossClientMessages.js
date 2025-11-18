export const mockBossClientMessages = [
  // ===== RISTORANTE DA MARIO (clientId: 1) =====
  {
    id: 1,
    clientId: 1,
    from: "boss",
    fromName: "Luca Verdi",
    to: "client",
    toName: "Mario Rossi",
    message: "Buongiorno Mario! La campagna menù autunno è pronta per la tua review. Ti mando link tra poco.",
    timestamp: "2024-11-18T10:30:00"
  },
  {
    id: 2,
    clientId: 1,
    from: "client",
    fromName: "Mario Rossi",
    to: "boss",
    message: "Perfetto Luca! Attendo con ansia. Quando possiamo fare una call per discutere i dettagli?",
    timestamp: "2024-11-18T11:00:00"
  },
  {
    id: 3,
    clientId: 1,
    from: "boss",
    fromName: "Luca Verdi",
    to: "client",
    message: "Che ne dici di domani alle 15:00? Ti faccio vedere anche i dati della campagna prenotazioni.",
    timestamp: "2024-11-18T11:15:00"
  },
  {
    id: 4,
    clientId: 1,
    from: "boss",
    fromName: "Luca Verdi",
    to: "client",
    message: "Mario, ho visto che le prenotazioni weekend sono +40% rispetto a ottobre. Google Ads sta performando benissimo! 🎯",
    timestamp: "2024-11-16T17:00:00"
  },

  // ===== STUDIO LEGALE ROSSI (clientId: 2) =====
  {
    id: 5,
    clientId: 2,
    from: "boss",
    fromName: "Luca Verdi",
    to: "client",
    toName: "Avv. Rossi",
    message: "Buongiorno Avvocato! Report mensile pronto. Traffico sito +22%, ottime performance SEO.",
    timestamp: "2024-11-18T09:00:00"
  },
  {
    id: 6,
    clientId: 2,
    from: "client",
    fromName: "Avv. Rossi",
    to: "boss",
    message: "Ottimo lavoro! Possiamo parlare di aumentare la frequenza articoli? Voglio spingere di più.",
    timestamp: "2024-11-18T09:30:00"
  },
  {
    id: 7,
    clientId: 2,
    from: "boss",
    fromName: "Luca Verdi",
    to: "client",
    message: "Assolutamente! Vi preparo una proposta per 3 articoli/mese invece di 2. Vi mando entro domani.",
    timestamp: "2024-11-18T10:00:00"
  },

  // ===== PARRUCCHIERE GLAMOUR (clientId: 3) =====
  {
    id: 8,
    clientId: 3,
    from: "boss",
    fromName: "Luca Verdi",
    to: "client",
    toName: "Giulia",
    message: "Ciao Giulia! Le stories stanno andando benissimo. Engagement medio +35% questa settimana.",
    timestamp: "2024-11-17T18:00:00"
  },
  {
    id: 9,
    clientId: 3,
    from: "client",
    fromName: "Giulia",
    to: "boss",
    message: "Sono felicissima! Molte clienti mi dicono che vedono sempre i vostri post. Grazie! 💕",
    timestamp: "2024-11-17T18:30:00"
  },

  // ===== IDRAULICO EXPRESS (clientId: 4) =====
  {
    id: 10,
    clientId: 4,
    from: "boss",
    fromName: "Luca Verdi",
    to: "client",
    toName: "Giuseppe",
    message: "Giuseppe, landing page emergenze 24h è online! Ti mando il link. Ottimizzata per conversioni.",
    timestamp: "2024-11-18T09:00:00"
  },
  {
    id: 11,
    clientId: 4,
    from: "client",
    fromName: "Giuseppe",
    to: "boss",
    message: "Perfetto! La guardo subito. Per il meeting di venerdì sono confermato ore 11.",
    timestamp: "2024-11-18T09:30:00"
  },
  {
    id: 12,
    clientId: 4,
    from: "boss",
    fromName: "Luca Verdi",
    to: "client",
    message: "Grande notizia: costo per click Google Ads sceso del 35%! Vi presento i numeri venerdì.",
    timestamp: "2024-11-18T13:00:00"
  },

  // ===== PALESTRA FITZONE (clientId: 5) =====
  {
    id: 13,
    clientId: 5,
    from: "boss",
    fromName: "Luca Verdi",
    to: "client",
    toName: "Andrea",
    message: "Andrea, piano editoriale dicembre completato. Focus su iscrizioni gennaio. Posso presentarlo martedì?",
    timestamp: "2024-11-17T15:00:00"
  },
  {
    id: 14,
    clientId: 5,
    from: "client",
    fromName: "Andrea",
    to: "boss",
    message: "Perfetto! Martedì ore 16 va bene. Porta anche preview campagna Meta Ads.",
    timestamp: "2024-11-17T15:30:00"
  },

  // ===== LUXOR FASHION GROUP (clientId: 11) =====
  {
    id: 15,
    clientId: 11,
    from: "boss",
    fromName: "Luca Verdi",
    to: "client",
    toName: "Dott.ssa Martini",
    message: "Buongiorno Dottoressa! Banner e-commerce in staging. Quando può fare review? Serve approvazione urgente.",
    timestamp: "2024-11-18T10:00:00"
  },
  {
    id: 16,
    clientId: 11,
    from: "client",
    fromName: "Dott.ssa Martini",
    to: "boss",
    message: "Li guardo oggi pomeriggio. Ho alcune modifiche da proporre sui colori.",
    timestamp: "2024-11-18T11:00:00"
  },
  {
    id: 17,
    clientId: 11,
    from: "boss",
    fromName: "Luca Verdi",
    to: "client",
    message: "Strategia influencer: abbiamo 3 profili interessati (150k-300k followers). Le mando portfolio domani.",
    timestamp: "2024-11-17T16:00:00"
  },

  // ===== TECHVISION SOFTWARE (clientId: 12) =====
  {
    id: 18,
    clientId: 12,
    from: "boss",
    fromName: "Luca Verdi",
    to: "client",
    toName: "Ing. Ferrara",
    message: "Ingegnere, LinkedIn Ads sta superando ogni aspettativa! CTR 4.2%, lead cost €35. Ottimi numeri.",
    timestamp: "2024-11-18T14:00:00"
  },
  {
    id: 19,
    clientId: 12,
    from: "client",
    fromName: "Ing. Ferrara",
    to: "boss",
    message: "Eccellente! Vogliamo raddoppiare budget da gennaio. Preparate proposta ampliata.",
    timestamp: "2024-11-18T14:30:00"
  },

  // ===== GRUPPO ALBERGHIERO RIVIERA (clientId: 13) =====
  {
    id: 20,
    clientId: 13,
    from: "boss",
    fromName: "Luca Verdi",
    to: "client",
    toName: "Dott. Bianchi",
    message: "Dottore, confermo meeting martedì ore 10. Presenteremo report completo Q4 e strategia 2025.",
    timestamp: "2024-11-17T17:00:00"
  },
  {
    id: 21,
    clientId: 13,
    from: "client",
    fromName: "Dott. Bianchi",
    to: "boss",
    message: "Perfetto Luca. Sarò presente con il direttore marketing. Vogliamo discutere anche espansione.",
    timestamp: "2024-11-17T17:30:00"
  },
  {
    id: 22,
    clientId: 13,
    from: "boss",
    fromName: "Luca Verdi",
    to: "client",
    message: "Website unificato: sviluppo al 50%. On track per consegna febbraio come concordato.",
    timestamp: "2024-11-16T11:00:00"
  }
];
