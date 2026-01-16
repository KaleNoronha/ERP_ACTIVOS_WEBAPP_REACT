import { ReactNode } from 'react'

export interface Column<T> {
  key: keyof T | string
  label: string
  render?: (value: unknown, item: T) => ReactNode
  width?: string
  align?: 'left' | 'center' | 'right'
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  onRowClick?: (item: T) => void
  emptyMessage?: string
  actions?: (item: T) => ReactNode
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  onRowClick,
  emptyMessage = 'No hay datos disponibles',
  actions,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={`
                    px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider
                    ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'}
                  `}
                  style={{ width: col.width }}
                >
                  {col.label}
                </th>
              ))}
              {actions && (
                <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                  Acciones
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item) => (
              <tr
                key={item.id}
                onClick={() => onRowClick?.(item)}
                className={`
                  group transition-colors
                  ${onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
                `}
              >
                {columns.map((col) => {
                  const value = item[col.key as keyof T]
                  return (
                    <td
                      key={String(col.key)}
                      className={`
                        px-5 py-4 text-sm text-gray-700
                        ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'}
                      `}
                    >
                      {col.render ? col.render(value, item) : String(value ?? '')}
                    </td>
                  )
                })}
                {actions && (
                  <td className="px-5 py-4 text-sm text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {actions(item)}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
