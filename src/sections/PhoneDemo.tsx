import { useCallback, useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { Icon } from '../components/Icon'
import { hero, phone as copy } from '../content'
import './PhoneDemo.css'

const DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
const TILES = Array.from({ length: 16 }, (_, i) => i)

function Phone({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`phone ${className}`}>
      <div className="phone__screen">{children}</div>
      <div className="phone__notch" aria-hidden="true" />
    </div>
  )
}

function LockScreen({ active, onUnlock }: { active: boolean; onUnlock: () => void }) {
  const [pin, setPin] = useState('')
  const [scanning, setScanning] = useState(false)

  // Reset the keypad whenever the vault is locked again.
  useEffect(() => {
    if (active) {
      setPin('')
      setScanning(false)
    }
  }, [active])

  // Four digits entered: pause so the last dot fills, then unlock.
  useEffect(() => {
    if (pin.length < 4) return
    const id = window.setTimeout(onUnlock, 260)
    return () => window.clearTimeout(id)
  }, [pin, onUnlock])

  // Fingerprint: let the scan ring complete, then unlock.
  useEffect(() => {
    if (!scanning) return
    const id = window.setTimeout(onUnlock, 950)
    return () => window.clearTimeout(id)
  }, [scanning, onUnlock])

  const press = (digit: string) => {
    if (!active || scanning) return
    setPin((p) => (p.length >= 4 ? p : p + digit))
  }
  const erase = () => {
    if (!active || scanning) return
    setPin((p) => p.slice(0, -1))
  }
  const scan = () => {
    if (!active || scanning || pin.length === 4) return
    setScanning(true)
  }
  const tab = active ? 0 : -1

  return (
    <div className="lock" aria-hidden={!active}>
      <div className="lock__header">
        <div className="lock__appIcon">
          <Icon name="shield-lock" size={27} />
        </div>
        <div className="lock__title">{copy.lockedTitle}</div>
        <div className="lock__sub">{copy.lockedSub}</div>
        <div className="lock__dots" role="status" aria-label={`${pin.length} of 4 digits entered`}>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={i < pin.length ? 'lock__dot is-filled' : 'lock__dot'} />
          ))}
        </div>
      </div>

      <div className="keypad">
        {DIGITS.map((d) => (
          <button key={d} type="button" className="key" onClick={() => press(d)} tabIndex={tab}>
            {d}
          </button>
        ))}
        <button
          type="button"
          className={scanning ? 'key key--finger is-scanning' : 'key key--finger'}
          onClick={scan}
          aria-label="Unlock with fingerprint"
          tabIndex={tab}
        >
          <svg className="key__ring" viewBox="0 0 60 60" aria-hidden="true">
            <circle cx="30" cy="30" r="29" />
          </svg>
          <Icon name="fingerprint" size={28} className="key__fingerIcon" />
        </button>
        <button type="button" className="key" onClick={() => press('0')} tabIndex={tab}>
          0
        </button>
        <button
          type="button"
          className="key key--delete"
          onClick={erase}
          aria-label="Delete last digit"
          tabIndex={tab}
        >
          <Icon name="backspace" size={22} />
        </button>
      </div>
    </div>
  )
}

/* Each tile gets a stable, photo-like gradient so the grid reads as a gallery. */
function tileStyle(i: number): CSSProperties {
  const h = (i * 47 + 20) % 360
  return {
    '--i': i,
    background: `radial-gradient(circle at 30% 30%, hsl(${(h + 30) % 360} 70% 70% / 0.55), transparent 45%), linear-gradient(135deg, hsl(${h} 55% 48%), hsl(${(h + 50) % 360} 50% 26%))`,
  } as CSSProperties
}

function VaultScreen({
  open,
  onLock,
  lastPending = false,
}: {
  open: boolean
  onLock?: () => void
  lastPending?: boolean
}) {
  const cls = ['vault', open ? 'vault--open' : '', lastPending ? 'vault--lastPending' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={cls}>
      <div className="vault__header">
        <span className="vault__title">{copy.vaultTitle}</span>
        {onLock ? (
          <button
            type="button"
            className="vault__lock"
            onClick={onLock}
            aria-label="Lock the vault"
            tabIndex={open ? 0 : -1}
          >
            <Icon name="lock" size={18} />
          </button>
        ) : (
          <span className="vault__lock" aria-hidden="true">
            <Icon name="lock" size={18} />
          </span>
        )}
      </div>
      <div className="vault__sub">{copy.vaultSub}</div>
      <div className="vault__grid" aria-hidden="true">
        {TILES.map((i) => (
          <div key={i} className={i === 15 ? 'tile tile--last' : 'tile'} style={tileStyle(i)}>
            <span className="tile__noise noise" />
          </div>
        ))}
      </div>
      <div className="vault__backup">
        <span className="vault__backupIcon">
          <Icon name="cloud-lock" size={20} />
        </span>
        <div>
          <strong>{copy.backupTitle}</strong>
          <span>{copy.backupSub}</span>
        </div>
      </div>
    </div>
  )
}

export function PhoneDemo() {
  const [unlocked, setUnlocked] = useState(false)
  const unlock = useCallback(() => setUnlocked(true), [])
  const lock = useCallback(() => setUnlocked(false), [])

  return (
    <div className="demo">
      <div className="demo__phones">
        {/* Desktop only: a second phone behind, already showing the vault. */}
        <Phone className="demo__back">
          <VaultScreen open lastPending />
        </Phone>

        <Phone className="demo__front">
          <VaultScreen open={unlocked} onLock={lock} />
          <div className={unlocked ? 'demo__lockLayer is-up' : 'demo__lockLayer'}>
            <LockScreen active={!unlocked} onUnlock={unlock} />
          </div>
        </Phone>
      </div>
      <p className="demo__hint">{hero.hint}</p>
    </div>
  )
}
