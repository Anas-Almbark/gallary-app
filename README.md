# Sitr — Landing page

Responsive marketing site for **Sitr**, a private photo vault app. Built with React 19, TypeScript and Vite from the Figma file *Sitr — Landing Page* (mobile 390 and desktop 1440 frames).

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve dist/ locally
```

## Structure

```
src/
  content.ts            # every string on the page (copy, plans, FAQ, download meta)
  styles/tokens.css     # colours, fonts, radii, breakpoints as CSS variables
  styles/global.css     # reset, container, section header styles
  components/           # Button, Icon (inline SVG set)
  hooks/                # useScramble, useInterval, useReducedMotion
  sections/             # one folder-less file pair (tsx + css) per landing section
    Nav, Hero, PhoneDemo, Marquee, Features, Backup,
    HowItWorks, Pricing, FAQ, Download, Footer
```

## Breakpoints

| Width        | Layout                                                             |
| ------------ | ------------------------------------------------------------------ |
| < 768px      | Figma mobile frame: single column, 20px gutters                    |
| 768–1023px   | Tablet: two-column grids, three-up steps, trust row visible        |
| ≥ 1024px     | Figma desktop frame: nav links, two phones in hero, 4-column bento |
| ≥ 1440px     | 1200px container centred with 120px margins, as in the design      |

## Interactions implemented from the Figma annotations

- **Hero headline** scrambles in on load (`useScramble`).
- **Phone demo**: tap any 4 digits or the fingerprint key. The lock screen slides up and the vault tiles decrypt one by one; the last tile lags on purpose. The lock button in the vault re-locks it. On desktop a second phone behind shows the vault state.
- **Marquee** loops right-to-left over 30s and pauses on hover.
- **Live ciphertext** in the AES tile re-rolls every 160ms.
- **Upload flow** packets loop every 2.7s.
- **Compare slider**: drag the handle (pointer or keyboard arrows) to reveal "what you see" vs "what the cloud sees".
- **Coupon box** validates demo codes `SITR10` and `WELCOME20` and updates both plan prices.
- **FAQ** accordion, first item open by default.
- **QR tiles** are generated placeholders with a sweeping scan line. Replace `qrMatrix` in `Download.tsx` with a real QR before launch.
- All animations respect `prefers-reduced-motion`.

## Things to swap before shipping

- Store links and APK URL in `content.ts` (`download.platforms[].buttons`).
- Coupon validation in `Pricing.tsx` (currently a local lookup).
- Privacy / Terms URLs and contact email in `content.ts`.
