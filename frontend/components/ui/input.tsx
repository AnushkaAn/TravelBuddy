import * as React from "react"
import { cn } from "@/lib/utils"
import { motion, MotionProps } from "framer-motion"

type MotionInputProps = React.InputHTMLAttributes<HTMLInputElement> & MotionProps

const MotionInput = motion.input

const Input = React.forwardRef<HTMLInputElement, MotionInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <MotionInput
        whileFocus={{ scale: 1.01 }}
        type={type}
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md border border-blue-800/50 bg-blue-900/30 px-3 py-2 text-sm text-white placeholder:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }