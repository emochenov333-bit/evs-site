import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button, ArrowIcon, PdfIcon } from '../ui/Button'
import { Reveal } from '../motion/Reveal'
import './Hero.css'

const stats = [
  { value: '20+', label: 'объектов' },
  { value: '7', label: 'направлений' },
  { value: '100%', label: 'под ключ' },
]

const presentations = [
  {
    label: 'Презентации компании',
    href: '/company-presentation.pdf',
  },
  
  {
    label: 'Презентации компании 2',
    href: '/company-presentation.pdf',
  },

] as const

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section className="hero" ref={ref} id="hero">
      <motion.div className="hero__bg" style={{ y: bgY }}>
        <div className="hero__mesh" aria-hidden />
        <div className="hero__grid" aria-hidden />
        <motion.div
          className="hero__orb hero__orb--1"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="hero__orb hero__orb--2"
          animate={{ x: [0, -40, 0], y: [0, 25, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="hero__orb hero__orb--3"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="hero__vignette" aria-hidden />
        <motion.div
          className="hero__scanline"
          animate={{ y: ['-100%', '200%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          aria-hidden
        />
      </motion.div>

      <motion.div className="container hero__content" style={{ y: contentY, opacity }}>
        <Reveal delay={0.1}>
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            Инженерия · Строительство · Монтаж
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <h1 className="hero__title">
            Инженерные системы
            <br />
            <span className="hero__title-accent">и строительство</span>
            <br />
            под ключ
          </h1>
        </Reveal>

        <Reveal delay={0.35}>
          <p className="hero__subtitle">
            От котлована до запуска объекта — полный цикл строительных и инженерных работ для
            коммерческих и промышленных площадок.
          </p>
        </Reveal>

        <Reveal delay={0.45}>
          <div className="hero__actions">
            <Button href="#form" variant="primary" icon={<ArrowIcon />}>
              Обсудить проект
            </Button>
            <Button href="#services" variant="secondary">
              Наши услуги
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="hero__presentations">
            {presentations.map((item) => (
              <Button
                key={item.href}
                href={item.href}
                variant="presentation"
                icon={<PdfIcon />}
                target="_blank"
                rel="noopener noreferrer"
                className="hero__presentation-btn"
              >
                {item.label}
              </Button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.55}>
          <div className="hero__stats">
            {stats.map((s) => (
              <div key={s.label} className="hero__stat glass glass-glow">
                <span className="hero__stat-value">{s.value}</span>
                <span className="hero__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </motion.div>

      <motion.a
        href="#services"
        className="hero__scroll"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Вниз"
      >
        <span className="hero__scroll-text">Scroll</span>
        <span className="hero__scroll-bar" />
      </motion.a>
    </section>
  )
}
