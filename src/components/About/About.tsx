import { motion } from 'framer-motion'
import { Reveal } from '../motion/Reveal'
import { Button, ArrowIcon } from '../ui/Button'
import './About.css'

const metrics = [
  { value: '10+', label: 'лет опыта' },
  { value: '50+', label: 'специалистов' },
  { value: '20+', label: 'объектов' },
]

export function About() {
  return (
    <section className="section about" id="about">
      <div className="container about__grid">
        <Reveal direction="left" className="about__content">
          <span className="section-label">О компании</span>
          <h2 className="section-title about__title">
            Инженерия и строительство
            <span className="about__accent"> для бизнеса</span>
          </h2>
          <p className="about__text">
            EVS Монтаж — команда инженеров и строителей, которая ведёт коммерческие и
            промышленные объекты от котлована до запуска. Торговые центры, заводы, жилые
            комплексы и медицинские учреждения.
          </p>
          <p className="about__text">
            Единый подрядчик, прозрачная смета, собственные специалисты и гарантия на все виды
            работ — без посредников и разрывов ответственности.
          </p>
          <Button href="#form" variant="primary" icon={<ArrowIcon />}>
            Обсудить проект
          </Button>
        </Reveal>

        <Reveal direction="right" delay={0.15} className="about__visual">
          <motion.div
            className="about__card glass glass-glow"
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="about__card-glow" aria-hidden />
            {metrics.map((m, i) => (
              <div key={m.label} className="about__metric">
                <motion.span
                  className="about__metric-value"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  {m.value}
                </motion.span>
                <span className="about__metric-label">{m.label}</span>
                {i < metrics.length - 1 && <div className="about__divider" />}
              </div>
            ))}
          </motion.div>

          <motion.div
            className="about__badge glass"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="about__badge-icon">✓</span>
            <div>
              <strong>Сертифицированные специалисты</strong>
              <span>Допуски СРО и лицензии</span>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}
