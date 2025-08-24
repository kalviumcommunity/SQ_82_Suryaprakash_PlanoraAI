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

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // RTFC-based prompting
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
`;


    const userPrompt = `Plan a trip to ${destination} for ${days} days with a budget of $${budget}.`;

    const prompt = `${systemPrompt}\n\nUser request: ${userPrompt}`;

  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    res.status(500).json({ error: "Failed to fetch plan." });
  }
});
console.log("Gemini API Key loaded:", process.env.GEMINI_API_KEY ? "✅ Yes" : "❌ No");
app.listen(process.env.PORT || 5000, () =>
  console.log(`✅ Server running on port ${process.env.PORT || 5000}`)
);
