Function Calling
📖 Concept
Function calling allows LLMs to return structured JSON outputs that can directly trigger backend functions. Instead of only returning text, the model “calls” a function when the conditions are met.

🛠 How Planora AI Uses It
When a user says, “Book me a flight from Delhi to Paris on 10th September,” Planora AI:

Extracts flight details via function calling.

Passes them to the booking API.

Returns confirmation.

Example:

javascript
Copy
Edit
const functions = [{
  name: "book_flight",
  parameters: {
    type: "object",
    properties: {
      from: { type: "string" },
      to: { type: "string" },
      date: { type: "string" }
    }
  }
}];