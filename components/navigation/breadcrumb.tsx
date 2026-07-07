import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
          {item.href ? (
            <Link
              href={item.href}
              className="text-sm text-cyan hover:text-cyan/80 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-sm text-muted-foreground">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
