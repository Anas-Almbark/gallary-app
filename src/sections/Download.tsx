import { useMemo } from 'react'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { brand, download, type Platform } from '../content'
import { mulberry32 } from '../utils/random'
import './Download.css'

const QR_SIZE = 21

/* Placeholder QR: real finder and timing patterns, random data modules. Swap for a real link QR before launch. */
function qrMatrix(seed: number) {
  const n = QR_SIZE
  const rnd = mulberry32(seed)
  const m: boolean[][] = Array.from({ length: n }, () => Array<boolean>(n).fill(false))

  const finder = (r0: number, c0: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const ring = r === 0 || r === 6 || c === 0 || c === 6
        const core = r >= 2 && r <= 4 && c >= 2 && c <= 4
        m[r0 + r][c0 + c] = ring || core
      }
    }
  }
  finder(0, 0)
  finder(0, n - 7)
  finder(n - 7, 0)

  for (let i = 8; i < n - 8; i++) {
    m[6][i] = i % 2 === 0
    m[i][6] = i % 2 === 0
  }

  const reserved = (r: number, c: number) =>
    (r < 8 && c < 8) || (r < 8 && c >= n - 8) || (r >= n - 8 && c < 8) || r === 6 || c === 6

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (!reserved(r, c)) m[r][c] = rnd() < 0.45
    }
  }
  return m
}

function QRCode({ seed }: { seed: number }) {
  const cells = useMemo(() => qrMatrix(seed), [seed])
  return (
    <svg className="qr__svg" viewBox={`0 0 ${QR_SIZE} ${QR_SIZE}`} shapeRendering="crispEdges" aria-hidden="true">
      {cells.flatMap((row, r) =>
        row.map((on, c) => (on ? <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} /> : null)),
      )}
    </svg>
  )
}

function PlatformCard({ platform, seed }: { platform: Platform; seed: number }) {
  return (
    <article className="platform">
      <div className="platform__title">
        <Icon name={platform.icon} className="platform__titleIcon" />
        <h3>{platform.name}</h3>
      </div>

      <div className="platform__body">
        <div className="qr">
          <div className="qr__tile" role="img" aria-label={`QR code to download ${brand.name} for ${platform.name}`}>
            <QRCode seed={seed} />
            <span className="qr__logo">
              <Icon name="shield-lock" size={17} />
            </span>
            <span className="qr__scan" aria-hidden="true" />
          </div>
          <span className="qr__hint">{download.scanHint}</span>
        </div>

        <dl className="platform__meta">
          <div>
            <dt>Version</dt>
            <dd>{platform.version}</dd>
          </div>
          <div>
            <dt>Size</dt>
            <dd>{platform.size}</dd>
          </div>
          <div>
            <dt>Requires</dt>
            <dd>
              <span className="platform__reqLong">{platform.requires}</span>
              <span className="platform__reqShort">{platform.requiresShort}</span>
            </dd>
          </div>
        </dl>
      </div>

      <div className="platform__buttons">
        {platform.buttons.map((button) => (
          <Button
            key={button.label}
            href={button.href}
            variant={button.variant}
            size="lg"
            full
            icon={<Icon name={button.icon} size={18} />}
          >
            {button.label}
          </Button>
        ))}
      </div>
    </article>
  )
}

export function Download() {
  return (
    <section className="section download" id="download">
      <div className="container">
        <div className="section__header">
          <h2 className="section__title">{download.title}</h2>
          <p className="section__sub">{download.subtitle}</p>
        </div>

        <div className="download__cards">
          {download.platforms.map((platform, i) => (
            <PlatformCard key={platform.id} platform={platform} seed={101 + i * 37} />
          ))}
        </div>
      </div>
    </section>
  )
}
