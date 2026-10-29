# Gyönge Máté – portfólió

Személyes portfólió és bemutatkozó oldal, magyar és angol nyelven, világos és sötét témával.

React 19, TypeScript, Vite, Tailwind CSS v4, Motion, lucide-react.

## Futtatás

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Felépítés

```
src/
  data/content.ts        szövegek és adatok (hu / en)
  lib/prefs.ts           nyelv és téma (context + hook)
  lib/PrefsProvider.tsx
  components/
    Nav.tsx  Hero.tsx  DeviceDemo.tsx  Services.tsx  Work.tsx  RouteTrace.tsx
    Process.tsx  About.tsx  Experience.tsx  Contact.tsx
  index.css              színek, betűtípusok, animációk
```

- `DeviceDemo.tsx` – minta-weboldal, ami asztali és mobil nézet között vált.
- `RouteTrace.tsx` – a Balaton partvonala egy GPS-nyommal Balatonfüredtől Keszthely felé.

Mindkét animáció statikus, ha a böngészőben be van kapcsolva a `prefers-reduced-motion`.
