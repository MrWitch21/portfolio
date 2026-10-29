# Gyönge Máté – portfólió

React 19 + TypeScript + Vite, Tailwind CSS v4, Motion, lucide-react.

## Indítás

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # éles build a dist/ mappába
```

## Tartalom szerkesztése

Minden szöveg a `src/data/content.ts` fájlban van, kétnyelvűen (`hu` / `en`).
Komponenshez nem kell nyúlni, ha csak tartalmat cserélsz.

- **profile** – név, headline, „rólam”, linkek, `openToWork` kapcsoló
- **projects** – `featured: true` a kiemelt nagy blokk, a többi listában jelenik meg.
  `status`: `'live'` (kész), `'building'` (most épül), `'archived'`
- **skills** – csoportosított tech stack
- **experience** – munkahelyek, legújabb elöl (**TODO: töltsd ki a LinkedIn alapján**)
- **cv** – tedd a CV-t `public/cv.pdf` néven, vagy töröld a sort

## Felépítés

```
src/
  data/content.ts        ← itt szerkeszted a tartalmat
  lib/prefs.tsx          ← nyelv (HU/EN) és téma (világos/sötét), localStorage-ben megjegyezve
  components/
    Nav.tsx  Hero.tsx  RouteTrace.tsx  Work.tsx  About.tsx  Experience.tsx  Contact.tsx
  index.css              ← színek (CSS változók), betűtípusok
```

A hero animáció (`RouteTrace.tsx`) egy stilizált Balaton-kör GPS-nyommal, az
UltraBalaton Tracker élő térképére utalva. `prefers-reduced-motion` esetén statikus.

## Deploy

**Vercel** (ajánlott): importáld a repót, a Vite presetet magától felismeri.
**Netlify**: build `npm run build`, publish könyvtár `dist`.
**GitHub Pages**: `vite.config.ts`-ben állítsd be a `base: '/<repo-név>/'` értéket.
