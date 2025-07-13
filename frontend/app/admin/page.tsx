'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '@/components/ui/card'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const [users, setUsers] = useState([])
  const [trips, setTrips] = useState([])
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/login')
        return
      }

      try {
        const usersRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setUsers(usersRes.data)

        const tripsRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/trips`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setTrips(tripsRes.data)
      } catch (err) {
        setError('Access denied or error fetching data.')
        console.error(err)
      }
    }

    fetchData()
  }, [router])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-300">🛡️ Admin Dashboard</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <Card className="p-4 mb-6">
        <h2 className="text-lg font-semibold">Users ({users.length})</h2>
        <ul className="mt-2 space-y-1">
          {users.map((user: any) => (
            <li key={user.id}>
              {user.username} ({user.email}) {user.is_admin && <span className="text-yellow-300">[Admin]</span>}
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-4">
        <h2 className="text-lg font-semibold">Trips ({trips.length})</h2>
        <ul className="mt-2 space-y-1">
          {trips.map((trip: any) => (
            <li key={trip.id}>
              {trip.source} → {trip.destination} | ₹{trip.budget} | {new Date(trip.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
