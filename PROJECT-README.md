# ATIB Portfolio - Complete Project Guide
## Har File Ki Explanation - Step by Step

---

## Project Structure (Folder Tree)

```
ATIB-COMPLETE-SOURCE-CODE/
├── index.html                  # Website ka main entry point
├── package.json                # Dependencies list
├── vite.config.ts              # Build tool configuration
├── tailwind.config.js          # CSS styling configuration
├── tsconfig.json               # TypeScript rules
├── components.json             # shadcn/ui components config
├── public/                     # Static files (images, documents)
│   ├── images/                 # All photos
│   │   ├── atib-portrait.jpg   # Aapki profile photo
│   │   ├── hero-bg-hd.jpg     # Hero section background
│   │   ├── wechat-qr.png      # WeChat QR code
│   │   ├── about-1.jpg        # Achievement photos
│   │   ├── about-2.jpg
│   │   ├── about-3.jpg
│   │   ├── about-4.jpg
│   │   ├── portfolio-1.jpg    # Project photos
│   │   ├── portfolio-2.jpg
│   │   ├── portfolio-3.jpg
│   │   ├── portfolio-4.jpg
│   │   ├── portfolio-5.jpg
│   │   ├── service-1.jpg      # PLC experiment photos
│   │   ├── service-2.jpg
│   │   ├── service-3.jpg
│   │   ├── service-4.jpg
│   │   └── cta-bg.jpg
│   └── documents/              # Downloadable PDFs
│       ├── cv.pdf             # Aapki CV
│       ├── bsc-transcript.pdf # Bachelor transcript
│       └── msc-transcript.pdf # Master transcript
├── src/                        # SOURCE CODE - Yahan sab kuch hai
│   ├── main.tsx               # React app start hota hai yahan se
│   ├── App.tsx                # Routes define hain (Home + CV page)
│   ├── index.css              # Global CSS styles
│   ├── config.ts              # SARA DATA - text, content, projects
│   ├── lib/
│   │   └── utils.ts           # Helper functions
│   ├── contexts/
│   │   ├── LanguageContext.tsx # Language switch (EN/Chinese)
│   │   └── DarkModeContext.tsx # Dark mode toggle
│   ├── components/
│   │   ├── Navigation.tsx     # Top navbar with links
│   │   ├── PageOverlay.tsx    # Loading animation
│   │   ├── AnimatedButton.tsx # Styled buttons
│   │   └── ContactSidebar.tsx # Right side contact icons
│   ├── pages/
│   │   ├── Home.tsx           # Main page layout
│   │   └── CV.tsx             # CV page (/cv route)
│   ├── sections/              # HAR EK SECTION YAHAN HAI
│   │   ├── Hero.tsx           # Top section with big name + photo
│   │   ├── About.tsx          # About me section
│   │   ├── WorkExperience.tsx # Job experience (expandable)
│   │   ├── Skills.tsx         # Skills grid (expandable)
│   │   ├── Achievements.tsx   # Awards carousel (auto-slide)
│   │   ├── Portfolio.tsx      # Projects with detail modals
│   │   ├── Publications.tsx   # Papers list (expandable)
│   │   ├── Education.tsx      # Degree info (expandable)
│   │   ├── Documents.tsx      # Transcripts download
│   │   ├── CTA.tsx            # Contact section (if used)
│   │   └── Footer.tsx         # Bottom footer
│   └── hooks/
│       ├── useScrollAnimation.ts  # Scroll effects
│       ├── useStaggerAnimation.ts # Staggered fade-in
│       └── usePageLoad.ts         # Page load animation
└── components/ui/              # shadcn/ui ready components
    ├── button.tsx
    ├── card.tsx
    └── ... (40+ components)
```

---

## Har File Ki Detail

### 1. index.html
**Kya hai:** Website ka main HTML file
**Kya karta hai:** Browser ko batata hai ke React app kahan se load hona hai
**Change karna ho to:** Title tag mein website ka naam change karein

### 2. src/main.tsx
**Kya hai:** React application ka starting point
**Kya karta hai:**
- Language provider setup (Chinese/English)
- Dark mode provider setup
- Router setup
- App component render karta hai

### 3. src/App.tsx
**Kya hai:** Routes define karta hai
**Kya karta hai:**
- `/` → Home page dikhata hai
- `/#/cv` → CV page dikhata hai

### 4. src/config.ts (SAB SE IMPORTANT FILE)
**Kya hai:** SARA website content/data isi file mein hai
**Kya karta hai:**
- Personal info (name, email, phone, WeChat, ResearchGate)
- Hero section text (tagline, roles, badges)
- Work experience entries
- Skills categories
- Achievements/Awards (8 items with images)
- Projects (5 main projects + 8 PLC experiments = 13 total)
- Publications (IFAC papers)
- Education (CTGU + BUAA)
- Documents (CV, transcripts, certificates)
- Navigation links
- Footer content
**Change karna ho to:** Text, dates, descriptions sab yahan se change karein

### 5. src/contexts/LanguageContext.tsx
**Kya hai:** Language switching system
**Kya karta hai:** EN/Chinese toggle control karta hai
**Default:** Chinese

### 6. src/contexts/DarkModeContext.tsx
**Kya hai:** Dark/Light mode system
**Kya karta hai:** Dark mode toggle + localStorage mein save karta hai

### 7. src/components/Navigation.tsx
**Kya hai:** Top navbar
**Features:**
- Scroll pe background color change
- Language buttons (EN/中文)
- Dark mode toggle button (☀️/🌙)
- Hamburger menu (mobile)
- Smooth scroll navigation

### 8. src/components/ContactSidebar.tsx
**Kya hai:** Right side floating contact icons
**Features:**
- WeChat button → QR code popup
- Gmail button
- ResearchGate button
- Phone button

### 9. src/sections/Hero.tsx
**Kya hai:** First section - Big name + portrait
**Features:**
- Mouse-tracking image reveal (desktop)
- Portrait photo with blue glow
- Floating emojis (🎓⚙️🔬💡🤖⚡)
- "ATIB" large text
- Badges + contact info

### 10. src/sections/About.tsx
**Kya hai:** About me section
**Layout:** Left text + Right image
**Features:** Quick stats badges

### 11. src/sections/WorkExperience.tsx
**Kya hai:** Job history (expandable cards)
**Features:**
- Click to expand/collapse
- Job title, company, period, location
- Achievements list inside

### 12. src/sections/Skills.tsx
**Kya hai:** Expertise categories (expandable)
**Categories:** Control Systems, Automation, Software, AI/ML
**Feature:** Click to expand and see individual skills

### 13. src/sections/Achievements.tsx
**Kya hai:** Awards carousel
**Features:**
- Single row, one image at a time
- Auto-slides every 5 seconds
- Left/right arrows
- Touch swipe support
- 8 dot indicators
- Detail text below image

### 14. src/sections/Portfolio.tsx (PROJECTS)
**Kya hai:** All projects with detail modals
**Structure per project:**
- Introduction (problem statement)
- Objective (what was aimed)
- Result (key achievement)
- Outcome (impact + numbers)
**Feature:** Click card → popup modal with full details

### 15. src/sections/Publications.tsx
**Kya hai:** Research papers list
**Feature:** Click to expand → shows authors, details, keywords, link button

### 16. src/sections/Education.tsx
**Kya hai:** Degree info (expandable)
**Shows:** CTGU Bachelor + BUAA Master
**Feature:** Click to expand → thesis title + details

### 17. src/sections/Documents.tsx
**Kya hai:** Download section for transcripts/certificates
**Items:** CV, BSc transcript, MSc transcript, IFAC papers, certificates
**Feature:** Click to expand → download button

### 18. src/sections/Footer.tsx
**Kya hai:** Bottom footer
**Shows:** Name, email, social links, copyright

---

## How to Run This Project

### Step 1: Install Node.js
Download from: https://nodejs.org (LTS version)

### Step 2: Install Dependencies
```bash
cd ATIB-COMPLETE-SOURCE-CODE
npm install
```

### Step 3: Run Development Server
```bash
npm run dev
```
Open browser: http://localhost:5173

### Step 4: Build for Production
```bash
npm run build
```
Output will be in `dist/` folder

---

## Common Changes Guide

### Change Name or Text
Edit `src/config.ts` - sab content yahan hai

### Add New Project
Edit `src/config.ts` → find `portfolioConfig` → add new object in `projects` array

### Change Photo
Replace file in `public/images/` with same name

### Add New Award
Edit `src/config.ts` → find `achievementsConfig` → add item in `items` array

### Change Color Theme
Edit `tailwind.config.js` → find color values

### Add/Remove Section
Edit `src/pages/Home.tsx` → add/remove section import + component

---

## Tech Stack
- React 19 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- shadcn/ui (components)
- Lucide React (icons)
