import { useState, type FormEvent } from 'react'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { pricing } from '../content'
import './Pricing.css'

type Applied = { code: string; pct: number }

function formatPrice(n: number) {
  return Number.isInteger(n) ? `$${n}` : `$${n.toFixed(2)}`
}

export function Pricing() {
  const [code, setCode] = useState('')
  const [applied, setApplied] = useState<Applied | null>(null)
  const [error, setError] = useState<string | null>(null)

  const apply = (e: FormEvent) => {
    e.preventDefault()
    const key = code.trim().toUpperCase()
    if (!key) {
      setError('Enter a coupon code first.')
      return
    }
    const pct = pricing.coupon.codes[key]
    if (pct) {
      setApplied({ code: key, pct })
      setError(null)
    } else {
      setApplied(null)
      setError("That code isn't valid or has expired.")
    }
  }

  const discounted = (price: number) => (applied ? price * (1 - applied.pct / 100) : price)

  return (
    <section className="section pricing" id="pricing">
      <div className="container">
        <div className="section__header">
          <h2 className="section__title">{pricing.title}</h2>
          <p className="section__sub">{pricing.subtitle}</p>
        </div>

        <div className="pricing__grid">
          {pricing.plans.map((plan) => (
            <article key={plan.id} className={plan.featured ? 'plan plan--featured' : 'plan'}>
              {plan.badge && <span className="plan__badge">{plan.badge}</span>}
              <h3 className="plan__name">{plan.name}</h3>
              <div className="plan__price">
                {applied && <s className="plan__was">{formatPrice(plan.price)}</s>}
                <span className="plan__amount">{formatPrice(discounted(plan.price))}</span>
                <span className="plan__period">{plan.period}</span>
              </div>
              <p className="plan__desc">{plan.desc}</p>
              <ul className="plan__features">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Icon name="check" size={16} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                href="#download"
                size="lg"
                full
                variant={plan.featured ? 'primary' : 'secondary'}
                className="plan__cta"
              >
                {plan.cta}
              </Button>
            </article>
          ))}

          <form className="coupon" onSubmit={apply} noValidate>
            <div className="coupon__title">
              <Icon name="tag" size={20} />
              <span>{pricing.coupon.title}</span>
            </div>
            <p className="coupon__desc">{pricing.coupon.desc}</p>

            <div className="coupon__field">
              <label className="sr-only" htmlFor="coupon">
                {pricing.coupon.placeholder}
              </label>
              <input
                id="coupon"
                className="input"
                placeholder={pricing.coupon.placeholder}
                value={code}
                onChange={(e) => {
                  setCode(e.target.value)
                  setError(null)
                }}
                autoComplete="off"
                spellCheck={false}
                aria-invalid={error ? true : undefined}
                aria-describedby="coupon-msg"
              />
              <Button type="submit" size="lg" variant="secondary">
                {pricing.coupon.button}
              </Button>
            </div>
            <p
              id="coupon-msg"
              className={['coupon__msg', error ? 'is-error' : '', applied ? 'is-ok' : ''].join(' ')}
              role="status"
              aria-live="polite"
            >
              {error ?? (applied ? `${applied.pct}% off applied with ${applied.code}.` : '')}
            </p>

            <hr className="coupon__divider" />
            <p className="coupon__note">
              <Icon name="lock" size={16} />
              <span>{pricing.coupon.secure}</span>
            </p>
            <p className="coupon__note">
              <Icon name="key" size={16} />
              <span>{pricing.coupon.key}</span>
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
