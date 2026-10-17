import { useState } from 'react'
import { Icon } from '../components/Icon'
import { features } from '../content'
import { useInterval } from '../hooks/useInterval'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { randomHex } from '../utils/random'
import './Features.css'

/* Enough hex to fill four lines at any width; the box clips to whole lines. */
const CIPHER_LENGTH = 320

/* "Live ciphertext": a block of hex that re-rolls every 160ms. */
function Ciphertext() {
  const reduced = useReducedMotion()
  const [hex, setHex] = useState(() => randomHex(CIPHER_LENGTH))
  useInterval(() => setHex(randomHex(CIPHER_LENGTH)), reduced ? null : 160)

  return (
    <div className="cipher" aria-hidden="true">
      <span className="cipher__text">{hex}</span>
    </div>
  )
}

export function Features() {
  return (
    <section className="section features" id="features">
      <div className="container">
        <div className="section__header features__header">
          <h2 className="section__title">{features.title}</h2>
          <p className="section__sub">{features.subtitle}</p>
        </div>

        <div className="bento">
          <article className="tile-card tile-card--aes" style={{ gridArea: 'aes' }}>
            <div className="tile-card__icon">
              <Icon name={features.aes.icon} size={21} />
            </div>
            <h3 className="tile-card__title">{features.aes.title}</h3>
            <p className="tile-card__desc">{features.aes.desc}</p>
            <Ciphertext />
          </article>

          {features.tiles.map((tile) => (
            <article key={tile.area} className="tile-card" style={{ gridArea: tile.area }}>
              <div className="tile-card__icon">
                <Icon name={tile.icon} size={21} />
              </div>
              <h3 className="tile-card__title">{tile.title}</h3>
              <p className="tile-card__desc">{tile.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
