export interface LeadFormData {
  name: string
  phone: string
  comment: string
}

function getTelegramConfig() {
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID

  console.log('TOKEN:', token)
  console.log('CHAT ID:', chatId)

  if (!token) {
    throw new Error('Telegram bot token not found')
  }

  if (!chatId) {
    throw new Error('Telegram chat id not found')
  }

  return { token, chatId }
}

function formatLeadMessage(data: LeadFormData) {
  return `
🔥 Новая заявка с сайта EVS Монтаж

👤 Имя: ${data.name}
📞 Телефон: ${data.phone}
💬 Комментарий: ${data.comment || '—'}
`
}

export async function sendLeadToTelegram(
  data: LeadFormData
): Promise<void> {
  try {
    const { token, chatId } = getTelegramConfig()

    const url = `https://api.telegram.org/bot${token}/sendMessage`

    console.log('SEND URL:', url)

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: formatLeadMessage(data),
      }),
    })

    console.log('RESPONSE STATUS:', response.status)

    const result = await response.json()

    console.log('TELEGRAM RESULT:', result)

    if (!response.ok || !result.ok) {
      console.error('TELEGRAM ERROR:', result)
      throw new Error(result.description || 'Telegram send failed')
    }

    console.log('SUCCESS SEND')
  } catch (error) {
    console.error('SEND ERROR:', error)
    throw error
  }
}