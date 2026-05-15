import { useState } from 'react'
import { motion } from 'framer-motion'
import { projects, type Project } from '../../data/projects'
import { getProjectImages, getProjectCover } from '../../lib/projectImages'
import { SectionHeader } from '../ui/SectionHeader'
import { Stagger, StaggerItem } from '../motion/Reveal'
import { ProjectGalleryModal } from '../Gallery/ProjectGalleryModal'
import './Projects.css'

const gradients = [
  'linear-gradient(135deg, #1e3a5f 0%, #0d1520 100%)',
  'linear-gradient(135deg, #1a2f4a 0%, #0a1018 100%)',
  'linear-gradient(135deg, #152a45 0%, #080c14 100%)',
  'linear-gradient(135deg, #1c3352 0%, #0b121c 100%)',
  'linear-gradient(135deg, #182d48 0%, #090e16 100%)',
  'linear-gradient(135deg, #1f3658 0%, #0c111a 100%)',
]

function getInitials(name: string) {
  return name
    .replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase()
}

export function Projects() {
  const [gallery, setGallery] = useState<{
    project: Project
    images: string[]
    index: number
  } | null>(null)

  const openGallery = (project: Project, images: string[], index = 0) => {
    if (images.length === 0) return
    setGallery({ project, images, index })
  }

  const closeGallery = () => setGallery(null)

  return (
    <section className="section projects" id="projects">
      <div className="container">
        <SectionHeader
          label="Портфолио"
          title="Выполненные объекты"
          description="Торговые центры, промышленность, жилые комплексы и медицинские учреждения."
        />

        <Stagger className="projects__grid" stagger={0.1}>
          {projects.map((project, i) => {
            const images = getProjectImages(project.id)
            const cover = getProjectCover(project.id)
            const hasGallery = images.length > 0

            return (
              <StaggerItem key={project.id}>
                <motion.article
                  className="projects__card"
                  whileHover={{ y: -10 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                >
                  <button
                    type="button"
                    className={`projects__visual ${hasGallery ? 'projects__visual--has-photo' : ''}`}
                    style={!cover ? { background: gradients[i % gradients.length] } : undefined}
                    onClick={() => openGallery(project, images)}
                    disabled={!hasGallery}
                    aria-label={hasGallery ? `Открыть галерею: ${project.name}` : undefined}
                  >
                    <div className="projects__visual-grid" aria-hidden />
                    <motion.span
                      className="projects__glow"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      aria-hidden
                    />

                    {cover ? (
                      <>
                        <img
                          src={cover}
                          alt={project.name}
                          className="projects__img"
                          loading="lazy"
                          decoding="async"
                        />
                        {images.length > 1 && (
                          <span className="projects__photo-count">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                              <rect x="3" y="3" width="18" height="18" rx="2" />
                              <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none" />
                              <path d="M21 15l-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {images.length}
                          </span>
                        )}
                        <span className="projects__zoom-hint" aria-hidden>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="7" />
                            <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" strokeLinecap="round" />
                          </svg>
                        </span>
                      </>
                    ) : (
                      <span className="projects__initials">{getInitials(project.name)}</span>
                    )}
                  </button>

                  <div className="projects__body glass">
                    <span className="projects__cat">{project.category}</span>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    {hasGallery && (
                      <button
                        type="button"
                        className="projects__gallery-link"
                        onClick={() => openGallery(project, images)}
                      >
                        Смотреть фото
                        <span aria-hidden>→</span>
                      </button>
                    )}
                  </div>
                </motion.article>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>

      <ProjectGalleryModal
        project={gallery?.project ?? null}
        images={gallery?.images ?? []}
        index={gallery?.index ?? 0}
        onClose={closeGallery}
        onIndexChange={(index) =>
          setGallery((prev) => (prev ? { ...prev, index } : null))
        }
      />
    </section>
  )
}
