import { cn } from '@/lib/utils'

interface SeparatorProps {
  label?: string
  className?: string
}

export function Separator({ label, className }: SeparatorProps) {
  if (label) {
    return (
      <div className={cn('flex items-center gap-4', className)}>
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-sm font-medium text-gray-400">{label}</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>
    )
  }

  return <hr className={cn('border-gray-200', className)} />
}
