// Netlify version of /api/chat (the Vercel version is api/chat.js).
// Needs the GROQ_API_KEY environment variable (free key from console.groq.com).
const MODEL = "openai/gpt-oss-20b";

export default async (req) => {
  if (req.method !== "POST") return Response.json({ error: "Method not allowed" }, { status: 405 });
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return Response.json({ error: "Missing GROQ_API_KEY" }, { status: 500 });
  let body;
  try { body = await req.json(); } catch { return Response.json({ error: "Bad JSON" }, { status: 400 }); }
  const { messages } = body || {};
  if (!Array.isArray(messages) || messages.length === 0) return Response.json({ error: "Messages must be a non-empty array" }, { status: 400 });
  try {
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: MODEL, messages, temperature: 0.7, max_tokens: 300 }),
    });
    const data = await r.json();
    return Response.json(data, { status: r.status });
  } catch (e) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

export const config = { path: "/api/chat" };
