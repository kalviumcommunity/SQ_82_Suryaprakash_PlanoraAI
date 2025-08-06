# 🌍 Planora – AI Travel Assistant

Planora is an intelligent AI-powered travel assistant that helps users plan personalized trips. It leverages OpenAI’s capabilities to generate travel itineraries, estimate budgets, recommend packing lists, fetch weather information, and retrieve up-to-date travel rules or visa information.

Planora is designed to showcase the use of modern AI techniques (Prompting, Structured Output, Function Calling, RAG) within a full-stack web application built using **React.js**, **Node.js/FastAPI**, and the **OpenAI API**.

---

## 🎯 Project Objective

To build an interactive assistant that:
- Takes natural language prompts from users
- Responds with structured travel plans (JSON format)
- Calls backend functions for weather, budget estimation, etc.
- Retrieves real-time or external travel-related information

---

## 🧠 Key AI Concepts Used

This project implements four essential AI development techniques:

---

### 1. 🗣️ Prompting

**What it is**: Prompting is how we communicate with the AI. It includes two types:
- **System Prompt**: Sets the AI’s personality and behavior.
- **User Prompt**: The actual input from the user.

**How Planora uses it**:
- The **system prompt** is set as:  
  `"You are a professional travel assistant named Planora. Respond with polite, helpful, and clear answers formatted in JSON."`

- A **user prompt** might be:  
  `"Plan a 5-day budget trip to Goa for two people in November."`

This combination ensures that the AI consistently responds with helpful and relevant trip suggestions in a predefined format.

---

### 2. 📦 Structured Output

**What it is**: Structured output allows the AI to respond with machine-readable data formats (like JSON) instead of plain text.

**Why it matters**: Enables the frontend to easily extract and display itinerary, budget, weather, and packing suggestions.

**How Planora uses it**:
- The system prompt instructs the AI to format its response in JSON.
- Example output:
```json
{
  "destination": "Goa",
  "budget_estimate": "₹20,000",
  "itinerary": ["Day 1: Arrival & beach visit", "Day 2: Water sports", "Day 3: Fort tour"],
  "weather": "Sunny, 28°C",
  "packing_list": ["Sunscreen", "Swimwear", "Flip-flops"]
}
```

The frontend UI parses this JSON and displays it in clean, user-friendly sections.

---

### 3. 🧩 Function Calling

**What it is**: OpenAI's function calling feature allows the model to output a function name and arguments when certain actions are needed. The backend then executes the function and provides real-time results to the AI.

**Why it matters**: Keeps AI responses accurate, up-to-date, and context-aware.

**How Planora uses it**:
- Defines functions like:
  - `get_weather(location, date)`
  - `estimate_budget(destination, duration)`
  - `get_packing_list(destination, weather)`

- When a user prompt requires dynamic data, the model calls the appropriate function:
```json
{
  "function_call": {
    "name": "get_weather",
    "arguments": {
      "location": "Manali",
      "date": "2025-12-01"
    }
  }
}
```

- The backend executes the weather API and returns real weather info, which the AI then uses to complete the trip plan.

---

### 4. 🔍 RAG (Retrieval-Augmented Generation)

**What it is**: RAG is a technique where external knowledge is retrieved from documents, APIs, or web searches and passed into the model as additional context to improve accuracy and relevance.

**Why it matters**: GPT models have a knowledge cutoff and cannot access real-time data natively.

**How Planora uses it**:
- If a user asks, "What are the current visa rules for Thailand?", Planora:
  1. Searches the latest travel advisory or visa rules from trusted sources.
  2. Passes the retrieved text into the prompt:
  ```plaintext
  Context: "As of August 2025, travelers from India can enter Thailand visa-free for 30 days..."
  Question: What are the current visa requirements for Thailand?
  ```
  3. The model then responds using this **retrieved context**.

This RAG workflow ensures Planora provides **up-to-date, real-world information**.

---

## 🏗️ Tech Stack


Frontend    - React.js, Tailwind CSS |
Backend     - Node.js (Express) or FastAPI |
AI API      - OpenAI (GPT-4 or GPT-3.5 Turbo) |
External APIs - Weather API, Travel Info APIs |
Deployment - Vercel (frontend), Render or Railway (backend) |

---

## 📈 Example Use Case

### 💬 Prompt:
> “Plan a 5-day romantic trip to Udaipur in December. What will the weather be like and what should I pack?”

### 🤖 Output:
```json
{
  "destination": "Udaipur",
  "weather": "Pleasant, 18°C - 25°C",
  "budget": "₹25,000",
  "itinerary": ["Day 1: City Palace", "Day 2: Boat ride", ...],
  "packing_list": ["Light jacket", "Formal wear", "Camera"]
}
```

---

## ✅ Future Improvements
- Voice input/output
- Hotel + flight booking integrations
- WhatsApp/Telegram bot version
- Multi-user login and trip history

