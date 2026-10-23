# Production audit — 23 October 2026

## Initial findings (recorded before fixes)

- Existing React/Vite project with CSS Modules, procedural Three.js assets, hash navigation, and an optimized lazy graphics root. No backend, runtime environment variables, public asset directory, or supplied official logo file.
- Repository: unborn `main` branch, no commits, no tracked files, no configured remotes, and no local Git author identity. All website files are untracked existing work and must be retained.
- No `.vercel/project.json`, deployment configuration, or known production URL. Vercel user authentication files exist outside the repository; their contents must never be displayed or committed.
- Existing title, description, and theme color are appropriate. Favicon, Apple touch icon, and Open Graph/Twitter metadata are missing. No Vite logo, default title, indexing block, or placeholder production URL was found.
- `.gitignore` covers dependencies and build output but lacks credential and local Vercel exclusions.
- Mobile navigation has a useful name and expanded state; it lacks an explicit controlled-menu relationship and Escape-key handling. Existing focus outlines are present.
- Phase statuses and complete roadmap lists are correct. Scanner dashboard explicitly uses illustrative data. Empty official project settings are hidden. Independent-project and risk disclaimers are present.
- Initial source scan found no credential patterns or environment files. There is no reachable committed history in this checkout to scan.

## Fixes

- Added SVG and 32px PNG favicons and a 180px Apple touch icon derived from the current Wally mark; no replacement brand asset.
- Added Open Graph and Twitter summary metadata. Kept the existing title, description, and theme color. Canonical URL and social image intentionally omitted until a verified production URL and approved sharing image exist. No installable-app manifest was needed for a presentation site.
- Expanded ignore rules for environment files, local Vercel settings, keys, local databases, and logs.
- Added menu control relationship and Escape handling with keyboard focus recovery.
- Narrow-phone audit at 320px found the 3D canvas area began at the CTA row. Added 60px of spacing only at widths at or below 360px, keeping scene assets, animation, colors, and other layouts unchanged.
- Added explicit standard Vite deployment settings: npm ci, npm run build, output dist. No environment variables are used by the application. Vercel dashboard root should be the repository root; its actual configuration remains unverified until the intended project is identified.
- Added four dependency-free production regression checks for metadata, built asset references, JS imports, excluded test harness, phase statuses, and official-detail placeholders.

## Verification

- Production build passed without warnings. Four automated production tests passed.
- No lint or type-check scripts exist; those checks are unavailable, not reported as passed.
- Favicon SVG, favicon PNG, and Apple touch icon returned HTTP 200 with correct MIME types from the production preview.
- All seven distinct external educational links resolved in the web research tool; the Chain product page may redirect by locale.
- Browser production-preview audit completed at 320px mobile, 768px tablet, and 1440px desktop: no horizontal document overflow or text/link clipping. At 320px the final canvas begins at y=598px after the CTA row ends at y=584.77px. Roadmap CTA reaches #roadmap. The menu opens and Escape closes it, restoring focused-toggle visibility. One H1 and valid internal anchor targets were confirmed. Console error/warning inspection was empty. Source review confirms semantic headings, accessible logo names, visible focus styling, reduced-motion rules, and unchanged graphics fallback/resource handling. No full automated WCAG conformance audit was performed.
- Secret-pattern scan of source found no credentials. No commits or reflog entries exist in this checkout, so there is no local committed history to scan. No environment files were present; their contents were not read.

## Publishing blocker

GitHub and Vercel authentication are available, but this checkout has no remote or project link. The authenticated GitHub account and Vercel scope expose only assassin-website and tokenstudio. Neither is established as Wally. No project, production branch, Git integration, environment configuration, domain, remote history, or live site can be verified for Wally until the intended target is supplied. Do not publish over either unrelated project or create duplicates.

## Release state

All intended files were staged explicitly and reviewed, including a staged credential-pattern scan with zero findings. Dependencies already matched the lockfile; no application dependency installation was needed. The Vercel CLI was available through npx and authenticated, but no Wally project was selected, created, or deployed. A local production-preparation commit can be made on main using the authenticated account’s GitHub noreply author identity. GitHub push and production verification must wait for the destination clarification.

## New-project authorization and deployment

The owner subsequently authorized creating new projects named wally. Created https://github.com/Michael-uzor/wally and Vercel project wally in michael-uzors-projects. No changes were made to assassin-website or tokenstudio. The main branch was pushed; Vercel's GitHub integration was connected and verified as Michael-uzor/wally with production branch main. Dashboard settings are Vite, npm ci, npm run build, dist output, repository root, Node 24.x. No project environment variables are configured or required.

The first deployment reached READY and Vercel automatically assigned it to production at https://wally-nine.vercel.app, publicly returning HTTP 200. This verified URL is now the canonical and Open Graph URL. No social-sharing image was fabricated. The CLI created an ignored local OIDC environment file while linking; its contents were never displayed or committed. Added explicit .vercelignore exclusions so environment files, keys, local databases, dependencies, and local builds are not uploaded.

The earlier publishing-blocker section is retained as the initial audit record, superseded by this authorization and verified project connection. The final deployment will be verified against the main commit after these release-metadata changes are pushed; the chat handoff records the final commit and live checks.
