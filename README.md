# Muhammad Immad Shahzad – Portfolio

React + TypeScript + Three.js + GSAP portfolio.

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Kahan kya badalna hai
| Cheez | File |
|---|---|
| Naam, About, Experience, Projects, Skills, WhatsApp number, links | `src/config.ts` |
| Resume PDF | `public/Muhammad_Immad_Shahzad_Resume.pdf` (naya resume isi naam se replace kar do) |
| Project images | `public/images/projects/` (abhi generated covers hain; real screenshot lagane ho to `.png` daalo aur `config.ts` me `image` path badlo) |
| Mobile profile photo | `public/images/profile.svg` (apni photo ke liye `src/components/Landing.tsx` me path badlo) |
| Dark/Light colours | `src/index.css` (dark) aur `src/theme.css` (light) |
| Tech stack icons | `src/components/TechStackNew.tsx` |

## Deploy
Netlify: build command `npm run build`, publish directory `dist` (`public/_redirects` aur `netlify.toml` already hain).
Vercel: framework Vite, `vercel.json` already hai.

## Play page (/play)
Chess against a bot works out of the box. The "Talk with me" AI chat needs a free Groq API key:
set `GROQ_API_KEY` (Netlify: Site settings > Environment variables; Vercel: Project settings > Environment Variables).
On Netlify the chat only works when deployed from Git (functions are not included in drag-and-drop `dist` uploads).
The chess engine files (`public/redoxchess.*`) come from the original template author (MIT).

## License
MIT. Original template by Redoyanul Haque (see LICENSE).
