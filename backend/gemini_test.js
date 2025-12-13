import dotenv from "dotenv";
import https from "https";

dotenv.config();

const KEY = process.env.GEMINI_API_KEY;

if (!KEY) {
  console.error("GEMINI_API_KEY is not set in .env");
  process.exit(1);
}

const prompt = "Give 3 concise bullet points about why pizza is popular.";

const models = [
  "gemini-2.5-flash",
  "gemini-2.1",
  "gemini-2.0-flash",
  "gemini-2.0",
  // Add common Vertex/Generative model names to try
  "text-bison-001",
  "chat-bison-001",
];

const endpoints = ["generateText", "generateContent"];

async function tryCall(model, endpoint) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:${endpoint}?key=${KEY}`;

  // Keep payloads conservative: some endpoints don't accept maxOutputTokens
  const body = endpoint === "generateText"
    ? { prompt: { text: prompt } }
    : { contents: [{ parts: [{ text: prompt }] }] };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    console.log(`\n--- ${model}:${endpoint} -> HTTP ${res.status}`);
    console.log(text);

    if (res.ok) return true;
  } catch (err) {
    console.error(`Error calling ${model}:${endpoint}:`, err.message || err);
  }

  return false;
}

(async () => {
  if (typeof fetch !== "function") {
    console.error("Global fetch is not available in this Node runtime. Please run on Node 18+ or install a fetch polyfill.");
    process.exit(1);
  }

  for (const model of models) {
    for (const endpoint of endpoints) {
      const ok = await tryCall(model, endpoint);
      if (ok) {
        console.log("Success with", model, endpoint);
        process.exit(0);
      }
    }
  }

  console.error("All attempts failed. Check API key, network, or model/endpoint availability.");
  process.exit(2);
})();
