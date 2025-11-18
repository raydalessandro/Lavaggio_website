export const mockBossTeamMessages = [
  // ===== MESSAGGI GLOBALI (clientId: null) =====
  {
    id: 1,
    clientId: null,
    from: "boss",
    fromName: "Luca Verdi",
    to: "team",
    message: "Team, meeting review progetti domani ore 10:00 in sala riunioni. Portate update su tutti i clienti attivi.",
    timestamp: "2024-11-17T16:30:00"
  },
  {
    id: 2,
    clientId: null,
    from: "boss",
    fromName: "Luca Verdi",
    to: "team",
    message: "Ottimo lavoro questa settimana! Revenue in crescita del 12%. Continuiamo così 💪",
    timestamp: "2024-11-15T18:00:00"
  },
  {
    id: 3,
    clientId: null,
    from: "boss",
    fromName: "Luca Verdi",
    to: "team",
    message: "Reminder: chiusura timesheet entro venerdì. Serve per fatturazione clienti.",
    timestamp: "2024-11-13T09:15:00"
  },

  // ===== RISTORANTE DA MARIO (clientId: 1) =====
  {
    id: 4,
    clientId: 1,
    from: "boss",
    fromName: "Luca Verdi",
    to: "team",
    message: "Maria e Alessio, il cliente vuole vedere bozza campagna autunno entro domani. Priorità massima.",
    timestamp: "2024-11-18T09:00:00"
  },
  {
    id: 5,
    clientId: 1,
    from: "team",
    fromName: "Maria Bianchi",
    to: "boss",
    message: "Luca, copy completato. Alessio sta finendo la grafica, pronti per le 17.",
    timestamp: "2024-11-18T11:30:00"
  },
  {
    id: 6,
    clientId: 1,
    from: "boss",
    fromName: "Luca Verdi",
    to: "team",
    message: "Perfetto! Appena pronto mandatemelo, lo review e invio al cliente.",
    timestamp: "2024-11-18T11:45:00"
  },
  {
    id: 7,
    clientId: 1,
    from: "boss",
    fromName: "Luca Verdi",
    to: "team",
    message: "Google Ads: budget aumentato a €2.800/mese da dicembre. Luca V., aggiorna campagna.",
    timestamp: "2024-11-16T14:20:00"
  },

  // ===== STUDIO LEGALE ROSSI (clientId: 2) =====
  {
    id: 8,
    clientId: 2,
    from: "boss",
    fromName: "Luca Verdi",
    to: "team",
    message: "Sara, ottimo report analytics! Il cliente è molto soddisfatto della crescita traffico.",
    timestamp: "2024-11-18T10:00:00"
  },
  {
    id: 9,
    clientId: 2,
    from: "team",
    fromName: "Sara Rossi",
    to: "boss",
    message: "Grazie! Propongo di aumentare frequenza articoli blog da 2 a 3 al mese per scalare risultati.",
    timestamp: "2024-11-18T10:30:00"
  },
  {
    id: 10,
    clientId: 2,
    from: "boss",
    fromName: "Luca Verdi",
    to: "team",
    message: "Buona idea. Prepara proposta con costi e timeline, la presento al cliente settimana prossima.",
    timestamp: "2024-11-18T11:00:00"
  },
  {
    id: 11,
    clientId: 2,
    from: "boss",
    fromName: "Luca Verdi",
    to: "team",
    message: "Marco, il cliente chiede case study su un loro caso di successo. Puoi intervistare e scrivere?",
    timestamp: "2024-11-15T15:00:00"
  },

  // ===== IDRAULICO EXPRESS (clientId: 4) =====
  {
    id: 12,
    clientId: 4,
    from: "boss",
    fromName: "Luca Verdi",
    to: "team",
    message: "Alessio, landing page emergenze approvata! Go live oggi. Ottimo lavoro.",
    timestamp: "2024-11-18T08:30:00"
  },
  {
    id: 13,
    clientId: 4,
    from: "team",
    fromName: "Luca Verdi",
    to: "boss",
    message: "Boss, Google Ads: CPC sceso del 35%! ROI in netto miglioramento.",
    timestamp: "2024-11-18T12:00:00"
  },
  {
    id: 14,
    clientId: 4,
    from: "boss",
    fromName: "Luca Verdi",
    to: "team",
    message: "Eccellente! Prepara slide con metriche per meeting con cliente venerdì.",
    timestamp: "2024-11-18T12:30:00"
  },

  // ===== PALESTRA FITZONE (clientId: 5) =====
  {
    id: 15,
    clientId: 5,
    from: "boss",
    fromName: "Luca Verdi",
    to: "team",
    message: "Team FitZone: cliente vuole spingere su campagna iscrizioni gennaio. Budget confermato €4.000.",
    timestamp: "2024-11-17T10:00:00"
  },
  {
    id: 16,
    clientId: 5,
    from: "team",
    fromName: "Maria Bianchi",
    to: "boss",
    message: "Piano editoriale dicembre pronto. Focus su 'buoni propositi 2025'. Posso presentarlo al cliente?",
    timestamp: "2024-11-17T14:00:00"
  },
  {
    id: 17,
    clientId: 5,
    from: "boss",
    fromName: "Luca Verdi",
    to: "team",
    message: "Sì, mandamelo prima. Review veloce e poi vai pure.",
    timestamp: "2024-11-17T14:30:00"
  },

  // ===== LUXOR FASHION GROUP (clientId: 11) =====
  {
    id: 18,
    clientId: 11,
    from: "boss",
    fromName: "Luca Verdi",
    to: "team",
    message: "Cliente enterprise: massima priorità. Deadline non negoziabili. Qualsiasi problema, escalate subito a me.",
    timestamp: "2024-11-16T09:00:00"
  },
  {
    id: 19,
    clientId: 11,
    from: "team",
    fromName: "Maria Bianchi",
    to: "boss",
    message: "Luca, 3 influencer hanno risposto positivamente. Budget range 2-5k per ognuno. Procedo con negoziazione?",
    timestamp: "2024-11-17T11:00:00"
  },
  {
    id: 20,
    clientId: 11,
    from: "boss",
    fromName: "Luca Verdi",
    to: "team",
    message: "Ottimo lavoro! Sì, procedi. Tieni budget max €4k cadauno. Mandami profili prima di firmare.",
    timestamp: "2024-11-17T11:30:00"
  },
  {
    id: 21,
    clientId: 11,
    from: "team",
    fromName: "Alessio Tech",
    to: "boss",
    message: "Banner e-commerce in staging. Cliente ha chiesto modifica colori. Serve approvazione urgente.",
    timestamp: "2024-11-18T13:00:00"
  },
  {
    id: 22,
    clientId: 11,
    from: "boss",
    fromName: "Luca Verdi",
    to: "team",
    message: "Visto. I colori originali erano meglio. Spiego io al cliente perché, tu non modificare ancora.",
    timestamp: "2024-11-18T13:30:00"
  },

  // ===== TECHVISION SOFTWARE (clientId: 12) =====
  {
    id: 23,
    clientId: 12,
    from: "boss",
    fromName: "Luca Verdi",
    to: "team",
    message: "Cliente tech molto soddisfatto di LinkedIn Ads. Vogliono raddoppiare budget da gennaio.",
    timestamp: "2024-11-18T14:00:00"
  },
  {
    id: 24,
    clientId: 12,
    from: "team",
    fromName: "Luca Verdi",
    to: "boss",
    message: "Perfetto! Con budget doppio possiamo testare anche campagne video. Preparo proposta.",
    timestamp: "2024-11-18T14:30:00"
  },

  // ===== GRUPPO ALBERGHIERO RIVIERA (clientId: 13) =====
  {
    id: 25,
    clientId: 13,
    from: "boss",
    fromName: "Luca Verdi",
    to: "team",
    message: "Cliente top spender (€15k/mese). Voglio report settimanale su tutte le attività. Marco, coordini tu.",
    timestamp: "2024-11-15T10:00:00"
  },
  {
    id: 26,
    clientId: 13,
    from: "team",
    fromName: "Marco Neri",
    to: "boss",
    message: "Ok! Primo report venerdì. Include: booking ads, social, email marketing, website progress.",
    timestamp: "2024-11-15T11:00:00"
  },
  {
    id: 27,
    clientId: 13,
    from: "boss",
    fromName: "Luca Verdi",
    to: "team",
    message: "Team Riviera: meeting con cliente martedì prossimo. Preparare presentazione completa attività Q4.",
    timestamp: "2024-11-17T16:00:00"
  }
];
