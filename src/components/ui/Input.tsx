import React from 'react'

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
}

const Input: React.FC<Props> = ({ label, error, className = '', ...rest }) => {
  return (
    <label className="block">
      {label && <span className="text-sm text-slate-700 mb-1 block">{label}</span>}
      <input
        className={`w-full px-3 py-2 border rounded-md bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary-400 ${className}`}
        {...rest}
      />
      {error && <p className="text-sm text-danger-500 mt-1">{error}</p>}
    </label>
  )
}

export default Input
