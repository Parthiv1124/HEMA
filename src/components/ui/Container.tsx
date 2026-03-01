import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const sizeStyles = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-[1440px]',
} as const

interface ContainerProps {
  children: ReactNode
  size?: keyof typeof sizeStyles
  className?: string
}

export function Container({ children, size = 'xl', className }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizeStyles[size], className)}>
      {children}
    </div>
  )
}
