import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import './Button.css'

type Variant = 'primary' | 'secondary' | 'ghost' | 'presentation'

interface Base {
  variant?: Variant
  children: ReactNode
  className?: string
  icon?: ReactNode
  loading?: boolean
  disabled?: boolean
}

type AsButton = Base &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof Base> & { href?: undefined }
type AsLink = Base &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof Base> & { href: string }

export type ButtonProps = AsButton | AsLink

export function Button({
  variant = 'primary',
  children,
  className = '',
  icon,
  loading = false,
  href,
  disabled,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading
  const cls = `btn btn--${variant} ${loading ? 'btn--loading' : ''} ${className}`.trim()

  const inner = (
    <>
      {loading && <span className="btn__spinner" aria-hidden />}
      <span className={`btn__text ${loading ? 'btn__text--hidden' : ''}`}>{children}</span>
      {!loading && icon && <span className="btn__icon">{icon}</span>}
      {(variant === 'primary' || variant === 'presentation') && (
        <span className="btn__glow" aria-hidden />
      )}
    </>
  )

  if (href) {
    return (
      <a className={cls} href={href} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {inner}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={cls}
      disabled={isDisabled}
      aria-busy={loading}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {inner}
    </button>
  )
}

export function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PdfIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 2v6h6M8 13h2M8 17h8M8 9h1"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M16 13h-2v4h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  )
}
