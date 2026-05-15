import { AnimatePresence, motion } from 'framer-motion'
import './Toast.css'

export type ToastType = 'success' | 'error'

interface ToastProps {
  message: string
  type: ToastType
  visible: boolean
  onClose: () => void
}

export function Toast({ message, type, visible, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`toast toast--${type}`}
          role="alert"
          aria-live="polite"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        >
          <span className="toast__icon" aria-hidden>
            {type === 'success' ? '✓' : '!'}
          </span>
          <p className="toast__text">{message}</p>
          <button type="button" className="toast__close" onClick={onClose} aria-label="Закрыть">
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
