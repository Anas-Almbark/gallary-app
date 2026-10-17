import { useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { Icon } from '../components/Icon'
import { backup } from '../content'
import { useInterval } from '../hooks/useInterval'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { mulberry32 } from '../utils/random'
import './Backup.css'

/* Phone -> cloud track with three packets looping every 2.7s. */
function UploadFlow() {
  return (
    <div className="flow" aria-hidden="true">
      <span className="flow__box">
        <Icon name="device-mobile" size={22} />
      </span>
      <span className="flow__track">
        <span className="flow__line" />
        <span className="flow__packet" />
        <span className="flow__packet" />
        <span className="flow__packet" />
      </span>
      <span className="flow__box">
        <Icon name="cloud-lock" size={22} />
      </span>
    </div>
  )
}

type Px = { x: number; y: number; w: number; h: number; c: string }

/* A small pixel-art landscape drawn on a 60 x 34 grid. This is "what you see". */
function buildScene(): Px[] {
  const r: Px[] = []
  const add = (x: number, y: number, w: number, h: number, c: string) => r.push({ x, y, w, h, c })

  // Sky
  add(0, 0, 60, 34, '#5aa6ee')
  add(0, 0, 60, 6, '#4a93dd')
  add(0, 12, 60, 10, '#7dbcf6')
  // Sun
  add(8, 4, 6, 6, '#ffd166')
  add(9, 3, 4, 8, '#ffd166')
  add(7, 5, 8, 4, '#ffd166')
  add(10, 6, 2, 2, '#ffe59a')
  // Clouds
  add(20, 6, 8, 2, '#eef6ff')
  add(22, 5, 4, 1, '#eef6ff')
  add(38, 10, 9, 2, '#eef6ff')
  add(40, 9, 5, 1, '#eef6ff')
  // Far mountain
  for (let i = 0; i < 7; i++) add(18 - i, 14 + i, 2 * i + 1, 1, '#6f7698')
  // Main mountain with a snow cap
  for (let i = 0; i < 10; i++) add(34 - i, 11 + i, 2 * i + 1, 1, i < 2 ? '#eef2fb' : '#8a90ad')
  // Hills
  add(0, 20, 60, 8, '#58b368')
  add(0, 19, 14, 1, '#6cc47a')
  add(2, 18, 9, 1, '#6cc47a')
  add(44, 19, 16, 1, '#6cc47a')
  add(48, 18, 10, 1, '#6cc47a')
  add(0, 26, 60, 2, '#3f9a4f')
  // Ground
  add(0, 28, 60, 6, '#8b5a38')
  add(0, 28, 60, 1, '#a46c43')
  add(0, 31, 60, 1, '#7a4c2d')
  // Tree
  add(50, 23, 2, 6, '#6b4426')
  add(47, 18, 8, 5, '#2e8b57')
  add(48, 16, 6, 2, '#2e8b57')
  add(49, 15, 4, 1, '#36a066')
  add(48, 20, 2, 1, '#36a066')
  // House
  add(4, 22, 8, 6, '#e9d8c3')
  add(3, 21, 10, 1, '#b5543b')
  add(4, 20, 8, 1, '#b5543b')
  add(5, 19, 6, 1, '#b5543b')
  add(6, 18, 4, 1, '#b5543b')
  add(7, 24, 2, 4, '#5a3a2a')
  add(10, 23, 2, 2, '#9dd4ff')
  return r
}

const SCENE = buildScene()

function PixelScene() {
  return (
    <svg className="scene" viewBox="0 0 60 34" shapeRendering="crispEdges" aria-hidden="true">
      {SCENE.map((p, i) => (
        <rect key={i} x={p.x} y={p.y} width={p.w} height={p.h} fill={p.c} />
      ))}
    </svg>
  )
}

const CIPHER_COLORS = ['#11151b', '#1b212b', '#242c38', '#2f3846', '#3a4454', '#19352a', '#1f4a38', '#4a5566']

/* Seeded blocky noise. This is "what the cloud sees". */
function NoiseScene({ seed }: { seed: number }) {
  const cells = useMemo(() => {
    const rnd = mulberry32(seed)
    const out: { x: number; y: number; c: string }[] = []
    for (let y = 0; y < 17; y++) {
      for (let x = 0; x < 30; x++) {
        out.push({ x: x * 2, y: y * 2, c: CIPHER_COLORS[Math.floor(rnd() * CIPHER_COLORS.length)] })
      }
    }
    return out
  }, [seed])

  return (
    <svg className="scene" viewBox="0 0 60 34" shapeRendering="crispEdges" aria-hidden="true">
      {cells.map((c, i) => (
        <rect key={i} x={c.x} y={c.y} width={2} height={2} fill={c.c} />
      ))}
    </svg>
  )
}

const START = 63

/* Draggable before/after slider: decrypted on the left, ciphertext on the right. */
function CompareSlider() {
  const [pos, setPos] = useState(START)
  const [seed, setSeed] = useState(7)
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const reduced = useReducedMotion()

  useInterval(() => setSeed((s) => s + 1), reduced ? null : 450)

  const update = (clientX: number) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const next = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.max(0, Math.min(100, next)))
  }

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    update(e.clientX)
  }
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) update(e.clientX)
  }
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = false
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 2
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - step))
    else if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + step))
    else if (e.key === 'Home') setPos(0)
    else if (e.key === 'End') setPos(100)
    else return
    e.preventDefault()
  }

  return (
    <div
      ref={ref}
      className="compare"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div className="compare__layer">
        <NoiseScene seed={seed} />
      </div>
      <div className="compare__layer" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <PixelScene />
      </div>
      <div className="compare__line" style={{ left: `${pos}%` }} aria-hidden="true" />
      <div
        className="compare__knob"
        role="slider"
        tabIndex={0}
        aria-label="Reveal what you see versus what the cloud sees"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        style={{ left: `${pos}%` }}
        onKeyDown={onKeyDown}
      >
        <Icon name="arrows-horizontal" size={20} />
      </div>
      <span className="compare__pill compare__pill--l">{backup.labels.you}</span>
      <span className="compare__pill compare__pill--r">{backup.labels.cloud}</span>
    </div>
  )
}

export function Backup() {
  return (
    <section className="section backup" id="backup">
      <div className="container backup__grid">
        <div className="section__header backup__header">
          <h2 className="section__title">{backup.title}</h2>
          <p className="section__sub">{backup.subtitle}</p>
        </div>

        <UploadFlow />
        <CompareSlider />

        <ul className="backup__points">
          {backup.points.map((point) => (
            <li key={point.text}>
              <Icon name={point.icon} size={20} />
              <span>{point.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
