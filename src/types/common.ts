import type { ReactNode } from 'react'

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export interface Certification {
  name: string
  description?: string
}

export interface Partner {
  name: string
  logoUrl?: string
}

export interface TimelineEvent {
  year: number
  title: string
  description: string
}

export interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
}
