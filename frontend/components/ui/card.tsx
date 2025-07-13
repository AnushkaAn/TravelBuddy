import React from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export default function Card({ title, children, className = '' }: CardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`bg-blue-900/20 backdrop-blur-sm border border-blue-800/50 rounded-xl p-6 shadow-lg transition-all ${className}`}
    >
      {title && <h2 className="text-xl font-semibold mb-4 text-blue-300">{title}</h2>}
      <div className="text-blue-100">
        {children}
      </div>
    </motion.div>
  )
}