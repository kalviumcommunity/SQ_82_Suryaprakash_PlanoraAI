Multi-shot Prompting
📖 Concept
Multi-shot prompting gives the model several examples before the actual query, improving accuracy for complex tasks.

🛠 How Planora AI Uses It
We use multi-shot prompts for itinerary formatting, showing multiple examples so the AI always outputs in the same table format.

Example:

javascript
Copy
Edit
const prompt = `
Example 1:
Input: Trip to Bali, 3 days
Output: | Day | Plan |
...

Example 2:
Input: Trip to Tokyo, 5 days
Output: | Day | Plan |
...

Now, Trip to Rome, 4 days:
`;