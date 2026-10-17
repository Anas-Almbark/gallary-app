import { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { brand, nav } from '../content'
import './Nav.css'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={scrolled ? 'nav nav--scrolled' : 'nav'}>
      <div className="container nav__inner">
        <a href="#top" className="nav__logo" aria-label={`${brand.name} home`}>
          <span className="nav__mark">
            <Icon name="shield-lock" size={20} />
          </span>
          <span className="nav__name">{brand.name}</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {nav.links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <Button href={nav.cta.href} size="md" className="nav__cta">
          {nav.cta.label}
        </Button>
      </div>
    </header>
  )
}
