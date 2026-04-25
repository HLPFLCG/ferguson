'use client'

import { useEffect } from 'react'

interface ToastProps {
  message: string
  onClose: () => void
}

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-jungle text-sand px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 max-w-md">
        <span className="text-2xl">🌴</span>
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-2 text-sand/60 hover:text-sand transition-colors text-lg leading-none"
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  )
}
