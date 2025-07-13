'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Card from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState('')
  const [customPrompt, setCustomPrompt] = useState('')
  const [tripHistory, setTripHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  const fetchTrips = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    try {
      const tripsRes = await axios.get('http://localhost:8000/trip/my-trips', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTripHistory(tripsRes.data)
    } catch (err) {
      setError('Failed to load trips')
    }
  }

  const fetchRecommendation = async () => {
    const token = localStorage.getItem('token')
    try {
      const recRes = await axios.post(
        'http://localhost:8000/recommend',
        { prompt: customPrompt },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setRecommendations(recRes.data.itinerary)
    } catch (err) {
      console.error('Recommendation error:', err)
      setError('Failed to load recommendations')
    }
  }

  useEffect(() => {
    fetchTrips().finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
    </div>
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-blue-300">
          🧠 AI Trip Recommendations
        </h1>

        <Tabs defaultValue="recommendations">
          <TabsList className="grid grid-cols-2 bg-blue-900/20 mb-6">
            <TabsTrigger value="recommendations">AI Suggestions</TabsTrigger>
            <TabsTrigger value="history">Your Trips</TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations">
            <Card className="p-6">
              <textarea
                placeholder="Enter your own travel-related question or prompt..."
                value={customPrompt}
                onChange={e => setCustomPrompt(e.target.value)}
                className="w-full bg-blue-950 border border-blue-800 p-2 rounded mb-4 text-white"
                rows={4}
              />
              <Button onClick={fetchRecommendation} className="mb-6">Generate</Button>
              <div className="prose prose-invert whitespace-pre-wrap">
                {recommendations || 'No recommendation yet.'}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tripHistory.map((trip: any) => (
                <Card key={trip.id} className="p-4">
                  <h3 className="text-lg font-semibold">
                    {trip.source} → {trip.destination}
                  </h3>
                  <p className="text-blue-200 mt-2">
                    {new Date(trip.date).toLocaleDateString()}
                  </p>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}