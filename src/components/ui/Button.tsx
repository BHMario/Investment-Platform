import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  loading?: boolean
}

const Button: React.FC<Props> = ({ children, variant = 'primary', className = '', loading = false, disabled, ...rest }) => {
  const base = 'inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variants: Record<string, string> = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-300',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-200',
    ghost: 'bg-transparent text-primary-600 hover:bg-primary-50 focus:ring-primary-200',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-300',
  }

  const isDisabled = disabled || loading

  return (
    <button
      className={`${base} ${variants[variant]} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
      )}
      <span>{children}</span>
    </button>
  )
}

export default Button
