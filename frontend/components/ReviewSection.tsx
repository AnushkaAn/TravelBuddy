'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Star } from 'lucide-react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface ReviewSectionProps {
  tripId: number
}

export default function ReviewSection({ tripId }: ReviewSectionProps) {
  const [rating, setRating] = useState(0)
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    if (!rating || !content) return
    setSubmitting(true)
    
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        'http://localhost:8000/reviews',
        { trip_id: tripId, rating, content },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setRating(0)
      setContent('')
      alert('Review submitted successfully!')
      router.refresh()
    } catch (error) {
      console.error(error)
      alert('Failed to submit review')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Leave a Review</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`${star <= rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400`}
            >
              <Star className="w-6 h-6 fill-current" />
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-600">{rating} out of 5</span>
        </div>
        
        <Textarea
          placeholder="Share your experience..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[100px]"
        />
        
        <Button
          onClick={handleSubmit}
          disabled={!rating || !content || submitting}
          className="bg-[var(--primary)] hover:bg-[var(--dark)]"
        >
          {submitting ? 'Submitting...' : 'Submit Review'}
        </Button>
      </div>
    </div>
  )
}