import { Icon } from '../components/Icon'
import { marquee } from '../content'
import './Marquee.css'

export function Marquee() {
  // Two copies so the track can scroll by exactly half its width and loop seamlessly.
  const items = [...marquee, ...marquee]

  return (
    <div className="marquee" aria-label="Highlights">
      <div className="marquee__track">
        {items.map((label, i) => (
          <span key={i} className="marquee__item" aria-hidden={i >= marquee.length}>
            <span>{label}</span>
            <Icon name="lock" className="marquee__icon" />
          </span>
        ))}
      </div>
    </div>
  )
}
