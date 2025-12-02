// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "chat-bison-001" });

// export const chatWithGemini = async (req, res) => {
//   try {

//     console.log("Incoming body:", req.body);

//     const { prompt } = req.body;
//     if (!prompt) {
//       return res.status(400).json({ error: "Prompt is required" });
//     }
//     console.log(process.env.GEMINI_API_KEY)
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     const model = genAI.getGenerativeModel({ model: "chat-bison-001" });

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();

//     res.json({ reply: text });
//   } catch (error) {
//     console.error("Gemini error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize once, not inside function
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatWithGemini = async (req, res) => {
  try {
    console.log("Incoming body:", req.body);

    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Use the NEW model that Google supports
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    // Generate response
    // const result = await model.generateContent(prompt);
    // const result = await model.generateContent(`
    //   Format your ENTIRE answer ONLY in bullet points.
    //   Rules:
    //   - Every line must start with a "-".
    //   - Do NOT write paragraphs.
    //   - Do NOT write intros or conclusions.
    //   - Keep bullets short and clear.

    //   User Query: ${prompt}
    // `);


    const result = await model.generateContent(`
  Respond ONLY in clean bullet points with proper new lines.
  Formatting rules:
  - Each bullet MUST start on a new line.
  - Use "-" at the start of every bullet.
  - No joining bullets in a single line.
  - No paragraphs.
  - No extra explanation. 
  
  User Prompt: ${prompt}
`);

    const text = result.response.text(); // ❗ No await here

    res.json({ reply: text });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
