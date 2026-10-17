import { Nav } from './sections/Nav'
import { Hero } from './sections/Hero'
import { Marquee } from './sections/Marquee'
import { Features } from './sections/Features'
import { Backup } from './sections/Backup'
import { HowItWorks } from './sections/HowItWorks'
import { Pricing } from './sections/Pricing'
import { FAQ } from './sections/FAQ'
import { Download } from './sections/Download'
import { Footer } from './sections/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Marquee />
        <Features />
        <Backup />
        <HowItWorks />
        <Pricing />
        <FAQ />
        <Download />
      </main>
      <Footer />
    </>
  )
}
