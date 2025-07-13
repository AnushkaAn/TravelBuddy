'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/world-map.svg')] bg-no-repeat bg-center opacity-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl z-10"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
          ✈️ Welcome to TravelBuddy AI
        </h1>
        <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Discover affordable flights, hotels, cafes & personalized recommendations powered by AI.
          Plan your perfect trip with ease!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => router.push('/trip')} 
            className="btn-primary"
          >
            Start Planning
          </Button>
          <Button 
            variant="outline" 
            onClick={() => router.push('/login')}
            className="btn-outline"
          >
            Login / Register
          </Button>
        </div>
      </motion.div>

      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-blue-300"
        >
          ↓ Scroll to explore ↓
        </motion.div>
      </div>
    </div>
  )
}