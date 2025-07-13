'use client'
import { useEffect, useState } from 'react'
import Card from '@/components/ui/card'
import { Section } from '@/components/ui/section'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function MyTrips() {
  const [trips, setTrips] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    const fetchTrips = async () => {
      try {
        const res = await fetch('http://localhost:8000/trip/my-trips', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!res.ok) throw new Error('Failed to fetch trips')
        const data = await res.json()
        setTrips(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchTrips()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-blue-300">🧳 My Trips</h1>
        
        <Section title="Saved Trips">
          {trips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trips.map((trip, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card title={`${trip.source} → ${trip.destination}`}>
                    <div className="space-y-2">
                      <p className="text-blue-200">Date: {new Date(trip.date).toLocaleDateString()}</p>
                      <p className="text-blue-200">Budget: €{trip.budget}</p>
                      <p className="text-blue-200">Total Spent: €{trip.total}</p>
                      <div className="flex justify-between mt-4">
                        <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                          View Details
                        </button>
                        <button className="text-sm text-red-400 hover:text-red-300 transition-colors">
                          Delete Trip
                        </button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-blue-200 text-lg">You haven't saved any trips yet.</p>
              <button 
                onClick={() => router.push('/trip')}
                className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
              >
                Plan a New Trip
              </button>
            </div>
          )}
        </Section>
      </motion.div>
    </div>
  )
}