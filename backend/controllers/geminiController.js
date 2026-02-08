

// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Initialize once, not inside function
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// export const chatWithGemini = async (req, res) => {
//   try {
//     console.log("Incoming body:", req.body);

//     const { prompt } = req.body;

//     if (!prompt) {
//       return res.status(400).json({ error: "Prompt is required" });
//     }

//     // Use the NEW model that Google supports
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     const model = genAI.getGenerativeModel({
//       model: "gemini-2.5-flash",
//     });

    

//   const result = await model.generateContent(`
//   Respond ONLY in clean bullet points with proper new lines.
//   Formatting rules:
//   - Each bullet MUST start on a new line.
//   - Use "-" at the start of every bullet.
//   - No joining bullets in a single line.
//   - No paragraphs.
//   - No extra explanation. 
  
//   User Prompt: ${prompt}
// `);

//     const text = await result.response.text(); // ❗ No await here

//     res.json({ reply: text });
//   } catch (error) {
//     console.error("Gemini error:", error);
//     res.status(500).json({ error: error.message });
//   }
// };




// import { GoogleGenerativeAI } from "@google/generative-ai";

// export const chatWithGemini = async (req, res) => {
//   try {
//     console.log("Incoming body:", req.body);

//     const { prompt } = req.body;
//     if (!prompt) {
//       return res.status(400).json({ error: "Prompt is required" });
//     }

//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // ✅ use a valid model

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = await response.text(); // ✅ must await

//     res.json({ reply: text });
//   } catch (error) {
//     console.error("Gemini error:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// };




import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

// Initialize once

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatWithGemini = async (req, res) => {
  try {
    console.log("Incoming body:", req.body);

    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Use Gemini 2.5 Flash (fast + quota friendly)
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // ✅ Proper request format
    const result = await model.generateContent({
      contents: [
        {
          parts: [
            { text: `Respond ONLY in clean bullet points.\n\nUser Prompt: ${prompt}` }
          ]
        }
      ]
    });

    const text = await result.response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error("Gemini error:", error.message);
    res.status(500).json({ error: error.message });
  }
};
