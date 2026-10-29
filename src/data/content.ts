export type Lang = 'hu' | 'en'
export type T = Record<Lang, string>

export type ProjectStatus = 'live' | 'building' | 'archived'

export interface Project {
  slug: string
  name: string
  status: ProjectStatus
  year: string
  summary: T
  highlights?: T[]
  stack: string[]
  repo?: string
  demo?: string
  featured?: boolean
  visual?: 'balaton'
}

export interface Job {
  role: T
  company: string
  companyNote?: string
  period: T
  place: T
  description: T
  stack: string[]
}

export interface School {
  degree: T
  school: T
  period: T
  ongoing?: boolean
}

export interface Service {
  icon: 'website' | 'app' | 'care'
  title: T
  body: T
}

export interface Step {
  title: T
  body: T
}

export const profile = {
  name: 'Gyönge Máté',
  email: 'mategyonge@gmail.com',
  github: 'https://github.com/MrWitch21',
  linkedin: 'https://www.linkedin.com/in/m%C3%A1t%C3%A9-gy%C3%B6nge-72058b284/',
  cv: `${import.meta.env.BASE_URL}cv.pdf`,
  available: true,

  role: { hu: 'Szabadúszó full-stack fejlesztő', en: 'Freelance full-stack developer' } satisfies T,
  headline: {
    hu: 'Weboldalak, amikre számíthatsz.',
    en: 'Websites you can count on.',
  } satisfies T,
  intro: {
    hu: 'Full-stack fejlesztőként egyedi weboldalakat és webalkalmazásokat készítek vállalkozásoknak és magánszemélyeknek, a felülettől az adatbázisig. Gyors, mobilon is jól működő oldalak, megbeszélt határidőre, átlátható kommunikációval.',
    en: 'As a full-stack developer, I build custom websites and web apps for small businesses and individuals, from the interface down to the database. Fast sites that work well on any phone, delivered on the agreed date, with clear communication along the way.',
  } satisfies T,
  about: [
    {
      hu: 'Full-stack fejlesztő vagyok: főállásban gyártásirányítási rendszereket fejlesztek a Cloud Network Technology Kft.-nél (Foxconn), előtte bő egy évig az Audi Hungariánál voltam fejlesztő gyakornok. Az ELTE-n végeztem programtervező informatikusként, most a Széchenyi István Egyetemen járok mérnökinformatikus mesterszakra.',
      en: 'I’m a full-stack developer. My day job is building manufacturing execution systems at Cloud Network Technology Kft. (Foxconn), and before that I spent over a year as a developer intern at Audi Hungaria. I graduated in Computer Science from ELTE and I’m now doing a master’s in Computer Engineering at Széchenyi István University.',
    },
    {
      hu: 'Mellette weboldalakat és webalkalmazásokat készítek megbízásra. Egy kisvállalkozás oldalán ugyanolyan gondosan dolgozom, mint egy nagyvállalati rendszeren: átgondolt, tesztelt kód, tartott határidők, és mindig tudod, hol tart a munka.',
      en: 'Alongside that, I build websites and web apps for clients. A small business site gets the same care as an enterprise system: well-thought-out, tested code, deadlines that hold, and you always know where the work stands.',
    },
  ] satisfies T[],
}

export const quoteMail = (subject: string) => `mailto:${profile.email}?subject=${encodeURIComponent(subject)}`

export const services: Service[] = [
  {
    icon: 'website',
    title: { hu: 'Bemutatkozó weboldal', en: 'Business website' },
    body: {
      hu: 'Vállalkozásoknak, szolgáltatóknak, magánszemélyeknek. Egyedi megjelenés, mobilon is hibátlan, gyorsan betölt, és a keresők is könnyen megtalálják.',
      en: 'For small businesses, service providers and individuals. A custom design that looks right on phones, loads fast and is easy for search engines to find.',
    },
  },
  {
    icon: 'app',
    title: { hu: 'Egyedi webalkalmazás', en: 'Custom web app' },
    body: {
      hu: 'Ha egy sima weboldal kevés: foglalási rendszer, kalkulátor, ügyfélportál vagy admin felület, a te folyamataidra szabva.',
      en: 'When a plain website isn’t enough: booking systems, calculators, client portals or admin dashboards, built around how you work.',
    },
  },
  {
    icon: 'care',
    title: { hu: 'Karbantartás és fejlesztés', en: 'Maintenance and updates' },
    body: {
      hu: 'Meglévő oldal frissítése, hibajavítás, gyorsítás vagy új funkciók. A domain és a tárhely beállításában is segítek.',
      en: 'Updates, bug fixes, speed improvements or new features for an existing site. I can also help set up your domain and hosting.',
    },
  },
]

export const steps: Step[] = [
  {
    title: { hu: 'Egyeztetés', en: 'A first chat' },
    body: {
      hu: 'Átbeszéljük, mire van szükséged, kinek szól az oldal, és mit szeretnél elérni vele.',
      en: 'We talk through what you need, who the site is for and what you want it to achieve.',
    },
  },
  {
    title: { hu: 'Írásos ajánlat', en: 'Written quote' },
    body: {
      hu: 'Pontosan leírom, mit tartalmaz a munka, mennyibe kerül, és mikorra lesz kész.',
      en: 'I put in writing exactly what’s included, what it costs and when it will be ready.',
    },
  },
  {
    title: { hu: 'Fejlesztés', en: 'Build' },
    body: {
      hu: 'Egy előnézeti linken menet közben is látod, hogyan halad, és bármikor szólhatsz.',
      en: 'You can follow progress on a preview link and give feedback at any point.',
    },
  },
  {
    title: { hu: 'Átadás és támogatás', en: 'Launch and support' },
    body: {
      hu: 'Élesítem az oldalt, megmutatom, hogyan kezeld, és az indulás után is elérhető maradok.',
      en: 'I put the site live, show you how to manage it and stay available after launch.',
    },
  },
]

export const projects: Project[] = [
  {
    slug: 'katanaplo',
    name: 'Katanapló',
    status: 'live',
    year: '2026',
    featured: true,
    summary: {
      hu: 'Számlanyilvántartás és adókalkulátor kisadózóknak, a 2027-es új KATA szabályaival. Mutatja, mennyi fér még a bevételi keretbe, és mennyi adót okoz egy számla, még mielőtt kiállítod.',
      en: 'Invoice tracker and tax calculator for Hungarian KATA sole traders, including the proposed 2027 rules. Shows how much of the revenue cap is left and what an invoice will cost in tax before you issue it.',
    },
    highlights: [
      {
        hu: 'Évenként és sávonként verziózott szabálykészletek tiszta TypeScript domain rétegben, 22 unit teszttel (Vitest).',
        en: 'Tax rules versioned per year and regime in a pure TypeScript domain layer, covered by 22 unit tests (Vitest).',
      },
      {
        hu: 'Adóhatás-előnézet: ugyanaz a számítás fut a számlával és nélküle, így nem térhet el a fő logikától.',
        en: 'Tax impact preview: the same calculation runs with and without the invoice, so it can never drift from the main logic.',
      },
      {
        hu: 'Egykattintásos másolópanel a számlázó programhoz, Zod-validált mentés és CSV-export, GitHub Actions CI és Pages deploy.',
        en: 'One-click copy panel for invoicing software, Zod-validated backups and CSV export, GitHub Actions CI and Pages deploy.',
      },
    ],
    stack: ['React', 'TypeScript', 'Zustand', 'Zod', 'Vitest', 'Tailwind CSS'],
    repo: 'https://github.com/MrWitch21/kata_naplo',
    demo: 'https://mrwitch21.github.io/kata_naplo/',
  },
  {
    slug: 'ub-tracker',
    name: 'UltraBalaton Tracker',
    status: 'live',
    year: '2026',
    featured: true,
    visual: 'balaton',
    summary: {
      hu: 'Valós idejű követő a Balaton körüli váltófutáshoz. A futók telefonja GPS-pozíciót küld, a csapat és a nézők élőben látják a térképen, ki hol tart.',
      en: 'Real-time tracker for the relay race around Lake Balaton. Runners’ phones stream GPS positions, and the team and spectators follow everyone live on a map.',
    },
    highlights: [
      {
        hu: 'Saját backend nélkül: a böngésző közvetlenül Supabase Postgresbe ír, a jogosultságot sorszintű biztonság (RLS) és RPC-k kezelik.',
        en: 'No custom back end: the browser writes straight to Supabase Postgres, with row-level security and RPCs handling access.',
      },
      {
        hu: 'Három nézet egy kódbázisban: futó (GPS küldés), admin (PIN-nel védett) és TV-dashboard.',
        en: 'Three views in one codebase: runner (sends GPS), admin (PIN-protected) and a TV dashboard.',
      },
      {
        hu: 'Zárolt képernyős GPS-küldés megoldása GPSLogger token támogatással.',
        en: 'Solved locked-screen GPS reporting with GPSLogger token support.',
      },
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Supabase', 'PostgreSQL', 'Leaflet'],
    repo: 'https://github.com/MrWitch21/ub-tracker',
  },
  {
    slug: 'access-automation',
    name: 'Jogosultság-automatizáló',
    status: 'building',
    year: '2026',
    summary: {
      hu: 'Jogosultságkérések automatikus kiosztása: a jóváhagyott kérésekből egy PowerShell-szkript állítja be a hozzáféréseket, és mindent naplóz.',
      en: 'Automated access provisioning: a PowerShell script applies approved access requests and logs every change.',
    },
    stack: ['PowerShell', 'LDAP', 'Active Directory'],
  },
  {
    slug: 'aspnet-extensions',
    name: 'ASP.NET Core API Toolkit',
    status: 'live',
    year: '2023',
    summary: {
      hu: 'Újrahasznosítható kiegészítők ASP.NET Core Web API-khoz: nyelvi header Swaggerben, automatikus migráció, Excel import/export factory mintával.',
      en: 'Reusable add-ons for ASP.NET Core Web APIs: a language header in Swagger, automatic migrations and Excel import/export built on the factory pattern.',
    },
    stack: ['C#', 'ASP.NET Core', 'EF Core', 'Swagger'],
    repo: 'https://github.com/MrWitch21/ASP.Net-Core-web-API-custom-extension',
  },
]

export const skills: { group: T; items: string[] }[] = [
  {
    group: { hu: 'Frontend', en: 'Front end' },
    items: ['React', 'TypeScript', 'Ant Design', 'Tailwind CSS'],
  },
  {
    group: { hu: 'Backend és adat', en: 'Back end and data' },
    items: ['C#', 'ASP.NET Web API', '.NET Framework', 'Java', 'Node.js', 'Microsoft SQL Server', 'PostgreSQL'],
  },
  {
    group: { hu: 'Gyártás és integráció', en: 'Manufacturing and integration' },
    items: ['MES', 'SMT', 'ZPL címkenyomtatás', 'B2B integráció', 'BPMN', 'Keycloak', 'LDAP'],
  },
  {
    group: { hu: 'Munkamódszer és eszközök', en: 'Process and tooling' },
    items: ['Git', 'Azure DevOps', 'Scrum', 'xUnit', 'Power Apps', 'Supabase'],
  },
]

export const experience: Job[] = [
  {
    role: { hu: 'Junior szoftverfejlesztő', en: 'Junior software developer' },
    company: 'Cloud Network Technology Kft.',
    companyNote: 'Foxconn',
    period: { hu: '2025. júl. – jelenleg', en: 'Jul 2025 – present' },
    place: { hu: 'Komárom, hibrid', en: 'Komárom, hybrid' },
    description: {
      hu: 'Gyártásirányítási (MES) rendszerek fejlesztése SMT gyártósorokhoz. React és TypeScript felületek, C# és Java háttérszolgáltatások, MS SQL Server. Keycloak- és LDAP-alapú jogosultságkezelés, ZPL címkenyomtatás, B2B integrációk és BPMN folyamatmodellek.',
      en: 'Building manufacturing execution systems (MES) for SMT production lines. React and TypeScript front ends, C# and Java services, MS SQL Server. Keycloak and LDAP based access control, ZPL label printing, B2B integrations and BPMN process models.',
    },
    stack: ['React', 'TypeScript', 'C#', 'Java', 'MS SQL', 'Keycloak'],
  },
  {
    role: { hu: 'Szoftverfejlesztő gyakornok', en: 'Software developer intern' },
    company: 'AUDI HUNGARIA Zrt.',
    period: { hu: '2024. máj. – 2025. júl.', en: 'May 2024 – Jul 2025' },
    place: { hu: 'Győr, hibrid', en: 'Győr, hybrid' },
    description: {
      hu: 'Full-stack fejlesztés ASP.NET Web API és React alapokon, xUnit tesztekkel. Scrum csapatban, Azure DevOpsszal dolgoztam, és belső folyamatokat automatizáltam Microsoft Power Apps-szel.',
      en: 'Full-stack development with ASP.NET Web API and React, tested with xUnit. Worked in a Scrum team on Azure DevOps and automated internal processes with Microsoft Power Apps.',
    },
    stack: ['.NET', 'ASP.NET Web API', 'React', 'xUnit', 'Azure DevOps'],
  },
]

export const education: School[] = [
  {
    degree: { hu: 'Mérnökinformatikus MSc', en: 'MSc in Computer Engineering' },
    school: { hu: 'Széchenyi István Egyetem', en: 'Széchenyi István University' },
    period: { hu: '2025 – 2027', en: '2025 – 2027' },
    ongoing: true,
  },
  {
    degree: { hu: 'Programtervező informatikus BSc', en: 'BSc in Computer Science' },
    school: { hu: 'ELTE', en: 'Eötvös Loránd University' },
    period: { hu: '2022 – 2025', en: '2022 – 2025' },
  },
  {
    degree: { hu: 'Gimnázium', en: 'Secondary school' },
    school: { hu: 'Magyar Műhely ÁMK', en: 'Magyar Műhely ÁMK' },
    period: { hu: '2017 – 2022', en: '2017 – 2022' },
  },
]

export const ui = {
  nav: {
    services: { hu: 'Szolgáltatások', en: 'Services' },
    work: { hu: 'Munkák', en: 'Work' },
    about: { hu: 'Rólam', en: 'About' },
    contact: { hu: 'Kapcsolat', en: 'Contact' },
  },
  menu: { hu: 'Menü', en: 'Menu' },
  available: { hu: 'Új megbízásokat vállalok', en: 'Taking on new projects' },
  cta: { hu: 'Kérj ajánlatot', en: 'Get a quote' },
  mailSubject: { hu: 'Ajánlatkérés', en: 'Project enquiry' },
  seeWork: { hu: 'Munkáim', en: 'See my work' },
  servicesTitle: { hu: 'Amiben segíteni tudok', en: 'How I can help' },
  servicesLead: {
    hu: 'A fókuszom a weboldalakon van, de ha valami egyedibb kell, azt is megépítem.',
    en: 'Websites are my focus, but if you need something more custom, I can build that too.',
  },
  processTitle: { hu: 'Hogyan dolgozom', en: 'How I work' },
  processLead: {
    hu: 'Megbízhatóan, meglepetések nélkül: minden lépésnél tudod, mi történik.',
    en: 'Reliable and without surprises: you know what’s happening at every step.',
  },
  workTitle: { hu: 'Néhány munkám', en: 'Selected work' },
  status: {
    live: { hu: 'Kész', en: 'Shipped' },
    building: { hu: 'Most épül', en: 'In progress' },
    archived: { hu: 'Archív', en: 'Archived' },
  },
  code: { hu: 'Forráskód', en: 'Source' },
  demo: { hu: 'Élő demó', en: 'Live demo' },
  aboutTitle: { hu: 'Röviden rólam', en: 'A bit about me' },
  stackTitle: { hu: 'Amivel dolgozom', en: 'What I work with' },
  expTitle: { hu: 'Ahol dolgoztam', en: 'Where I’ve worked' },
  eduTitle: { hu: 'Tanulmányok', en: 'Education' },
  ongoing: { hu: 'folyamatban', en: 'in progress' },
  contactTitle: {
    hu: 'Van egy projekted? Beszéljük meg.',
    en: 'Have a project in mind? Let’s talk.',
  },
  contactBody: {
    hu: 'Írd meg pár mondatban, mire lenne szükséged. Általában egy napon belül válaszolok.',
    en: 'Tell me in a few sentences what you need. I usually reply within a day.',
  },
  copy: { hu: 'Cím másolása', en: 'Copy address' },
  copied: { hu: 'Kimásolva', en: 'Copied' },
  cv: { hu: 'Önéletrajz', en: 'Résumé' },
  trace: {
    hu: 'Így követik a nézők élőben a futókat',
    en: 'How spectators follow the runners live',
  },
  preview: {
    headline: { hu: 'A vállalkozásod, online.', en: 'Your business, online.' },
    desktop: { hu: 'Asztali', en: 'Desktop' },
    phone: { hu: 'Mobil', en: 'Phone' },
    caption: {
      hu: 'Minden oldal telefonra és nagy képernyőre is szabva.',
      en: 'Every site is built for phones and big screens alike.',
    },
    chips: {
      mobile: { hu: 'Mobilbarát', en: 'Mobile-friendly' },
      fast: { hu: 'Gyors betöltés', en: 'Fast loading' },
      seo: { hu: 'Keresőbarát', en: 'Search-friendly' },
    },
  },
  footer: { hu: 'React és TypeScript, kézzel építve.', en: 'Hand-built with React and TypeScript.' },
}
