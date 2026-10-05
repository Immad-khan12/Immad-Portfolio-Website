// @ts-nocheck  (dev-only server code; avoids needing @types/node)
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

// Local development only: answers POST /api/chat while you run `npm run dev`,
// using GROQ_API_KEY from your .env file (on Vercel/Netlify the real
// serverless function in api/chat.js or netlify/functions/chat.mjs is used).
function devChatApi(env: Record<string, string>): Plugin {
  return {
    name: "dev-chat-api",
    configureServer(server) {
      server.middlewares.use("/api/chat", (req, res) => {
        const send = (status: number, data: unknown) => {
          res.statusCode = status;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(data));
        };
        if (req.method !== "POST") return send(405, { error: "Method not allowed" });

        const apiKey = env.GROQ_API_KEY;
        if (!apiKey || apiKey === "your_groq_api_key_here") {
          return send(500, {
            error: "Missing GROQ_API_KEY - add it to the .env file and restart npm run dev",
          });
        }

        let raw = "";
        req.on("data", (chunk) => (raw += chunk));
        req.on("end", async () => {
          try {
            const { messages } = JSON.parse(raw || "{}");
            if (!Array.isArray(messages) || messages.length === 0) {
              return send(400, { error: "Messages must be a non-empty array" });
            }
            const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model: env.GROQ_MODEL || "openai/gpt-oss-20b",
                messages,
                temperature: 0.7,
                max_tokens: 300,
              }),
            });
            send(r.status, await r.json());
          } catch (e) {
            send(500, { error: "Internal Server Error" });
          }
        });
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ""); // reads .env (all names)
  return {
    plugins: [react(), devChatApi(env)],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'three': ['three', 'three-stdlib'],
            'react-three': ['@react-three/fiber', '@react-three/drei'],
            'gsap': ['gsap'],
            'vendor': ['react', 'react-dom', 'react-router-dom']
          }
        }
      },
      chunkSizeWarningLimit: 1000,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    optimizeDeps: {
      include: ['three', 'gsap', 'lenis', 'chess.js', 'react-icons/fa6', 'react-icons/md', 'react-fast-marquee', 'react-router-dom']
    }
  };
});