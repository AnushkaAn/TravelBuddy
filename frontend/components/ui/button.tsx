import { forwardRef } from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import type { MotionProps } from "framer-motion"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg",
        outline: "border border-blue-500 bg-transparent text-blue-400 hover:bg-blue-900/30 hover:text-white",
        destructive: "bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 px-4",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonProps = {
  variant?: "default" | "outline" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
} & React.ButtonHTMLAttributes<HTMLButtonElement> & 
   MotionProps

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    const MotionButton = motion.button
    
    return (
      <MotionButton
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }