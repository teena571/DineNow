import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config({ path: './backend/.env' });

const KEY = process.env.GEMINI_API_KEY;
if (!KEY) {
  console.error("GEMINI_API_KEY is not set in .env");
  process.exit(1);
}

async function run() {
  try {
    const client = new GoogleGenerativeAI(KEY);
    const model = client.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = "Give 3 concise bullet points about why pizza is popular.";

    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
    });

    const text = await result.response.text();
    console.log("SDK response:\n", text);
  } catch (err) {
    console.error("SDK error:", err);
    if (err?.response) {
      try {
        const body = await err.response.text();
        console.error("Error response body:", body);
      } catch (e) {}
    }
    process.exit(1);
  }
}

run();
