/**
 * Minden szöveg itt van. Az oldal komponenseihez nem kell hozzányúlni,
 * ha csak tartalmat cserélsz.
 *
 * Minden szöveg kétnyelvű: { hu: '...', en: '...' }
 * A TODO-val jelölt részeket érdemes átnézni.
 */

export type Lang = 'hu' | 'en'
export type T = Record<Lang, string>

export type ProjectStatus = 'live' | 'building' | 'archived'

export interface Project {
  slug: string
  name: string
  status: ProjectStatus
  year: string
  summary: T
  /** Rövid pontok: mi volt a nehéz, mit oldottál meg */
  highlights?: T[]
  stack: string[]
  repo?: string
  demo?: string
  featured?: boolean
}

export interface Job {
  role: T
  company: string
  /** Ha a cég ismertebb néven fut (pl. anyavállalat) */
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

export const profile = {
  name: 'Gyönge Máté',
  firstName: 'Máté',
  location: { hu: 'Magyarország', en: 'Hungary' } satisfies T,
  // Ha nem akarod kiírni a gmailt, cseréld le pl. hello@sajatdomain.hu-ra
  email: 'mategyonge@gmail.com',
  github: 'https://github.com/MrWitch21',
  linkedin: 'https://www.linkedin.com/in/m%C3%A1t%C3%A9-gy%C3%B6nge-72058b284/',
  // Tedd a CV-t a public/ mappába cv.pdf néven, vagy töröld ezt a sort
  cv: '/cv.pdf',
  // Ha nem szeretnéd, hogy a jelenlegi munkahelyed lássa, állítsd false-ra
  openToWork: true,

  role: { hu: 'Full-stack fejlesztő', en: 'Full-stack developer' } satisfies T,
  headline: {
    hu: 'Gyártásirányítási rendszereket fejlesztek React, TypeScript és C# alapokon. Mellette olyan saját projekteket építek, amiket valaki tényleg használ.',
    en: 'I build manufacturing execution systems with React, TypeScript and C#. On the side, I build tools that people actually use.',
  } satisfies T,
  about: {
    hu: 'Junior fejlesztőként dolgozom a Cloud Network Technology Kft.-nél (Foxconn) Komáromban, előtte bő egy évig az Audi Hungariánál voltam fejlesztő gyakornok. Az ELTE-n végeztem programtervező informatikusként, most a Széchenyi István Egyetemen járok mérnökinformatikus mesterszakra. Szeretem, ha a kód nem csak a gépemen fut: a legtöbbet olyan projekteken tanultam, ahol valódi felhasználók és valódi határidők voltak. A GitHubom régebbi repói a tanulós időszakomat mutatják, az újabb munkáim lent vannak.',
    en: 'I work as a junior developer at Cloud Network Technology Kft. (Foxconn) in Komárom, and before that I spent over a year as a developer intern at Audi Hungaria. I graduated in Computer Science from ELTE and I am now doing a master’s in Computer Engineering at Széchenyi István University. I like code that runs somewhere other than my laptop: most of what I know came from projects with real users and real deadlines. The older repos on my GitHub are from when I was learning; my recent work is below.',
  } satisfies T,
}

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
    // ↓ Akkor működnek, ha a repót "katanaplo" néven töltöd fel, és bekapcsolod a GitHub Pagest
    repo: 'https://github.com/MrWitch21/katanaplo',
    demo: 'https://mrwitch21.github.io/katanaplo/',
  },
  {
    slug: 'ub-tracker',
    name: 'UltraBalaton Tracker',
    status: 'live',
    year: '2026',
    featured: true,
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
    // demo: 'https://...vercel.app',  ← tegyél ide egy demó linket
  },
  {
    slug: 'access-automation',
    name: 'Jogosultság-automatizáló',
    status: 'building',
    year: '2026',
    // TODO: pontosítsd, ha kész a lebutított változat
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

// A leírásokat a LinkedIn-en megadott skillekből írtam: nézd át, és pontosítsd, ha kell.
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
]

export const ui = {
  nav: {
    work: { hu: 'Munkák', en: 'Work' },
    about: { hu: 'Rólam', en: 'About' },
    experience: { hu: 'Tapasztalat', en: 'Experience' },
    contact: { hu: 'Kapcsolat', en: 'Contact' },
  },
  openToWork: { hu: 'Nyitott vagyok új lehetőségekre', en: 'Open to new roles' },
  cta: { hu: 'Írj nekem', en: 'Email me' },
  seeWork: { hu: 'Munkáim', en: 'See my work' },
  workTitle: { hu: 'Amin dolgoztam', en: 'Things I’ve built' },
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
    hu: 'Van egy projekted vagy egy nyitott pozíciód?',
    en: 'Got a project or an open role?',
  },
  contactBody: {
    hu: 'Írj egy e-mailt, általában egy napon belül válaszolok.',
    en: 'Send me an email. I usually reply within a day.',
  },
  copy: { hu: 'Cím másolása', en: 'Copy address' },
  copied: { hu: 'Kimásolva', en: 'Copied' },
  cv: { hu: 'Önéletrajz', en: 'Résumé' },
  trace: {
    hu: 'Élő pozíció, ahogy az UltraBalaton Trackerben',
    en: 'Live position, as in UltraBalaton Tracker',
  },
  footer: { hu: 'React és TypeScript, kézzel építve.', en: 'Hand-built with React and TypeScript.' },
}
