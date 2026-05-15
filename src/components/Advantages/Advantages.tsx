import { motion } from 'framer-motion'
import { advantages } from '../../data/advantages'
import { SectionHeader } from '../ui/SectionHeader'
import { Stagger, StaggerItem } from '../motion/Reveal'
import { ServiceIcon } from '../icons/ServiceIcons'
import './Advantages.css'

export function Advantages() {
  return (
    <section className="section advantages" id="advantages">
      <motion.div
        className="advantages__bg"
        aria-hidden
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      />
      <div className="container">
        <SectionHeader
          label="Преимущества"
          title="Почему выбирают EVS Монтаж"
          description="Надёжный партнёр для объектов любой сложности — от ТРЦ до промышленных площадок."
        />

        <Stagger className="advantages__grid" stagger={0.08}>
          {advantages.map((item) => (
            <StaggerItem key={item.id}>
              <motion.article
                className="advantages__card glass glass-glow"
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 400 } }}
              >
                <motion.div
                  className="advantages__icon"
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <ServiceIcon name={item.icon} />
                </motion.div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="advantages__shine" aria-hidden />
              </motion.article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
