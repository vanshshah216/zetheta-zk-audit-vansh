import { ReactNode } from 'react'

interface PageContainerProps {
  title: string
  description?: string
  children: ReactNode
  actions?: ReactNode
  breadcrumb?: ReactNode
}

export function PageContainer({
  title,
  description,
  children,
  actions,
  breadcrumb,
}: PageContainerProps) {
  return (
    <div className="min-h-screen bg-background">
      {breadcrumb && (
        <div className="border-b border-border bg-card/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            {breadcrumb}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
            {description && (
              <p className="text-muted-foreground">{description}</p>
            )}
          </div>
          {actions && (
            <div className="flex gap-4">
              {actions}
            </div>
          )}
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  )
}
