import { motion } from 'framer-motion'
import { workCycleSteps } from '../../data/workCycle'
import { SectionHeader } from '../ui/SectionHeader'
import { Stagger, StaggerItem } from '../motion/Reveal'
import { ServiceIcon } from '../icons/ServiceIcons'
import './WorkCycle.css'

export function WorkCycle() {
  return (
    <section className="section cycle" id="cycle">
      <div className="container">
        <SectionHeader
          label="Процесс"
          title="Полный цикл работ"
          description="От проектирования до торжественной сдачи — контролируем каждый этап с единой командой."
        />

        <div className="cycle__track">
          <div className="cycle__line" aria-hidden>
            <motion.div
              className="cycle__line-fill"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <Stagger className="cycle__steps" stagger={0.1}>
            {workCycleSteps.map((step) => (
              <StaggerItem key={step.id}>
                <motion.div
                  className="cycle__step"
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                >
                  <div className="cycle__node glass glass-glow">
                    <span className="cycle__num">{String(step.id).padStart(2, '0')}</span>
                    <div className="cycle__icon-wrap">
                      <ServiceIcon name={step.icon} className="cycle__icon" />
                    </div>
                  </div>
                  <h3 className="cycle__title">{step.title}</h3>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
