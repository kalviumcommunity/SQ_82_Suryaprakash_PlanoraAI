import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config(); // Load .env file

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/plan-trip", async (req, res) => {
  try {
    const { destination, days, budget } = req.body;

    // (1) MODEL CONFIG — added temperature, topP, topK, stop sequences
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,   // controls creativity
        topP: 0.9,          // nucleus sampling
        topK: 40,           // restricts token sampling to top K candidates
        stopSequences: ["END_OF_PLAN"], // custom stop sequence
      },
    });

    // (2) RTFC-based prompting (unchanged)
    const systemPrompt = `
You are a travel planner AI. Plan a ${days}-day trip to ${destination}.

Rules:
1. The total budget MUST be exactly $${budget}.
2. Distribute the budget across accommodation, food, activities/transport, shopping/miscellaneous.
3. Output in valid JSON only with the structure:
{
  "destination": "...",
  "days": ...,
  "daily_plan": [
    { "day": 1, "plan": "..." },
    { "day": 2, "plan": "..." }
  ],
  "budget_estimate": {
    "total": ${budget},
    "breakdown": {
      "accommodation": ...,
      "food": ...,
      "activities_and_transport": ...,
      "shopping_and_miscellaneous": ...
    }
  }
}
Return JSON only. Do not add explanations. Finish output with "END_OF_PLAN".
`;

    const userPrompt = `Plan a trip to ${destination} for ${days} days with a budget of $${budget}.`;

    const prompt = `${systemPrompt}\n\nUser request: ${userPrompt}`;

    // (3) GENERATION + TOKEN LOGGING
    const result = await model.generateContent(prompt);

    // count tokens used
    const usage = result.response.usageMetadata;
    console.log("🔹 Token Usage:", usage);

    res.json({
      plan: result.response.text(),
      tokens: usage, // send token usage back to frontend for visibility
    });
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    res.status(500).json({ error: "Failed to fetch plan." });
  }
});

console.log("Gemini API Key loaded:", process.env.GEMINI_API_KEY ? "✅ Yes" : "❌ No");
app.listen(process.env.PORT || 5000, () =>
  console.log(`✅ Server running on port ${process.env.PORT || 5000}`)
);
