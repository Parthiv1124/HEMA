import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const variantStyles = {
  default: 'bg-brand-100 text-brand-700',
  success: 'bg-green-100 text-green-700',
  gold: 'bg-amber-100 text-amber-700',
  outline: 'border border-brand-300 text-brand-600 bg-transparent',
} as const

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
} as const

interface BadgeProps {
  children: ReactNode
  variant?: keyof typeof variantStyles
  size?: keyof typeof sizeStyles
  className?: string
}

export function Badge({ children, variant = 'default', size = 'md', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  )
}
