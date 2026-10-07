<div align="center">

# Muhammad Immad Shahzad - Portfolio

**An interactive 3D portfolio website with a scroll-driven character, a playable chess game and an AI chat.**

[Live site](https://immad-portfolio-website.vercel.app) | [GitHub](https://github.com/Immad-khan12) | [LinkedIn](https://linkedin.com/in/immad-shahzad-010511347)

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.168-000000?logo=threedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock&logoColor=white)

</div>

---

## About

This is the personal portfolio of **Muhammad Immad Shahzad**, a Full Stack Python & Web Developer based in Lahore, Pakistan. It presents his experience, projects, skills and certifications, and doubles as a showcase of front-end engineering: a 3D character that reacts to the mouse and to scrolling, smooth animations, a dark/light theme, and a small serverless backend.

## Features

- **Interactive 3D character** (Three.js) that follows the cursor, turns, sits at a desk and powers on a monitor as you scroll.
- **Scroll-driven storytelling** built with GSAP ScrollTrigger and Lenis smooth scrolling.
- **Full portfolio sections:** Hero, About, What I Do, Career, Work (horizontal project showcase), Tech Stack, Skills, Certifications and Contact.
- **`/myworks`:** every project in one place.
- **`/play`:** a chess game against a WebAssembly engine, plus an **AI chat ("Talk with me")** powered by Groq through a serverless function.
- **Dark / light theme** that is applied before the first paint (no flash).
- **Responsive on purpose:** three tuned layouts (laptop, phone, and a phone using "desktop site" mode), described below.
- **Content in one file:** names, links, projects, experience and skills live in `src/config.ts`.

## Tech stack

| Area | Tools |
|---|---|
| UI | React 18, TypeScript, React Router 7 |
| 3D | Three.js, three-stdlib (GLTF + Draco loaders) |
| Animation | GSAP + ScrollTrigger, Lenis (smooth scroll) |
| Chess | chess.js (rules), WebAssembly engine (`public/redoxchess.*`) |
| Backend | Serverless function `/api/chat` (Vercel, with a Netlify equivalent) -> Groq API |
| Build / tooling | Vite 5, ESLint, Terser |
| Hosting | Vercel (Netlify supported) |

## How it works

### Architecture
- **Single-page app.** The home page (with the 3D scene) is mounted once and kept alive. `/myworks` and `/play` open as full-screen layers on top of it (`PageLayer` in `src/App.tsx`). Going back never rebuilds the 3D scene, so there is no reload, no freeze and the scroll position is kept.
- While a layer is open, the WebGL render loop and smooth scrolling are paused to save the GPU and battery.
- On unmount, the Three.js scene, GSAP timelines and listeners are fully disposed, so nothing piles up.

### 3D character
- The model is stored in an encrypted file (`public/models/character.enc`), decrypted in the browser, then loaded with a Draco-compressed GLTF loader. The decrypted model is cached in memory, so returning to the home page does not download it again.
- Lighting uses an HDR environment (`public/models/char_enviorment.hdr`).
- The two model files are preloaded in `index.html`, which shortens the loading screen.
- The scene is driven by scroll timelines in `src/components/Character/utils/GsapScroll.ts`.

### Responsive design
One breakpoint (**768 px**) separates the layouts:

| Mode | When | What happens |
|---|---|---|
| **Laptop / desktop** | width above 768 px | The character is a full-screen fixed layer. It rotates, steps back, sits at its desk and leaves before the Career section. |
| **Phone** | width up to 768 px | The character sits inside the hero, is pinned under the top bar and follows you down through *About* and *What I Do*, then scrolls away. |
| **Phone in "desktop site" mode** | wide but tall screen | Keeps the laptop layout, with bigger text (`TallDesktop.css`), a camera that steps back further and the character shifted left, so it never overlaps the text. |

### Backend: AI chat
- The browser calls **`POST /api/chat`**. The Groq API key never reaches the browser; it lives in a server-side environment variable.
- **Vercel:** `api/chat.js` | **Netlify:** `netlify/functions/chat.mjs` | **Local dev:** a middleware in `vite.config.ts` serves the same route, using your `.env`.
- The function trims the conversation to the last few messages, adds today's date, and calls the model. The default model (`groq/compound-mini`) can search the web, with an automatic fallback to `openai/gpt-oss-20b`. Set `GROQ_MODEL` to choose a model.

### Performance
- Route pages and heavy sections are lazy-loaded; the 3D code starts downloading early on desktop.
- Vendor code is split into separate chunks (`three`, `react-three`, `gsap`, `vendor`).
- Production builds minify with Terser and drop `console` / `debugger`.

## Getting started

**Requirements:** Node.js 18 or newer.

```bash
git clone https://github.com/Immad-khan12/Immad-Portfolio-Website.git
cd Immad-Portfolio-Website
npm install
```

Create a `.env` file in the project root (only the AI chat needs it):

```env
GROQ_API_KEY=your_groq_api_key_here
# optional
# GROQ_MODEL=openai/gpt-oss-20b
```

A free key is available at [console.groq.com](https://console.groq.com). Never commit `.env` (it is already in `.gitignore`).

```bash
npm run dev       # http://localhost:5173
npm run build     # type-check + production build in /dist
npm run preview   # serve the production build locally
npm run lint      # ESLint
```

## Deployment

**Vercel (recommended)**
1. Import the repository. Vite is detected automatically.
2. Add the environment variable `GROQ_API_KEY` (and optionally `GROQ_MODEL`).
3. Deploy. `vercel.json` already handles SPA routing and keeps `/api/*` working.

**Netlify**
1. Build command `npm run build`, publish directory `dist` (`netlify.toml` and `public/_redirects` are included).
2. Add `GROQ_API_KEY` under Site settings -> Environment variables.
3. Deploy from Git. Serverless functions are not included in drag-and-drop uploads.

## Project structure

```text
.
|-- api/chat.js                   # Vercel serverless function (AI chat)
|-- netlify/functions/chat.mjs    # Netlify version of the same endpoint
|-- public/
|   |-- models/                   # encrypted 3D character + HDR environment
|   |-- images/, video/, draco/   # assets and Draco decoder
|   |-- redoxchess.js / .wasm     # chess engine
|   `-- Muhammad_Immad_Shahzad_Resume_v2.pdf
`-- src/
    |-- config.ts                 # all site content (links, projects, experience, ...)
    |-- App.tsx                   # routes + overlay pages
    |-- components/
    |   |-- Character/            # Three.js scene, loader, scroll timelines
    |   |-- styles/               # per-section CSS (incl. MobileCharacter, TallDesktop)
    |   `-- ...                   # Landing, About, Work, Contact, Navbar, ...
    |-- pages/                    # MyWorks, Play (chess + AI chat)
    `-- context/, utils/, data/
```

## Customize

| What | Where |
|---|---|
| Name, about text, experience, projects, skills, links, WhatsApp | `src/config.ts` |
| Resume PDF | put the file in `public/` and update `resume.file` in `src/config.ts` |
| Project images | `public/images/projects/` and the `image` field in `src/config.ts` |
| Colors | `src/index.css` (dark) and `src/theme.css` (light) |
| Tech stack icons | `src/components/TechStackNew.tsx` |
| AI chat model / behavior | `api/chat.js` (and `vite.config.ts` for local dev) |

## Credits and license

Released under the **MIT License** (see `LICENSE`). This project started from a portfolio template by Redoyanul Haque; the chess engine files in `public/redoxchess.*` come from the same author (MIT). The content, customization, mobile layouts, backend and ongoing changes are by Muhammad Immad Shahzad.

## Contact

- **Email:** immadshahzad216@gmail.com
- **GitHub:** [Immad-khan12](https://github.com/Immad-khan12)
- **LinkedIn:** [Immad Shahzad](https://linkedin.com/in/immad-shahzad-010511347)