import { useState, useEffect, useCallback, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { SectionHeader } from '../ui/SectionHeader'
import { Button, ArrowIcon } from '../ui/Button'
import { Toast, type ToastType } from '../ui/Toast'
import { Reveal } from '../motion/Reveal'
import { sendLeadToTelegram } from '../../services/telegram'
import './ContactForm.css'

const EMPTY_FORM = {
  objectType: '',
  service: '',
  area: '',
  urgency: '',
  phone: '',
}

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
    e.preventDefault()

    if (loading) return

    setLoading(true)
    setToast(null)

    try {
      await sendLeadToTelegram({
        name: 'Калькулятор EVS Монтаж',
        phone: form.phone,
        comment: `
Тип объекта: ${form.objectType}

Тип работ: ${form.service}

Площадь: ${form.area} м²

Срочность: ${form.urgency}
        `,
      })

      setForm(EMPTY_FORM)

      setToast({
        message: 'Заявка успешно отправлена',
        type: 'success',
      })
    } catch {
      setToast({
        message: 'Ошибка отправки',
        type: 'error',
      })
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
          label="Калькулятор"
          title="Рассчитать стоимость проекта"
          description="Заполните параметры объекта и получите предварительный расчет."
        />

        <Reveal>
          <form
            className="form glass glass-glow"
            onSubmit={onSubmit}
            noValidate
          >
            <div className="form__row">
              <label className="form__field">
                <span>Тип объекта</span>

                <select
                  required
                  disabled={loading}
                  value={form.objectType}
                  onChange={(e) =>
                    updateField('objectType', e.target.value)
                  }
                >
                  <option value="">Выберите объект</option>
                  <option value="Квартира">Квартира</option>
                  <option value="Дом">Дом</option>
                  <option value="Офис">Офис</option>
                  <option value="Ресторан">Ресторан</option>
                  <option value="Торговый центр">Торговый центр</option>
                  <option value="Производство">Производство</option>
                </select>
              </label>

              <label className="form__field">
                <span>Тип работ</span>

                <select
                  required
                  disabled={loading}
                  value={form.service}
                  onChange={(e) =>
                    updateField('service', e.target.value)
                  }
                >
                  <option value="">Выберите услугу</option>
                  <option value="Общестрой">Общестрой</option>
                  <option value="Видеонаблюдение">Видеонаблюдение</option>
                  <option value="Пожарная сигнализация">
                    Пожарная сигнализация
                  </option>
                  <option value="СКУД">СКУД</option>
                  <option value="Электромонтаж">Электромонтаж</option>
                  <option value="ЛВС / СКС">ЛВС / СКС</option>
                  <option value="Вентиляция">Вентиляция</option>
                </select>
              </label>
            </div>

            <div className="form__row">
              <label className="form__field">
                <span>Площадь объекта</span>

                <input
                  type="number"
                  required
                  disabled={loading}
                  value={form.area}
                  onChange={(e) =>
                    updateField('area', e.target.value)
                  }
                  placeholder="Например: 250"
                />
              </label>

              <label className="form__field">
                <span>Срочность</span>

                <select
                  required
                  disabled={loading}
                  value={form.urgency}
                  onChange={(e) =>
                    updateField('urgency', e.target.value)
                  }
                >
                  <option value="">Выберите срочность</option>
                  <option value="Срочно">Срочно</option>
                  <option value="Стандартно">Стандартно</option>
                  <option value="Без спешки">Без спешки</option>
                </select>
              </label>
            </div>

            <label className="form__field">
              <span>Телефон</span>

              <input
                type="tel"
                required
                disabled={loading}
                value={form.phone}
                onChange={(e) =>
                  updateField('phone', e.target.value)
                }
                placeholder="+998 (__) ___-__-__"
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
              {loading ? 'Отправка...' : 'Получить расчет'}
            </Button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}