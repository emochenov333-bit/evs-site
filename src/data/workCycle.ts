export interface WorkCycleStep {
  id: number
  title: string
  icon: string
}

export const workCycleSteps: WorkCycleStep[] = [
  { id: 1, title: 'Проектирование', icon: 'blueprint' },
  { id: 2, title: 'Подготовка участка', icon: 'site' },
  { id: 3, title: 'Строительство', icon: 'construction' },
  { id: 4, title: 'Монтаж инженерных систем', icon: 'engineering' },
  { id: 5, title: 'Пусконаладка', icon: 'settings' },
  { id: 6, title: 'Сдача объекта', icon: 'handover' },
  { id: 7, title: 'Разрезание ленточки', icon: 'ribbon' },
]
