import React from 'react'

// Type-only callback parameter name is intentional for readability.
// eslint-disable-next-line no-unused-vars
type Column<T> = { key: string; label: string; render?: (row: T) => React.ReactNode }

const Table = <T extends Record<string, any>>({ columns, data }: { columns: Column<T>[]; data: T[] | null | undefined }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="rounded-2xl bg-slate-50 p-6 text-slate-600">No hay datos disponibles.</div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="px-4 py-2 text-sm text-slate-600">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-t">
              {columns.map((c) => (
                <td key={c.key} className="px-4 py-3 text-sm text-slate-900">
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
