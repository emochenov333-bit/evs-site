import { useState } from 'react'
import { sendLeadToTelegram } from '../../services/telegram'

export default function Calculator() {
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    workType: '',
    area: '',
    objectType: '',
    urgency: '',
    phone: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      await sendLeadToTelegram({
        name: 'Калькулятор сайта',
        phone: form.phone,
        comment: `
Тип работ: ${form.workType}
Площадь: ${form.area}
Тип объекта: ${form.objectType}
Срочность: ${form.urgency}
        `,
      })

      alert('Заявка успешно отправлена')

      setForm({
        workType: '',
        area: '',
        objectType: '',
        urgency: '',
        phone: '',
      })
    } catch (error) {
      console.error(error)
      alert('Ошибка отправки')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      style={{
        padding: '80px 20px',
        background: '#0f0f0f',
        color: '#fff',
      }}
    >
      <div
        style={{
          maxWidth: '700px',
          margin: '0 auto',
        }}
      >
        <h2
          style={{
            fontSize: '42px',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          Рассчитать стоимость проекта
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <select
            name="workType"
            value={form.workType}
            onChange={handleChange}
            required
          >
            <option value="">Тип работ</option>
            <option>Общестрой</option>
            <option>Электрика</option>
            <option>Вентиляция</option>
            <option>Слаботочные системы</option>
            <option>Отделка</option>
            <option>Кровля</option>
            <option>Водоснабжение</option>
          </select>

          <select
            name="area"
            value={form.area}
            onChange={handleChange}
            required
          >
            <option value="">Площадь объекта</option>
            <option>До 100 м²</option>
            <option>100–300 м²</option>
            <option>300–1000 м²</option>
            <option>1000+ м²</option>
          </select>

          <select
            name="objectType"
            value={form.objectType}
            onChange={handleChange}
            required
          >
            <option value="">Тип объекта</option>
            <option>Квартира</option>
            <option>Дом</option>
            <option>Офис</option>
            <option>Завод</option>
            <option>Торговый центр</option>
            <option>Ресторан</option>
          </select>

          <select
            name="urgency"
            value={form.urgency}
            onChange={handleChange}
            required
          >
            <option value="">Срочность</option>
            <option>Срочно</option>
            <option>Стандартно</option>
            <option>Без спешки</option>
          </select>

          <input
            type="tel"
            name="phone"
            placeholder="Ваш телефон"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '18px',
              background: '#fff',
              color: '#000',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '18px',
            }}
          >
            {loading ? 'Отправка...' : 'Получить расчет'}
          </button>
        </form>
      </div>
    </section>
  )
}