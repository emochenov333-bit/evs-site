import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { services, type ServiceCategory } from '../../data/services'
import { getServiceGalleryImages } from '../../lib/assetImages'
import { SectionHeader } from '../ui/SectionHeader'
import { Stagger, StaggerItem } from '../motion/Reveal'
import { ServiceIcon } from '../icons/ServiceIcons'
import { MediaGalleryModal } from '../Gallery/MediaGalleryModal'
import { ServiceCard } from './ServiceCard'
import './Services.css'

interface GalleryState {
  service: ServiceCategory
  images: string[]
}

function resolveGalleryFolders(service: ServiceCategory): string[] {
  if (service.galleryId) {
    return Array.isArray(service.galleryId) ? service.galleryId : [service.galleryId]
  }
  return [service.id]
}

export function Services() {
  const [active, setActive] = useState(services[0].id)
  const [gallery, setGallery] = useState<GalleryState | null>(null)

  const current = services.find((s) => s.id === active) ?? services[0]

  const serviceMeta = useMemo(
    () =>
      services.map((service) => {
        const folders = resolveGalleryFolders(service)
        const images = getServiceGalleryImages(folders)
        return {
          service,
          images,
          cover: images[0],
          count: images.length,
        }
      }),
    [],
  )

  const openGallery = (service: ServiceCategory) => {
    const images = getServiceGalleryImages(resolveGalleryFolders(service))
    setGallery({ service, images })
  }

  const currentMeta = serviceMeta.find((m) => m.service.id === current.id)

  return (
    <section className="section services" id="services">
      <motion.div
        className="services__glow"
        aria-hidden
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="container">
        <SectionHeader
          label="Услуги"
          title="Полный спектр инженерных и строительных работ"
          description="От котлована до сдачи объекта — все направления в одном подрядчике с единой ответственностью."
        />

        <div className="services__layout">
          <Stagger className="services__tabs" stagger={0.05}>
            {services.map((s) => (
              <StaggerItem key={s.id}>
                <button
                  type="button"
                  className={`services__tab ${active === s.id ? 'is-active' : ''}`}
                  onClick={() => setActive(s.id)}
                >
                  <ServiceIcon name={s.icon} className="services__tab-icon" />
                  <span>{s.title}</span>
                </button>
              </StaggerItem>
            ))}
          </Stagger>

          <AnimatePresence mode="wait">
            <motion.article
              key={current.id}
              className="services__panel glass glass-glow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div className="services__panel-head">
                <div className="services__panel-icon">
                  <ServiceIcon name={current.icon} className="services__panel-icon-svg" />
                </div>
                <div>
                  <h3 className="services__panel-title">{current.title}</h3>
                  <p className="services__panel-sub">Что входит в работы</p>
                </div>
                <button
                  type="button"
                  className="services__panel-gallery-btn"
                  onClick={() => openGallery(current)}
                >
                  {currentMeta && currentMeta.count > 0
                    ? `Портфолио (${currentMeta.count})`
                    : 'Открыть галерею'}
                </button>
              </motion.div>
              <ul className="services__list">
                {current.items.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * i }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.article>
          </AnimatePresence>
        </div>

        <Stagger className="services__grid" stagger={0.07} delayChildren={0.15}>
          {serviceMeta.map(({ service, cover, count }) => (
            <StaggerItem key={service.id} className="services__grid-item">
              <ServiceCard
                service={service}
                cover={cover}
                imageCount={count}
                onOpen={() => openGallery(service)}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <MediaGalleryModal
        open={Boolean(gallery)}
        title={gallery?.service.title ?? ''}
        subtitle="Портфолио работ"
        images={gallery?.images ?? []}
        onClose={() => setGallery(null)}
      />
    </section>
  )
}
