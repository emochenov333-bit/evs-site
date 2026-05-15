import { Reveal } from '../motion/Reveal'
import './SectionHeader.css'

interface SectionHeaderProps {
  label: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeader({
  label,
  title,
  description,
  align = 'center',
}: SectionHeaderProps) {
  return (
    <Reveal className={`section-header section-header--${align}`}>
      <span className="section-label">{label}</span>
      <h2 className="section-title">{title}</h2>
      {description && (
        <p className={`section-desc ${align === 'center' ? 'section-desc--center' : ''}`}>
          {description}
        </p>
      )}
    </Reveal>
  )
}
