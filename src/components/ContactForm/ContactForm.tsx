import { useState, useEffect, useCallback, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { SectionHeader } from '../ui/SectionHeader'
import { Button, ArrowIcon } from '../ui/Button'
import { Toast, type ToastType } from '../ui/Toast'
import { Reveal } from '../motion/Reveal'
import { sendLeadToTelegram } from '../../services/telegram'
import './ContactForm.css'

const EMPTY_FORM = { name: '', phone: '', comment: '' }

const TOAST_DURATION_MS = 4500

export function ContactForm() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null)

  const hideToast = useCallback(() => setToast(null), [])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(hideToast, TOAST_DURATION_MS)
    return () => window.clearTimeout(timer)
  }, [toast, hideToast])

  const updateField = (field: keyof typeof EMPTY_FORM, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log('SUBMIT WORKS')
    
    e.preventDefault()
    if (loading) return

    setLoading(true)
    setToast(null)

    try {
      await sendLeadToTelegram({
        name: form.name,
        phone: form.phone,
        comment: form.comment,
      })

      setForm(EMPTY_FORM)
      setToast({ message: 'Заявка успешно отправлена', type: 'success' })
    } catch {
      setToast({ message: 'Ошибка отправки', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section form-section" id="form">
      <motion.div className="form-section__glow" aria-hidden />
      <Toast
        message={toast?.message ?? ''}
        type={toast?.type ?? 'success'}
        visible={Boolean(toast)}
        onClose={hideToast}
      />

      <div className="container form-section__inner">
        <SectionHeader
          label="Заявка"
          title="Рассчитать стоимость проекта"
          description="Оставьте контакты — инженер свяжется с вами и подготовит предварительную смету."
        />

        <Reveal>
          <form className="form glass glass-glow" onSubmit={onSubmit} noValidate>
            <div className="form__row">
              <label className="form__field">
                <span>Имя</span>
                <input
                  type="text"
                  name="name"
                  required
                  disabled={loading}
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Как к вам обращаться"
                />
              </label>
              <label className="form__field">
                <span>Телефон</span>
                <input
                  type="tel"
                  name="phone"
                  required
                  disabled={loading}
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="+998 (___) ___-__-__"
                />
              </label>
            </div>
            <label className="form__field">
              <span>Комментарий</span>
              <textarea
                name="comment"
                rows={4}
                disabled={loading}
                value={form.comment}
                onChange={(e) => updateField('comment', e.target.value)}
                placeholder="Тип объекта, площадь, сроки, задачи..."
              />
            </label>
            <Button
              type="submit"
              variant="primary"
              icon={!loading ? <ArrowIcon /> : undefined}
              className="form__submit"
              loading={loading}
              disabled={loading}
            >
              {loading ? 'Отправка...' : 'Отправить заявку'}
            </Button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
