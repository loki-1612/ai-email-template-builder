import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/generate", async (req, res) => {
  try {
    const { type, prompt, tone } = req.body;

    // Prevent undefined tone
    const safeTone = tone || "Neutral";

    let systemPrompt = "";

    if (type === "subject") {
      systemPrompt = `
Create a short, clean email subject line in a ${safeTone} tone.
Rules:
- Maximum 8 words
- No markdown
- No asterisks
- No emojis
- No quotes
`;
    } else if (type === "headline") {
      systemPrompt = `
Write an email headline in a ${safeTone} tone.
No markdown, no symbols, no asterisks.
`;
    } else {
      systemPrompt = `
Write email body text in a ${safeTone} tone.
No lists, no markdown, no asterisks.
Write natural sentences only.
`;
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const fullPrompt = `${systemPrompt}\n\nUser content: ${prompt}`;

    const result = await model.generateContent(fullPrompt);

    const output = result.response
      .text()
      .replace(/\*/g, "") // Remove asterisks
      .replace(/#/g, "") // Remove markdown headers
      .trim();

    res.json({ text: output });
  } catch (error) {
    console.error("Backend AI Error:", error);
    res.status(500).json({ error: "AI Processing Failed" });
  }
});

app.listen(4000, () => console.log("Backend running on http://localhost:4000"));
