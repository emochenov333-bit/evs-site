import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/Button'
import './Header.css'

const links = [
  { href: '#services', label: 'Услуги' },
  { href: '#cycle', label: 'Этапы' },
  { href: '#projects', label: 'Объекты' },
  { href: '#advantages', label: 'Преимущества' },
  { href: '#about', label: 'О компании' },
  { href: '#contact', label: 'Контакты' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`header ${scrolled ? 'header--solid' : ''}`}>
      <div className="container header__row">
        <a href="#" className="header__brand" onClick={close}>
          <span className="header__logo">EVS</span>
          <span className="header__name">Монтаж</span>
        </a>

        <nav className="header__nav" aria-label="Навигация">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="header__link">
              {l.label}
            </a>
          ))}
        </nav>

        <Button href="#form" variant="primary" className="header__cta">
          Обсудить проект
        </Button>

        <button
          type="button"
          className={`header__burger ${open ? 'is-open' : ''}`}
          aria-label={open ? 'Закрыть' : 'Меню'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="header__backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
            />
            <motion.nav
              className="header__drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            >
              <div className="header__drawer-inner">
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    className="header__drawer-link"
                    onClick={close}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <span className="header__drawer-num">0{i + 1}</span>
                    {l.label}
                  </motion.a>
                ))}
                <Button href="#form" variant="primary" className="header__drawer-cta" onClick={close}>
                  Оставить заявку
                </Button>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
