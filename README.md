# 3D Portfolio (React + Tailwind + Framer Motion + React Three Fiber)

## Run
    npm install
    npm run dev          # http://localhost:5173
    npm run build        # production build in /dist

## Make it yours
| What                | Where                                                        |
|---------------------|--------------------------------------------------------------|
| Name, tagline, links| `src/data/content.js` → `profile`                            |
| Your photo          | Replace `public/profile.png` (portrait, 3:4 ratio)           |
| 3D .glb avatar      | Put it at `public/avatar.glb`, set `avatarGlb: "/avatar.glb"` |
| Projects            | `src/data/content.js` → `projects` (screenshots in `public/projects/`, 16:10) |
| Colors / fonts      | `tailwind.config.js`                                         |

## Performance
- Three.js loads lazily, only on devices with WebGL2, 4+ CPU cores, and no "reduce motion" setting.
- Everyone else gets the CSS 3D tilt card (same look, no WebGL).
- Canvas pixel ratio is capped at 1.75.
