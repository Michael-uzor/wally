# Graphics performance verification

## Changes

The scene now uses React Three Fiber's supported `createRoot` API with a selective Three.js catalogue instead of `Canvas`, which registers the full Three.js namespace. No geometry tessellation, positions, colors, lights, camera settings, pixel-density bounds, rotation speed, or pointer response were reduced. Page content and CSS are unchanged.

The solid and wireframe core share one geometry; alternating orbital rings share two materials. Scene-owned GPU resources are disposed on unmount. Renderer creation uses the actual canvas instead of allocating a second capability-probe context. Initialization failures and context loss reveal the existing CSS fallback. Reduced motion uses demand rendering. Intersection and document visibility pause continuous rendering; the clock resets on resumption so paused time does not advance rotation.

Vite separates the tree-shaken Three.js engine and Fiber renderer into cacheable chunks behind the existing lazy Core import. It does not increase the warning limit or eagerly preload the engine in the initial HTML.

## Build measurements

Sizes from Vite production builds, decimal kB; gzip values are Vite's reported gzip estimates, not a network-timing benchmark.

| 3D code | Before | After |
| --- | ---: | ---: |
| Total minified bytes | 884.88 kB | 646.76 kB |
| Total gzip estimate | 238.79 kB | 173.61 kB |
| Largest chunk | 884.88 kB | 480.80 kB |

The total includes Core, Three.js, Fiber, and the small 3D-only shared helper chunk. Shared React code is excluded from both sides. Total raw 3D code is 26.9% smaller; the gzip estimate is 27.3% smaller. The initial application JS stays approximately 246 kB. Splitting alone is not counted as a download reduction.

`npm run build` passes without a chunk-size warning. No dependency versions changed. The dev-only test harness is excluded from `dist/`.

## Browser checks

Production preview at 1440×900 and 390×844: scene visible, no horizontal document overflow, no console errors/warnings, mobile menu opens. Geometry, lighting, orbital animation, and content were visually checked. No FPS, battery-life, or load-time claim is made.

Development harness: `/tests/graphics.html?mode=reduced`, `?mode=normal`, or `?mode=unsupported` while `npm run dev` is running. It reports root count, frames, rotation, render-loop mode, geometry count, and fallback presence. It can simulate media-query changes and hidden tabs without changing OS settings.

Observed checks:

- Reduced motion starts with rotation `[0.2, 0, -0.25]` and demand rendering; enabling motion resumes rotation.
- Hidden-tab simulation changes the loop to demand; frame count and rotation stay fixed across observations. Visibility restoration resumes rendering.
- Scrolling the scene offscreen switches to demand; returning switches to always.
- Missing WebGL removes the canvas and leaves the existing fallback, with zero renderer roots.
- Forced WebGL context loss removes the canvas and releases the renderer root, leaving the fallback.
- Scene unmount releases the renderer root.

The harness uses synthetic media/visibility events to exercise those branches; it is not a claim of hardware coverage across all devices.

References: [R3F custom roots](https://r3f.docs.pmnd.rs/api/canvas), [R3F performance guidance](https://r3f.docs.pmnd.rs/advanced/scaling-performance).
