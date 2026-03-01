import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const variantStyles = {
  default: 'bg-white text-gray-900',
  light: 'bg-gray-50 text-gray-900',
  dark: 'bg-navy-900 text-white',
  gradient: 'gradient-hero text-white',
  glass: 'backdrop-blur-xl bg-white/10 text-white',
} as const

interface SectionProps {
  children: ReactNode
  variant?: keyof typeof variantStyles
  className?: string
  id?: string
}

export function Section({ children, variant = 'default', className, id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('py-16 md:py-24', variantStyles[variant], className)}
    >
      {children}
    </section>
  )
}
