'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    setLoggedIn(!!token)

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        setIsAdmin(payload.role === 'admin' || payload.is_admin)
      } catch (error) {
        setIsAdmin(false)
      }
    }
  }, [pathname])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
    router.refresh()
  }

  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-blue-900/30 backdrop-blur-md border-b border-blue-800/50 p-4 flex justify-between items-center text-white sticky top-0 z-50">
      <div className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
        <Link href="/">TravelBuddy AI</Link>
      </div>

      <div className="flex items-center space-x-6">
        <Link
          href="/"
          className={`hover:text-blue-300 transition-colors ${isActive('/') ? 'text-blue-300 font-medium' : ''}`}
        >
          Home
        </Link>

        {isLoggedIn && (
          <>
            <Link
              href="/trip"
              className={`hover:text-blue-300 transition-colors ${isActive('/trip') ? 'text-blue-300 font-medium' : ''}`}
            >
              Plan Trip
            </Link>
            <Link
              href="/my-trips"
              className={`hover:text-blue-300 transition-colors ${isActive('/my-trips') ? 'text-blue-300 font-medium' : ''}`}
            >
              My Trips
            </Link>
            <Link
              href="/recommendations"
              className={`hover:text-blue-300 transition-colors ${isActive('/recommendations') ? 'text-blue-300 font-medium' : ''}`}
            >
              Recommendations
            </Link>
          </>
        )}

        {isAdmin && (
          <Link
            href="/admin"
            className={`hover:text-blue-300 transition-colors ${isActive('/admin') ? 'text-blue-300 font-medium' : ''}`}
          >
            Admin
          </Link>
        )}

        {!isLoggedIn ? (
          <>
            <Link
              href="/login"
              className={`hover:text-blue-300 transition-colors ${isActive('/login') ? 'text-blue-300 font-medium' : ''}`}
            >
              Login
            </Link>
            <Link
              href="/register"
              className={`hover:text-blue-300 transition-colors ${isActive('/register') ? 'text-blue-300 font-medium' : ''}`}
            >
              Register
            </Link>
          </>
        ) : (
          <Button
            onClick={handleLogout}
            variant="outline"
            className="ml-4 border-red-500 text-red-400 hover:bg-red-900/30 hover:text-red-300"
          >
            Logout
          </Button>
        )}
      </div>
    </nav>
  )
}
