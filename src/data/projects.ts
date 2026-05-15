export interface Project {
  id: string
  name: string
  category: string
  description: string
}

export const projects: Project[] = [
  {
    id: 'veer-mall',
    name: 'ТРЦ Veer Mall',
    category: 'Торговый центр',
    description: 'Комплексный монтаж инженерных систем и слаботочных сетей.',
  },
  {
    id: 'sanduny',
    name: 'Sanduny',
    category: 'Коммерческий объект',
    description: 'Электромонтаж, вентиляция и системы безопасности.',
  },
  {
    id: 'park-house',
    name: 'Парк Хаус',
    category: 'Торговый центр',
    description: 'Инженерные системы и автоматизация здания.',
  },
  {
    id: 'uvz',
    name: 'Уралвагонзавод',
    category: 'Промышленность',
    description: 'Монтаж инженерных систем на промышленном объекте.',
  },
  {
    id: 'lucci',
    name: 'ЖК Lucci',
    category: 'Жилой комплекс',
    description: 'Слаботочные системы, СКС и электромонтаж.',
  },
  {
    id: 'mclinic',
    name: 'MClinic',
    category: 'Медицина',
    description: 'Инженерные системы для медицинского центра.',
  },
]
