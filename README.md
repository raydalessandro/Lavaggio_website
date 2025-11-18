# 🚗 Mister Lavaggio - Website Rebuild

Rebuild completo del sito Mister Lavaggio con focus su **performance**, **UX** e **manutenibilità**.

---

## 📋 INDICE

- [Obiettivo](#obiettivo)
- [Stack Tecnologico](#stack-tecnologico)
- [Metriche Performance](#metriche-performance)
- [Struttura Progetto](#struttura-progetto)
- [Design System](#design-system)
- [Pagine & Stato](#pagine--stato)
- [Setup Locale](#setup-locale)
- [Deployment](#deployment)
- [Roadmap](#roadmap)

---

## 🎯 OBIETTIVO

**Ricostruire il sito https://www.misterlavaggio.com con:**

- ✅ Performance 10x migliori (da PageSpeed 34 → 90+)
- ✅ Contenuti e brand identity identici
- ✅ UI modernizzata ma riconoscibile
- ✅ Codice pulito, modulare, manutenibile
- ✅ Zero dipendenze inutili

**NON è un redesign. È un rebuild tecnico.**

---

## 🛠 STACK TECNOLOGICO

### Core
- **React 18** - UI framework
- **Vite** - Build tool (velocissimo)
- **React Router 6** - Routing
- **Tailwind CSS** - Styling

### Form & Email
- **React Hook Form** - Form validation
- **EmailJS** - Invio email (form contatti, prenotazioni)

### Hosting & Deploy
- **Vercel** - Hosting (free tier)
- **GitHub** - Version control

### Performance
- **WebP/AVIF** - Immagini ottimizzate
- **Lazy loading** - Code splitting automatico
- **Tree shaking** - Solo codice usato nel bundle

---

## 📊 METRICHE PERFORMANCE

### Target Obiettivo

| Metrica | Sito Attuale | Target Rebuild | Stato |
|---------|--------------|----------------|-------|
| **PageSpeed Mobile** | 34/100 🔴 | 90+/100 🟢 | 🚧 |
| **LCP** | 3.7s | <1.5s | 🚧 |
| **FCP** | 2.3s | <1.0s | 🚧 |
| **Bundle Size** | ~4.3MB | <650KB | 🚧 |

### Audit Attuale (Baseline)
Performance: 34/100
Accessibilità: 84/100
Best Practices: 100/100
SEO: 100/100
Core Web Vitals:
LCP: 3.7s (FAIL)
INP: 157ms (GOOD)
CLS: 0.01 (GOOD)
Problemi identificati:
Immagini non ottimizzate (~3MB)
CSS/JS bundle pesanti (~800KB+)
Render-blocking resources
No lazy loading
---

## 📁 STRUTTURA PROGETTO
mister-lavaggio/
├── public/
│   ├── images/              # Immagini ottimizzate (WebP/AVIF)
│   └── fonts/               # Font web ottimizzati
├── src/
│   ├── components/
│   │   ├── layout/          # Header, Footer, Layout
│   │   ├── ui/              # Button, Card, Container (reusable)
│   │   ├── sections/        # Hero, ServicesGrid, Testimonials
│   │   └── forms/           # ContactForm, BookingForm
│   ├── pages/               # Route pages
│   │   ├── Home.jsx
│   │   ├── Servizi.jsx
│   │   ├── Aziende.jsx
│   │   ├── PrenotaOra.jsx
│   │   ├── ChiSiamo.jsx
│   │   ├── News.jsx
│   │   └── LavoraConNoi.jsx
│   ├── data/                # JSON statici (servizi, news, etc)
│   ├── utils/               # Helper functions (emailService, etc)
│   ├── styles/              # Global CSS
│   ├── App.jsx              # Router setup
│   └── main.jsx             # Entry point
├── .env.example             # Environment variables template
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
---

## 🎨 DESIGN SYSTEM

### Colori Brand

> 🔍 **TODO**: Estrarre colori esatti dal sito attuale

```js
// Palette preliminare (da verificare)
colors: {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',  // Blu principale
    600: '#2563eb',
    700: '#1d4ed8',
  },
  secondary: {...},
  accent: {...}
}
Tipografia
🔍 TODO: Identificare font esatti usati
Heading: [Font da estrarre]
Body: [Font da estrarre]
Componenti UI Base
Tutti i componenti base sono in src/components/ui/:
Button
<Button variant="primary" size="lg">
  Prenota Ora
</Button>

// Variants: primary | secondary | outline
// Sizes: sm | md | lg
Card
<Card hover={true}>
  {/* Contenuto */}
</Card>
Container
<Container>
  {/* Contenuto centrato con padding responsive */}
</Container>
Spaziature
Sezioni: py-16 md:py-24 (64px → 96px)
Gap elementi: gap-6 md:gap-8 (24px → 32px)
Container padding: px-4 sm:px-6 lg:px-8
📄 PAGINE & STATO
Sitemap
/                    → Home
/servizi             → Servizi Lavaggio
/aziende             → Lavaggio Auto Aziende
/prenota             → Form Prenotazione
/chi-siamo           → Rivoluzione Lavaggio Auto
/news                → Blog/News
/lavora-con-noi      → Candidature Lavoro
Stato Completamento
Pagina
Analisi
UI
Form
Mobile
Deploy
Stato
Home
⬜
⬜
-
⬜
⬜
🚧 Non iniziata
Servizi
⬜
⬜
-
⬜
⬜
🚧 Non iniziata
Aziende
⬜
⬜
✅
⬜
⬜
🚧 Non iniziata
Prenota Ora
⬜
⬜
⬜
⬜
⬜
🚧 Non iniziata
Chi Siamo
⬜
⬜
-
⬜
⬜
🚧 Non iniziata
News
⬜
⬜
-
⬜
⬜
🚧 Non iniziata
Lavora Con Noi
⬜
⬜
✅
⬜
⬜
🚧 Non iniziata
Legenda:
✅ = Completato
🚧 = In lavorazione
⬜ = Da fare
❌ = Bloccato
🚀 SETUP LOCALE
Prerequisiti
Node.js >= 18.x
npm >= 9.x
Installazione
# Clone repo
git clone [URL_REPO]
cd mister-lavaggio

# Installa dipendenze
npm install

# Copia env variables
cp .env.example .env

# Configura EmailJS credentials in .env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
Comandi
# Dev server (http://localhost:5173)
npm run dev

# Build produzione
npm run build

# Preview build
npm run preview

# Lint
npm run lint
🌐 DEPLOYMENT
Vercel (Automatico)
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy production
vercel --prod
URL Temporaneo: https://mister-lavaggio-rebuild.vercel.app
Environment Variables (Vercel)
VITE_EMAILJS_SERVICE_ID=xxx
VITE_EMAILJS_TEMPLATE_ID=xxx
VITE_EMAILJS_PUBLIC_KEY=xxx
🗓 ROADMAP
Fase 1: Setup & Analisi ✅
[x] Analisi sito attuale
[x] Setup progetto base
[x] Configurazione Tailwind
[ ] Estrazione Design System completo
[ ] Componenti UI base (Button, Card, Container)
Fase 2: Layout & Navigation 🚧
[ ] Header responsive
[ ] Footer completo
[ ] Menu mobile
[ ] Layout wrapper
Fase 3: Homepage 🚧
[ ] Hero section
[ ] Come Funziona (3 step)
[ ] Griglia Servizi
[ ] Testimonials
[ ] CTA finale
[ ] Test responsive
Fase 4: Pagine Servizi & Aziende ⬜
[ ] Pagina Servizi
[ ] Pagina Aziende
[ ] Form contatto funzionante
Fase 5: Prenotazione & Form ⬜
[ ] Pagina Prenota Ora
[ ] Form prenotazione completo
[ ] Integrazione EmailJS
[ ] Validazione avanzata
Fase 6: Pagine Secondarie ⬜
[ ] Chi Siamo
[ ] News/Blog
[ ] Lavora Con Noi
Fase 7: Ottimizzazioni ⬜
[ ] Lazy loading immagini
[ ] Code splitting
[ ] Ottimizzazione font
[ ] Cache headers
Fase 8: Testing & Deploy ⬜
[ ] Test cross-browser
[ ] Test mobile devices
[ ] PageSpeed audit
[ ] Deploy production
[ ] Documentazione comparativa
📝 CONVENZIONI CODICE
Naming
// Components: PascalCase
export default function ServiceCard() {}

// Files: match component name
ServiceCard.jsx

// Props: camelCase
<Button variant="primary" size="lg" />

// CSS classes: Tailwind utility-first
className="px-4 py-2 bg-blue-600"
Struttura Componenti
// Import ordine:
// 1. React
// 2. Third-party
// 3. Local components
// 4. Utils
// 5. Assets

import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { sendEmail } from '../../utils/emailService';
import logo from '../../assets/logo.svg';

export default function ComponentName({ prop1, prop2 }) {
  // 1. Hooks
  const [state, setState] = useState(false);
  
  // 2. Handlers
  const handleClick = () => {};
  
  // 3. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
Commit Messages
feat: Add homepage hero section
fix: Mobile menu not closing on link click
refactor: Extract ServiceCard to separate component
style: Improve button hover states
docs: Update README roadmap
perf: Optimize image loading on homepage
🎯 OBIETTIVI FINALI
Al completamento, il sito rebuild dovrà:
✅ Performance: PageSpeed 90+ su mobile e desktop
✅ Contenuti: 100% identici al sito attuale
✅ Brand: Identity visiva preservata
✅ Funzionalità: Tutti i form funzionanti
✅ Responsive: Perfetto su tutti i device
✅ SEO: Ottimizzato (meta tags, structured data)
✅ Accessibilità: WCAG 2.1 AA compliance
✅ Manutenibilità: Codice pulito e documentato

📚 RISORSE
Documenti di Riferimento
Sito attuale
PageSpeed Insights audit
[Figma/Design mockup](se disponibile)
Link Utili
React Docs
Tailwind CSS
Vite Docs
EmailJS Setup
🔒 LICENSE
Proprietà di Mister Lavaggio. Tutti i diritti riservati.
Ultimo aggiornamento: 18 novembre 2025
Versione: 0.1.0 (Setup iniziale)
