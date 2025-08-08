
## 🧠 Chain of Thought Prompting (CoT)
**What is Chain of Thought Prompting?**
Chain of Thought (CoT) prompting is a technique where the AI is encouraged to reason step-by-step when solving complex problems. Instead of directly answering a question, the model breaks the process into smaller logical steps, leading to a more accurate and explainable output.

**Example:**
Instead of:
> "Suggest a trip plan for 5 days in Japan."

The AI thinks like:
1. Identify the location → Japan.
2. Understand the duration → 5 days.
3. Retrieve cultural, seasonal, and activity-based data.
4. Distribute activities and locations across 5 days logically.
5. Present the plan in a structured format.

---

## 💡 How We Utilised CoT in Planora AI
Planora AI uses **Chain of Thought Prompting** to:
- **Plan itineraries logically**: The AI reasons about travel dates, location details, activity preferences, and budget constraints step-by-step.
- **Generate better suggestions**: Breaking down user queries improves relevance and personalization.
- **Enhance explainability**: Users can understand *why* certain destinations or activities were suggested.

**Prompt Example in Planora AI:**  

Identify user preferences (location, duration, budget, interests).

Match with suitable destinations and activities.

Consider weather, culture, and travel convenience.

Create a day-by-day itinerary.

Provide a packing list relevant to the location and season.