import { brand, footer } from '../content'
import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a href="#top" className="footer__brand">
          {brand.name}
        </a>
        <nav className="footer__links" aria-label="Footer">
          {footer.links.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <span className="footer__copy">{footer.copyright}</span>
      </div>
    </footer>
  )
}
