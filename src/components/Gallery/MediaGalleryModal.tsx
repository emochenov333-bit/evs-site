import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, type PanInfo } from 'framer-motion'
import './MediaGalleryModal.css'

const SWIPE_THRESHOLD = 80
const SWIPE_VELOCITY = 400

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
}

export interface MediaGalleryModalProps {
  open: boolean
  title: string
  subtitle?: string
  images: string[]
  initialIndex?: number
  onClose: () => void
}

export function MediaGalleryModal({
  open,
  title,
  subtitle,
  images,
  initialIndex = 0,
  onClose,
}: MediaGalleryModalProps) {
  const [view, setView] = useState<'grid' | 'preview'>('grid')
  const [index, setIndex] = useState(initialIndex)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    if (open) {
      setView('grid')
      setIndex(initialIndex)
      setDirection(0)
    }
  }, [open, initialIndex])

  const hasImages = images.length > 0
  const current = images[index]
  const hasMultiple = images.length > 1

  const paginate = useCallback(
    (delta: number) => {
      if (!hasMultiple) return
      setDirection(delta)
      setIndex((i) => {
        const next = i + delta
        if (next < 0) return images.length - 1
        if (next >= images.length) return 0
        return next
      })
    },
    [hasMultiple, images.length],
  )

  const goPrev = useCallback(() => paginate(-1), [paginate])
  const goNext = useCallback(() => paginate(1), [paginate])

  const openPreview = (i: number) => {
    setIndex(i)
    setDirection(0)
    setView('preview')
  }

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info
    if (offset.x < -SWIPE_THRESHOLD || velocity.x < -SWIPE_VELOCITY) goNext()
    else if (offset.x > SWIPE_THRESHOLD || velocity.x > SWIPE_VELOCITY) goPrev()
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (view === 'preview') setView('grid')
        else onClose()
      }
      if (view === 'preview') {
        if (e.key === 'ArrowLeft') goPrev()
        if (e.key === 'ArrowRight') goNext()
      }
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, view, onClose, goPrev, goNext])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="media-gallery"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button type="button" className="media-gallery__backdrop" aria-label="Закрыть" onClick={onClose} />

          <motion.div
            className="media-gallery__panel glass"
            initial={{ opacity: 0, scale: 0.94, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <header className="media-gallery__header">
              <motion.div className="media-gallery__head-text" layout>
                {view === 'preview' && (
                  <button
                    type="button"
                    className="media-gallery__back"
                    onClick={() => setView('grid')}
                  >
                    ← Все фото
                  </button>
                )}
                {subtitle && <span className="media-gallery__subtitle">{subtitle}</span>}
                <h2 className="media-gallery__title">{title}</h2>
              </motion.div>
              <button type="button" className="media-gallery__close" onClick={onClose} aria-label="Закрыть">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </header>

            <AnimatePresence mode="wait">
              {view === 'grid' ? (
                <motion.div
                  key="grid"
                  className="media-gallery__grid-wrap"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  {!hasImages ? (
                    <motion.div
                      className="media-gallery__empty"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <p>Фотографии для этого раздела скоро появятся.</p>
                      <span className="media-gallery__empty-hint">
                        Папка: src/assets/projects/
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div className="media-gallery__grid">
                      {images.map((src, i) => (
                        <motion.button
                          key={`${src}-${i}`}
                          type="button"
                          className="media-gallery__grid-item"
                          onClick={() => openPreview(i)}
                          initial={{ opacity: 0, scale: 0.92 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.04, duration: 0.4 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <img src={src} alt="" loading="lazy" decoding="async" />
                          <span className="media-gallery__grid-zoom" aria-hidden>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="11" cy="11" r="7" />
                              <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" strokeLinecap="round" />
                            </svg>
                          </span>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              ) : hasImages && current ? (
                <motion.div
                  key="preview"
                  className="media-gallery__preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {hasMultiple && (
                    <button type="button" className="media-gallery__nav media-gallery__nav--prev" onClick={goPrev} aria-label="Назад">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  )}

                  <motion.div className="media-gallery__stage" drag={hasMultiple ? 'x' : false} dragConstraints={{ left: 0, right: 0 }} dragElastic={0.15} onDragEnd={onDragEnd}>
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div
                        key={current}
                        className="media-gallery__slide"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <img src={current} alt={`${title} — ${index + 1}`} className="media-gallery__image" draggable={false} />
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>

                  {hasMultiple && (
                    <button type="button" className="media-gallery__nav media-gallery__nav--next" onClick={goNext} aria-label="Вперёд">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  )}

                  {hasMultiple && (
                    <footer className="media-gallery__footer">
                      <p className="media-gallery__counter">
                        {index + 1} / {images.length}
                      </p>
                      <motion.div className="media-gallery__thumbs" layout>
                        {images.map((src, i) => (
                          <button
                            key={src}
                            type="button"
                            className={`media-gallery__thumb ${i === index ? 'is-active' : ''}`}
                            onClick={() => {
                              setDirection(i > index ? 1 : -1)
                              setIndex(i)
                            }}
                            aria-label={`Фото ${i + 1}`}
                          >
                            <img src={src} alt="" loading="lazy" />
                          </button>
                        ))}
                      </motion.div>
                    </footer>
                  )}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
