import { howItWorks } from '../content'
import './HowItWorks.css'

export function HowItWorks() {
  return (
    <section className="section how" id="how-it-works">
      <div className="container">
        <div className="section__header">
          <h2 className="section__title">{howItWorks.title}</h2>
          <p className="section__sub">{howItWorks.subtitle}</p>
        </div>

        <ol className="steps">
          {howItWorks.steps.map((step) => (
            <li key={step.n} className="step">
              <span className="step__n" aria-hidden="true">
                {step.n}
              </span>
              <h3 className="step__title">{step.title}</h3>
              <p className="step__desc">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
