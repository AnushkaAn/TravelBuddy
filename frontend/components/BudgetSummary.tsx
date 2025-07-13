// components/BudgetSummary.tsx
'use client'
import React from 'react'

interface Props {
  flight: number
  hotel: number
  cafes: number
  userBudget: number
}

export default function BudgetSummary({ flight, hotel, cafes, userBudget }: Props) {
  const total = flight + hotel + cafes
  const fits = total <= userBudget

  return (
    <div className="bg-blue-800 p-4 rounded-lg text-white my-4">
      <h2 className="text-2xl font-semibold">💰 Budget Summary</h2>
      <ul className="mt-2">
        <li>Flights: €{flight}</li>
        <li>Hotel: €{hotel}</li>
        <li>Cafés & extras: €{cafes}</li>
      </ul>
      <p>Total: <strong>€{total}</strong></p>
      {!fits && <p className="text-red-400">Over budget! Try cheaper options.</p>}
    </div>
  )
}
