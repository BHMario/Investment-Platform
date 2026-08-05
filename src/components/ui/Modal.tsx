import React from 'react'

const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title?: string; children?: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
  const ref = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (!isOpen) return
    const previousActive = document.activeElement as HTMLElement | null
    const focusable = ref.current?.querySelector<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    focusable?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      previousActive?.focus()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div ref={ref} className="bg-white rounded-md p-6 z-10 w-full max-w-lg shadow-lg">
        {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
        <div>{children}</div>
        <div className="mt-4 text-right">
          <button onClick={onClose} className="px-4 py-2 bg-slate-100 rounded">Close</button>
        </div>
      </div>
    </div>
  )
}

export default Modal
