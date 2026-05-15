import { motion } from 'framer-motion'
import type { ServiceCategory } from '../../data/services'
import { ServiceIcon } from '../icons/ServiceIcons'
import './ServiceCard.css'

interface ServiceCardProps {
  service: ServiceCategory
  cover?: string
  imageCount: number
  onOpen: () => void
}

export function ServiceCard({ service, cover, imageCount, onOpen }: ServiceCardProps) {
  return (
    <motion.article
      className="service-card glass glass-glow"
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen()
        }
      }}
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 380, damping: 26 }}
      aria-label={`Открыть галерею: ${service.title}`}
    >
      <span className="service-card__shine" aria-hidden />

      {cover ? (
        <span className="service-card__media">
          <img src={cover} alt="" loading="lazy" decoding="async" />
          <span className="service-card__media-overlay" aria-hidden />
          {imageCount > 0 && <span className="service-card__badge">{imageCount} фото</span>}
        </span>
      ) : (
        <span className="service-card__media service-card__media--placeholder">
          <ServiceIcon name={service.icon} className="service-card__placeholder-icon" />
        </span>
      )}

      <span className="service-card__body">
        <span className="service-card__icon">
          <ServiceIcon name={service.icon} />
        </span>
        <h4 className="service-card__title">{service.title}</h4>
        <p className="service-card__meta">
          {imageCount > 0
            ? `${imageCount} фото · ${service.items.length} видов работ`
            : `${service.items.length} видов работ`}
        </p>
        <span className="service-card__cta">
          {imageCount > 0 ? 'Смотреть работы' : 'Открыть раздел'}
          <span aria-hidden>→</span>
        </span>
      </span>
    </motion.article>
  )
}
