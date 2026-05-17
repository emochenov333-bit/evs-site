export interface LeadFormData {
  name: string
  phone: string
  comment: string
}

function getTelegramConfig() {
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    throw new Error('Telegram credentials are not configured')
  }

  return { token, chatId }
}

function formatLeadMessage({ name, phone, comment }: LeadFormData): string {
  const message = comment.trim() || '—'
  return [
    'Новая заявка с сайта EVS Монтаж',
    '',
    `Имя: ${name.trim()}`,
    `Телефон: ${phone.trim()}`,
    `Комментарий: ${message}`,
  ].join('\n')
}

export async function sendLeadToTelegram(data: LeadFormData): Promise<void> {
  const { token, chatId } = getTelegramConfig()

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: formatLeadMessage(data),
    }),
  })

  const result = (await response.json()) as { ok: boolean; description?: string }

  console.log(response)
console.log(result)

  if (!response.ok || !result.ok) {
    throw new Error(result.description ?? 'Telegram API request failed')
  }
}
