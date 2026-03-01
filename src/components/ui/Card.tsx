import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const variantStyles = {
  default: 'bg-white shadow-md hover:shadow-xl',
  glass: 'backdrop-blur-xl bg-white/10 border border-white/20',
  outlined: 'bg-white border border-gray-200 hover:border-brand-300',
} as const

interface CardProps {
  children: ReactNode
  variant?: keyof typeof variantStyles
  className?: string
  hover?: boolean
}

export function Card({ children, variant = 'default', className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl p-6',
        variantStyles[variant],
        hover && 'transition-all duration-300 hover:-translate-y-1',
        className
      )}
    >
      {children}
    </div>
  )
}
