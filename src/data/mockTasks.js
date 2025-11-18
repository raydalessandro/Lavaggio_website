export const mockTasks = [
  // ===== RISTORANTE DA MARIO (clientId: 1) =====
  {
    id: 1,
    clientId: 1,
    title: "Copywriting post Instagram menù autunno",
    description: "Scrivere copy per 3 post carousel + 5 stories su nuovo menù stagionale",
    type: "content",
    status: "in-progress",
    priority: "high",
    assignedTo: "Maria Bianchi",
    dueDate: "2024-11-18T18:00:00",
    createdAt: "2024-11-15T10:00:00"
  },
  {
    id: 2,
    clientId: 1,
    title: "Design grafica menù autunno",
    description: "Creare template Instagram per menù stagionale",
    type: "design",
    status: "review",
    priority: "high",
    assignedTo: "Alessio Tech",
    dueDate: "2024-11-19T12:00:00",
    createdAt: "2024-11-14T09:00:00"
  },
  {
    id: 3,
    clientId: 1,
    title: "Setup Google Ads campagna prenotazioni",
    description: "Configurare campagna search per prenotazioni weekend",
    type: "ads",
    status: "todo",
    priority: "medium",
    assignedTo: "Luca Verdi",
    dueDate: "2024-11-22T10:00:00",
    createdAt: "2024-11-16T14:00:00"
  },

  // ===== STUDIO LEGALE ROSSI (clientId: 2) =====
  {
    id: 4,
    clientId: 2,
    title: "Articolo blog: Diritto del lavoro 2024",
    description: "Scrivere articolo SEO-optimized 1500 parole",
    type: "content",
    status: "in-progress",
    priority: "medium",
    assignedTo: "Marco Neri",
    dueDate: "2024-11-20T17:00:00",
    createdAt: "2024-11-12T11:00:00"
  },
  {
    id: 5,
    clientId: 2,
    title: "Ottimizzazione SEO homepage",
    description: "Meta tags, schema markup, internal linking",
    type: "seo",
    status: "review",
    priority: "low",
    assignedTo: "Sara Rossi",
    dueDate: "2024-11-21T15:00:00",
    createdAt: "2024-11-10T08:00:00"
  },
  {
    id: 6,
    clientId: 2,
    title: "Report mensile performance sito",
    description: "Analytics report ottobre: traffico, conversioni, bounce rate",
    type: "content",
    status: "done",
    priority: "medium",
    assignedTo: "Sara Rossi",
    dueDate: "2024-11-15T10:00:00",
    createdAt: "2024-11-01T09:00:00"
  },

  // ===== PARRUCCHIERE GLAMOUR (clientId: 3) =====
  {
    id: 7,
    clientId: 3,
    title: "Stories Instagram giornaliere (lun-ven)",
    description: "5 stories per settimana con servizi e promo",
    type: "content",
    status: "in-progress",
    priority: "high",
    assignedTo: "Maria Bianchi",
    dueDate: "2024-11-18T20:00:00",
    createdAt: "2024-11-18T08:00:00"
  },
  {
    id: 8,
    clientId: 3,
    title: "Fotografie nuovi trattamenti",
    description: "Shooting in salone per portfolio servizi",
    type: "design",
    status: "todo",
    priority: "medium",
    assignedTo: "Alessio Tech",
    dueDate: "2024-11-25T14:00:00",
    createdAt: "2024-11-17T10:00:00"
  },

  // ===== IDRAULICO EXPRESS (clientId: 4) =====
  {
    id: 9,
    clientId: 4,
    title: "Landing page servizio emergenze 24h",
    description: "Creare LP conversion-focused con form contatto",
    type: "web",
    status: "review",
    priority: "high",
    assignedTo: "Alessio Tech",
    dueDate: "2024-11-19T16:00:00",
    createdAt: "2024-11-13T11:00:00"
  },
  {
    id: 10,
    clientId: 4,
    title: "Ottimizzazione Google Ads emergenze",
    description: "Migliorare CTR e ridurre CPC campagna search",
    type: "ads",
    status: "in-progress",
    priority: "high",
    assignedTo: "Luca Verdi",
    dueDate: "2024-11-18T17:00:00",
    createdAt: "2024-11-16T09:00:00"
  },
  {
    id: 11,
    clientId: 4,
    title: "Risposta recensioni Google My Business",
    description: "Rispondere a 12 nuove recensioni",
    type: "content",
    status: "todo",
    priority: "low",
    assignedTo: "Maria Bianchi",
    dueDate: "2024-11-21T12:00:00",
    createdAt: "2024-11-17T15:00:00"
  },

  // ===== PALESTRA FITZONE (clientId: 5) =====
  {
    id: 12,
    clientId: 5,
    title: "Piano editoriale dicembre",
    description: "Calendario contenuti social per festività",
    type: "content",
    status: "in-progress",
    priority: "medium",
    assignedTo: "Maria Bianchi",
    dueDate: "2024-11-22T18:00:00",
    createdAt: "2024-11-15T14:00:00"
  },
  {
    id: 13,
    clientId: 5,
    title: "Video promo abbonamenti gennaio",
    description: "Creare video 30sec per campagna iscrizioni",
    type: "design",
    status: "todo",
    priority: "medium",
    assignedTo: "Alessio Tech",
    dueDate: "2024-11-28T16:00:00",
    createdAt: "2024-11-16T10:00:00"
  },
  {
    id: 14,
    clientId: 5,
    title: "Meta Ads campagna iscrizioni",
    description: "Setup campagna Facebook/Instagram per gennaio",
    type: "ads",
    status: "todo",
    priority: "high",
    assignedTo: "Luca Verdi",
    dueDate: "2024-11-23T11:00:00",
    createdAt: "2024-11-17T13:00:00"
  },

  // ===== LUXOR FASHION GROUP (clientId: 11) =====
  {
    id: 15,
    clientId: 11,
    title: "Strategia influencer marketing Q1 2025",
    description: "Identificare 10 influencer target e negoziare collaborazioni",
    type: "content",
    status: "in-progress",
    priority: "high",
    assignedTo: "Maria Bianchi",
    dueDate: "2024-11-25T17:00:00",
    createdAt: "2024-11-10T09:00:00"
  },
  {
    id: 16,
    clientId: 11,
    title: "Design banner e-commerce collezione primavera",
    description: "Homepage hero, category banners, product templates",
    type: "design",
    status: "review",
    priority: "high",
    assignedTo: "Alessio Tech",
    dueDate: "2024-11-20T15:00:00",
    createdAt: "2024-11-08T10:00:00"
  },
  {
    id: 17,
    clientId: 11,
    title: "Ottimizzazione campagna Google Shopping",
    description: "Ristrutturare feed prodotti e bid strategy",
    type: "ads",
    status: "in-progress",
    priority: "medium",
    assignedTo: "Luca Verdi",
    dueDate: "2024-11-24T12:00:00",
    createdAt: "2024-11-14T11:00:00"
  },

  // ===== TECHVISION SOFTWARE (clientId: 12) =====
  {
    id: 18,
    clientId: 12,
    title: "Case study cliente enterprise",
    description: "Scrivere case study con ROI e metriche per landing B2B",
    type: "content",
    status: "todo",
    priority: "medium",
    assignedTo: "Marco Neri",
    dueDate: "2024-11-26T16:00:00",
    createdAt: "2024-11-15T14:00:00"
  },
  {
    id: 19,
    clientId: 12,
    title: "LinkedIn Ads lead generation",
    description: "Setup campagna per download whitepaper",
    type: "ads",
    status: "in-progress",
    priority: "high",
    assignedTo: "Luca Verdi",
    dueDate: "2024-11-21T10:00:00",
    createdAt: "2024-11-13T09:00:00"
  },

  // ===== GRUPPO ALBERGHIERO RIVIERA (clientId: 13) =====
  {
    id: 20,
    clientId: 13,
    title: "Campagna email marketing stagione estiva",
    description: "Serie 5 email per early booking estate 2025",
    type: "content",
    status: "todo",
    priority: "low",
    assignedTo: "Marco Neri",
    dueDate: "2024-11-30T18:00:00",
    createdAt: "2024-11-16T15:00:00"
  }
];
