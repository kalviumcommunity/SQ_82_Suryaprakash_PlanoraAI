import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Weather API route
app.get("/api/weather", async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }

    const weatherKey = process.env.WEATHER_API_KEY; // <-- put your API key in .env
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}&units=metric`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("❌ Weather API Error:", error.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// Trip planner route
app.post("/api/plan-trip", async (req, res) => {
  try {
    const { destination, days, budget } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
        stopSequences: ["END_OF_PLAN"],
      },
    });

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

    const result = await model.generateContent(prompt);

    const usage = result.response.usageMetadata;
    console.log("🔹 Token Usage:", usage);

    res.json({
      plan: result.response.text(),
      tokens: usage,
    });
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    res.status(500).json({ error: "Failed to fetch plan." });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
console.log("Gemini API Key loaded:", process.env.GEMINI_API_KEY ? "✅ Yes" : "❌ No");
console.log("Weather API Key loaded:", process.env.WEATHER_API_KEY ? "✅ Yes" : "❌ No");
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
