Embeddings
📖 Concept
Embeddings are vector representations of text that capture meaning in numerical form. In LLMs, they allow semantic search, recommendation, and clustering by measuring similarity between text inputs.

How they’re computed:
A model converts input text into an n-dimensional vector. Similar meanings → closer vectors.

🛠 How Planora AI Uses It
We use embeddings to:

Match user queries with stored travel content (e.g., past itineraries, blogs, tips).

Power semantic search for "best beaches in Asia" even if it’s worded differently.

Example:

javascript
Copy
Edit
import OpenAI from "openai";
const openai = new OpenAI();

const embedding = await openai.embeddings.create({
  model: "text-embedding-ada-002",
  input: "Best winter destinations in Europe"
});
console.log(embedding.data[0].embedding);
