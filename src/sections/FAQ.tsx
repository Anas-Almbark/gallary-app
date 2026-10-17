import { useState } from 'react'
import { Icon } from '../components/Icon'
import { faq } from '../content'
import './FAQ.css'

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="section faq" id="faq">
      <div className="container faq__grid">
        <div className="section__header faq__header">
          <h2 className="section__title">{faq.title}</h2>
          <p className="section__sub faq__sub">
            {faq.subtitleBefore}
            <a href={faq.contactHref}>{faq.contactLabel}</a>
            {faq.subtitleAfter}
          </p>
        </div>

        <ul className="faq__list">
          {faq.items.map((item, i) => {
            const isOpen = open === i
            return (
              <li key={item.q} className={isOpen ? 'faq__item is-open' : 'faq__item'}>
                <h3 className="faq__h">
                  <button
                    type="button"
                    className="faq__q"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{item.q}</span>
                    <Icon name="chevron-down" size={18} className="faq__chev" />
                  </button>
                </h3>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className="faq__a"
                  aria-hidden={!isOpen}
                >
                  <div className="faq__aInner">
                    <p>{item.a}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
