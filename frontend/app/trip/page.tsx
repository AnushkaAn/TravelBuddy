'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Card from '@/components/ui/card'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export default function TripPlanner() {
  const router = useRouter()
  const [query, setQuery] = useState({
    source: '',
    destination: '',
    date: '',
    budget: ''
  })
  const [response, setResponse] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  useEffect(() => {
    if (!token) router.push('/login')
  }, [token, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery({ ...query, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) return
    setLoading(true)

    try {
      const res = await axios.post(
        'http://localhost:8000/trip/search',
        query,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setResponse(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-blue-300">🎯 Plan Your Trip</h1>
        
        <form onSubmit={handleSubmit} className="bg-blue-900/20 backdrop-blur-md border border-blue-800/50 rounded-xl p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['source', 'destination', 'date', 'budget'].map((field) => (
              <div key={field} className="space-y-1">
                <label htmlFor={field} className="block text-sm font-medium text-blue-100">
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  id={field}
                  type={field === 'date' ? 'date' : field === 'budget' ? 'number' : 'text'}
                  name={field}
                  value={query[field as keyof typeof query]}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-blue-900/30 border border-blue-800/50 text-white placeholder-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={`Enter ${field}`}
                  required
                />
              </div>
            ))}
          </div>
          <Button
            type="submit"
            className="w-full mt-4"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search Trips'}
          </Button>
        </form>

        {response && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Tabs defaultValue="flights" className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-blue-900/20">
                <TabsTrigger value="flights">Flights</TabsTrigger>
                <TabsTrigger value="hotels">Hotels</TabsTrigger>
                <TabsTrigger value="transport">Transport</TabsTrigger>
                <TabsTrigger value="food">Food</TabsTrigger>
                <TabsTrigger value="places">Places</TabsTrigger>
              </TabsList>

              <TabsContent value="flights">
                <Section title="✈️ Flights">
                  {response.flights?.data.map((f: any, i: number) => (
                    <Card key={i} title={`${f.itineraries[0].segments[0].departure.iataCode} → ${f.itineraries[0].segments[0].arrival.iataCode}`}>
                      <p className="text-blue-200">Airline: {f.itineraries[0].segments[0].carrierCode}</p>
                      <p className="text-blue-200">Departure: {new Date(f.itineraries[0].segments[0].departure.at).toLocaleString()}</p>
                      <p className="text-blue-200">Arrival: {new Date(f.itineraries[0].segments[0].arrival.at).toLocaleString()}</p>
                      <p className="text-green-400 font-semibold mt-2">Price: €{f.price.total}</p>
                      <a 
                        href={f.bookingLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
                      >
                        Book Now
                      </a>
                    </Card>
                  ))}
                </Section>
              </TabsContent>

              <TabsContent value="hotels">
                <Section title="🏨 Hotels">
                  {response.hotels.map((hotel: any, i: number) => (
                    <Card key={i} title={hotel.name}>
                      <p className="text-blue-200">Location: {hotel.location}</p>
                      <p className="text-blue-200">Price/Night: €{hotel.price_per_night}</p>
                      <p className="text-yellow-400">Rating: {hotel.rating}/5</p>
                      <a 
                        href={hotel.booking_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
                      >
                        Book Hotel
                      </a>
                    </Card>
                  ))}
                </Section>
              </TabsContent>

              <TabsContent value="transport">
                <Section title="🚗 Transportation">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {response.transportation?.map((transport: any, i: number) => (
                      <Card key={i} title={`${transport.type} (${transport.company})`}>
                        <p className="text-blue-200">Departure: {transport.departure_time}</p>
                        <p className="text-blue-200">Arrival: {transport.arrival_time}</p>
                        <p className="text-green-400 font-semibold">Price: €{transport.price}</p>
                        <a 
                          href={transport.booking_link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
                        >
                          Book {transport.type}
                        </a>
                      </Card>
                    ))}
                  </div>
                </Section>
              </TabsContent>

              <TabsContent value="food">
                <Section title="🍴 Restaurants & Cafes">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {response.cafes_nearby.map((c: any, i: number) => (
                      <Card key={i} title={c.name}>
                        <p className="text-blue-200">Cuisine: {c.cuisine}</p>
                        <p className="text-yellow-400">Rating: {c.rating}/5</p>
                        <p className="text-blue-200">Distance: {c.distance} km</p>
                        <a 
                          href={c.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
                        >
                          Visit Website
                        </a>
                      </Card>
                    ))}
                  </div>
                </Section>
              </TabsContent>

              <TabsContent value="places">
                <Section title="📍 Places to Visit">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {response.places_to_visit.map((p: any, i: number) => (
                      <Card key={i} title={p.name}>
                        <p className="text-blue-200">{p.description}</p>
                        <p className="text-yellow-400 mt-2">Rating: {p.rating}/5</p>
                        <p className="text-blue-200">Distance: {p.distance} km from center</p>
                        <a 
                          href={p.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
                        >
                          More Info
                        </a>
                      </Card>
                    ))}
                  </div>
                </Section>
              </TabsContent>
            </Tabs>

            <Card title="💰 Budget Summary" className="bg-blue-800/50 border-blue-700 mt-6">
              <div className="space-y-2">
                <p className="text-lg">Total Estimated: <span className="font-bold text-blue-300">€{response.budget_breakdown.total_estimate}</span></p>
                <p className={response.budget_breakdown.is_within_budget ? 'text-green-400' : 'text-red-400'}>
                  {response.budget_breakdown.is_within_budget ? '✅ Within Budget' : '❌ Exceeds Budget'}
                </p>
                {!response.budget_breakdown.is_within_budget && (
                  <Button 
                    variant="outline" 
                    className="mt-3"
                    onClick={() => {
                      setQuery({
                        ...query,
                        budget: (parseFloat(query.budget) * 1.2).toString()
                      })
                    }}
                  >
                    Show Cheaper Options
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}