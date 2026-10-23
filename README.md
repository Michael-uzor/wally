# WALLY

The public-facing landing page for Wally's wallet and token risk-scanning project. Built with React, Vite, CSS Modules, Three.js, and React Three Fiber. No scanning, wallet connection, backend, or blockchain requests are implemented.

## Run locally

```sh
npm ci
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

The output is in `dist/` and can be served by any static host.

## Content and assets

Roadmap content was checked against the supplied `Wally roadmap.pdf`. The project owner confirms Phase 1 is executed and live. Phase 2 is coming soon; Phases 3–5 remain future roadmap milestones. Individual product features have not been independently verified from this landing-page repository. The scanner dashboard is explicitly illustrative. The mark and procedural orbital scene are original concept assets, pending official brand approval. Official social, documentation, and contact links have not been supplied and are represented by a non-clickable placeholder.

Google Fonts supplies Manrope and DM Sans; the page has local font fallbacks. The lazily loaded WebGL scene has a CSS fallback, limits pixel density, and respects reduced motion. All meaningful content is accessible HTML.

## Official product details

Update `src/projectConfig.js` when official details are supplied: `tokenContractAddress`, `tokenInformation` (`name`, `symbol`, `network`), and `telegramBotUrl`. Empty values are hidden and create no links. Supplying token metadata does not itself assert a token launch. The live product is separate from this presentation website.

## Ecosystem research

Robinhood Chain context and educational sources are documented in `docs/research.md` (reviewed 23 October 2026). The site distinguishes ecosystem facts, general education, owner-confirmed Phase 1 scope, future roadmap items, and sample UI. No changes were made to the 3D implementation during this content update.

## Graphics performance

The selectively registered, lazy 3D scene uses shared GPU resources and pauses offscreen, in hidden tabs, and for reduced motion. The existing CSS fallback covers initialization failure and context loss. See `docs/graphics-performance.md` for bundle measurements and the development-only graphics regression harness.

## Production verification and deployment

Run `npm run build` followed by `npm test`. Preview with `npm run preview`. The deployment configuration declares Vite, reproducible `npm ci`, `npm run build`, and `dist/`. No environment variables are required. The repository must be linked to the intended existing GitHub remote and Vercel project before publishing. See `docs/production-audit.md` for the audit findings and verification limits.

## Live project

Production: https://wally-nine.vercel.app/

Source: https://github.com/Michael-uzor/wally (`main`). Vercel project `wally` is connected to this repository; pushes to main deploy to production. The other account projects are separate and unchanged.
