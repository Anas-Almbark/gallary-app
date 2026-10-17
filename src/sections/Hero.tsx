import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { hero } from '../content'
import { useScramble } from '../hooks/useScramble'
import { PhoneDemo } from './PhoneDemo'
import './Hero.css'

export function Hero() {
  const title = useScramble(hero.headline)

  return (
    <section className="hero">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__copy">
          <h1 className="hero__title" aria-label={hero.headline.replace('\n', ' ')}>
            <span aria-hidden="true">{title}</span>
          </h1>
          <p className="hero__sub">{hero.subheadline}</p>
          <div className="hero__ctas">
            <Button href={hero.primary.href} size="lg">
              {hero.primary.label}
            </Button>
            <Button href={hero.secondary.href} size="lg" variant="secondary">
              {hero.secondary.label}
            </Button>
          </div>
          <ul className="hero__trust">
            {hero.trust.map((item) => (
              <li key={item.label}>
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <PhoneDemo />
      </div>
    </section>
  )
}
