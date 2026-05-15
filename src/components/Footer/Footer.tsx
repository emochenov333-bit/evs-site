import { motion } from 'framer-motion'
import { contacts } from '../../data/contacts'
import { WhatsAppIcon, TelegramIcon } from '../icons/ServiceIcons'
import { Reveal } from '../motion/Reveal'
import './Footer.css'

const nav = [
  { href: '#services', label: 'Услуги' },
  { href: '#cycle', label: 'Этапы' },
  { href: '#projects', label: 'Объекты' },
  { href: '#about', label: 'О компании' },
  { href: '#form', label: 'Заявка' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" id="contact">
      <div className="footer__line" aria-hidden />
      <div className="container">
        <Reveal>
          <motion.div className="footer__cta glass glass-glow">
            <motion.div
              className="footer__cta-glow"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
              aria-hidden
            />
            <div>
              <h2>Готовы обсудить проект?</h2>
              <p>Свяжитесь с нами удобным способом — ответим в рабочее время.</p>
            </div>
            <div className="footer__cta-actions">
              <a href={contacts.phoneHref} className="footer__phone">
                {contacts.phone}
              </a>
              <a href={contacts.emailHref} className="footer__email">
                {contacts.email}
              </a>
            </div>
          </motion.div>
        </Reveal>

        <div className="footer__grid">
          <div className="footer__brand">
            <a href="#" className="footer__logo">
              <span>EVS</span> Монтаж
            </a>
            <p>Инженерные системы и строительство под ключ для бизнеса.</p>
          </div>

          <nav className="footer__nav">
            <h4>Навигация</h4>
            <ul>
              {nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__social">
            <h4>Мессенджеры</h4>
            <div className="footer__messengers">
              <motion.a
                href={contacts.whatsapp}
                className="footer__wa"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <WhatsAppIcon />
                WhatsApp
              </motion.a>
              <motion.a
                href={contacts.telegram}
                className="footer__tg"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <TelegramIcon />
                Telegram
              </motion.a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {year} EVS Монтаж. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
