import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.css'

type Common = {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  full?: boolean
  icon?: ReactNode
  children: ReactNode
  className?: string
}

type AnchorProps = Common & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>
type NativeProps = Common & { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: AnchorProps | NativeProps) {
  const { variant = 'primary', size = 'md', full, icon, children, className = '', ...rest } = props
  const cls = ['btn', `btn--${variant}`, `btn--${size}`, full ? 'btn--full' : '', className]
    .filter(Boolean)
    .join(' ')

  if (rest.href !== undefined) {
    const { href, ...anchor } = rest as Omit<AnchorProps, keyof Common>
    return (
      <a className={cls} href={href} {...anchor}>
        {icon}
        <span>{children}</span>
      </a>
    )
  }

  const native = rest as Omit<NativeProps, keyof Common>
  return (
    <button type="button" className={cls} {...native}>
      {icon}
      <span>{children}</span>
    </button>
  )
}
