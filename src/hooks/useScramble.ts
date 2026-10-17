import { useEffect, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

/* Lowercase hex only: similar advance widths to body text, so lines don't rewrap mid-animation. */
const GLYPHS = '0123456789abcdef'

function scramble(text: string, settled: number) {
  let out = ''
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (c === ' ' || c === '\n' || i < settled) out += c
    else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
  }
  return out
}

/** Reveals `text` left to right while unsettled characters cycle through hex-like glyphs. */
export function useScramble(text: string, duration = 1400) {
  const reduced = useReducedMotion()
  const [out, setOut] = useState(() => (reduced ? text : scramble(text, 0)))

  useEffect(() => {
    if (reduced) {
      setOut(text)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      if (p >= 1) {
        setOut(text)
        return
      }
      setOut(scramble(text, Math.floor(p * text.length * 1.15)))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, duration, reduced])

  return out
}
