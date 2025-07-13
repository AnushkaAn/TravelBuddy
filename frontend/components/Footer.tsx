'use client'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-blue-900/20 backdrop-blur-md border-t border-blue-800/50 p-6 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold text-blue-300 mb-4">TravelBuddy AI</h3>
          <p className="text-blue-100">
            Your smart travel companion powered by AI to help you plan perfect trips.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-blue-300 mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="/" className="text-blue-100 hover:text-blue-300 transition-colors">Home</Link></li>
            <li><Link href="/trip" className="text-blue-100 hover:text-blue-300 transition-colors">Plan Trip</Link></li>
            <li><Link href="/my-trips" className="text-blue-100 hover:text-blue-300 transition-colors">My Trips</Link></li>
            <li><Link href="/login" className="text-blue-100 hover:text-blue-300 transition-colors">Login</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-blue-300 mb-4">Contact</h4>
          <p className="text-blue-100">Email: support@travelbuddy.ai</p>
          <p className="text-blue-100">Phone: +1 (555) 123-4567</p>
        </div>
      </div>
      <div className="border-t border-blue-800/50 mt-8 pt-6 text-center text-blue-100">
        <p>© {new Date().getFullYear()} TravelBuddy AI. All rights reserved.</p>
      </div>
    </footer>
  )
}