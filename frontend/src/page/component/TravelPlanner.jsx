import React, { useState } from "react";
import axios from "axios";

function TravelPlanner() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState(500);
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePlanTrip = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/plan-trip", {
        destination,
        days,
        budget,
      });

      setPlan(response.data.plan);
    } catch (error) {
      console.error(error);
      setPlan("❌ Failed to fetch travel plan.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">✈️ AI Travel Planner</h1>

      <input
        type="text"
        placeholder="Enter destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        className="border rounded p-2 w-full mb-2"
      />

      <input
        type="number"
        placeholder="Days"
        value={days}
        onChange={(e) => setDays(e.target.value)}
        className="border rounded p-2 w-full mb-2"
      />

      <input
        type="number"
        placeholder="Budget ($)"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        className="border rounded p-2 w-full mb-2"
      />

      <button
        onClick={handlePlanTrip}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Planning..." : "Generate Plan"}
      </button>

      {plan && (
        <div className="mt-4 p-4 border rounded bg-gray-50 w-full whitespace-pre-wrap">
          <h2 className="font-semibold mb-2">Your Travel Plan:</h2>
          <p>{plan}</p>
        </div>
      )}
    </div>
  );
}

export default TravelPlanner;
