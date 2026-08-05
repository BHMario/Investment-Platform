import React from 'react'

const Badge: React.FC<{ children: React.ReactNode; tone?: 'neutral' | 'success' | 'warning' | 'danger' }> = ({ children, tone = 'neutral' }) => {
  const toneClasses: Record<string, string> = {
    neutral: 'bg-slate-100 text-slate-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-amber-100 text-amber-800',
    danger: 'bg-red-100 text-red-800',
  }
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-sm ${toneClasses[tone]}`}>{children}</span>
}

export default Badge
