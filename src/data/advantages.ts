export interface Advantage {
  id: string
  title: string
  description: string
  icon: string
}

export const advantages: Advantage[] = [
  {
    id: 'turnkey',
    title: 'Работа под ключ',
    description: 'Полный цикл от проектирования до сдачи объекта — одна команда, один подрядчик.',
    icon: 'key',
  },
  {
    id: 'team',
    title: 'Собственные специалисты',
    description: 'Штатные инженеры и монтажники с допусками и опытом на крупных объектах.',
    icon: 'team',
  },
  {
    id: 'warranty',
    title: 'Гарантия',
    description: 'Официальная гарантия на все виды работ и установленное оборудование.',
    icon: 'shield',
  },
  {
    id: 'contract',
    title: 'Работа по договору',
    description: 'Прозрачные условия, фиксированные сроки и детализированная смета.',
    icon: 'document',
  },
  {
    id: 'payment',
    title: 'Любая форма оплаты',
    description: 'Гибкие условия оплаты для юридических и физических лиц.',
    icon: 'payment',
  },
  {
    id: 'experience',
    title: 'Опыт с крупными объектами',
    description: 'ТРЦ, промышленные предприятия, медицинские и жилые комплексы.',
    icon: 'building',
  },
]
