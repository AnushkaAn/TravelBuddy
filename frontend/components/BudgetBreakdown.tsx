import React from "react";

type BudgetBreakdownProps = {
  breakdown: {
    flight_price: number;
    hotel_price: number;
    bus_price: number;
    total_estimate: number;
    is_within_budget: boolean;
  };
};

const BudgetBreakdown: React.FC<{ breakdown: BudgetBreakdownProps["breakdown"] }> = ({ breakdown }) => {
  return (
    <div className="rounded-xl shadow-md p-6 bg-white mt-6">
      <h2 className="text-xl font-semibold mb-4 text-green-700">💰 Budget Summary</h2>
      <ul className="space-y-2 text-gray-700">
        <li>✈️ <strong>Flight:</strong> €{breakdown.flight_price}</li>
        <li>🏨 <strong>Hotel:</strong> €{breakdown.hotel_price}</li>
        <li>🚌 <strong>Bus:</strong> €{breakdown.bus_price}</li>
        <hr />
        <li className="mt-2">
          📊 <strong>Total Estimate:</strong> <span className="text-blue-600">€{breakdown.total_estimate}</span>
        </li>
        <li>
          ✅ <strong>Within Budget:</strong> {breakdown.is_within_budget ? "Yes 🎉" : "No ❌"}
        </li>
      </ul>
    </div>
  );
};

export default BudgetBreakdown;
