'use client'

import { ReactNode } from 'react'

export interface DataColumn {
  key: string
  label: string
  render?: (value: any, row: any) => ReactNode
  className?: string
}

interface DataTableProps {
  columns: DataColumn[]
  data: any[]
  isLoading?: boolean
  onRowClick?: (row: any) => void
  rowClassName?: string
}

export function DataTable({
  columns,
  data,
  isLoading,
  onRowClick,
  rowClassName = '',
}: DataTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 bg-card rounded-lg border border-border animate-pulse" />
        ))}
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="p-8 text-center bg-card rounded-lg border border-border">
        <p className="text-muted-foreground">No data available</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-4 py-3 text-left text-sm font-semibold text-muted-foreground ${
                  column.className || ''
                }`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              onClick={() => onRowClick?.(row)}
              className={`border-b border-border hover:bg-muted/50 transition-colors ${
                onRowClick ? 'cursor-pointer' : ''
              } ${rowClassName}`}
            >
              {columns.map((column) => (
                <td key={column.key} className={`px-4 py-3 text-sm ${column.className || ''}`}>
                  {column.render
                    ? column.render(row[column.key], row)
                    : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
