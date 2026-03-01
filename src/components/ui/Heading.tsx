import { type ElementType, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

const levelStyles = {
  h1: 'text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight',
  h2: 'text-3xl md:text-4xl font-bold tracking-tight',
  h3: 'text-2xl md:text-3xl font-semibold',
  h4: 'text-xl md:text-2xl font-semibold',
  h5: 'text-lg md:text-xl font-semibold',
  h6: 'text-base md:text-lg font-semibold',
} as const

type HeadingLevel = keyof typeof levelStyles

interface HeadingProps {
  as?: HeadingLevel
  children: ReactNode
  className?: string
  dark?: boolean
}

export function Heading({ as: Tag = 'h2', children, className, dark }: HeadingProps) {
  return (
    <Tag
      className={cn(
        levelStyles[Tag],
        dark ? 'text-white' : 'text-gray-900',
        className
      )}
    >
      {children}
    </Tag>
  )
}
