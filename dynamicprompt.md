Dynamic Prompting
📖 Concept
Dynamic prompting is the process of generating or modifying prompts at runtime based on user inputs, external data, or application state. Instead of using a fixed prompt, the AI dynamically adapts to context, ensuring more relevant and accurate outputs.

Why it’s useful:
It makes the AI more flexible and context-aware, allowing it to adjust to different user scenarios without manually rewriting prompts.

🛠 How Planora AI Uses It
In Planora AI, dynamic prompting is used to generate personalized travel recommendations by incorporating:

User preferences (budget, travel dates, interests)

Live data (weather, currency rates, events)

AI embeddings for better similarity matching with stored travel content

Example:

javascript
Copy
Edit
const dynamicPrompt = `
Plan a ${user.tripType} trip to ${user.destination} for ${user.days} days.
Budget: ${user.budget}.
Current weather: ${weatherData}.
User interests: ${user.interests.join(", ")}.
Generate a detailed day-by-day itinerary.
`;