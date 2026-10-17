import type { ReactElement, SVGProps } from 'react'

export type IconName =
  | 'shield-lock'
  | 'lock'
  | 'user-off'
  | 'cloud-lock'
  | 'fingerprint'
  | 'backspace'
  | 'device-mobile'
  | 'eye-off'
  | 'refresh'
  | 'arrows-horizontal'
  | 'tag'
  | 'key'
  | 'android'
  | 'check'
  | 'chevron-down'
  | 'download'
  | 'play'

const paths: Record<IconName, ReactElement> = {
  'shield-lock': (
    <>
      <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
      <circle cx="12" cy="11" r="2" />
      <path d="M12 13v2.5" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <circle cx="12" cy="16" r="1" />
      <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
    </>
  ),
  'user-off': (
    <>
      <path d="M8.18 8.189a4.01 4.01 0 0 0 2.616 2.627m3.507 -.545a4 4 0 1 0 -5.59 -5.552" />
      <path d="M6 21v-2a4 4 0 0 1 4 -4h4c.412 0 .81 .062 1.183 .178m2.633 2.618c.12 .38 .184 .785 .184 1.204v2" />
      <path d="M3 3l18 18" />
    </>
  ),
  'cloud-lock': (
    <>
      <path d="M19 18a3.5 3.5 0 0 0 0 -7h-1a5 4.5 0 0 0 -11 -2a4.6 4.4 0 0 0 -2.1 8.4" />
      <rect x="8" y="16" width="8" height="5" rx="1" />
      <path d="M10 16v-2a2 2 0 1 1 4 0v2" />
    </>
  ),
  fingerprint: (
    <>
      <path d="M18.9 7a8 8 0 0 1 1.1 5v1a6 6 0 0 0 .8 3" />
      <path d="M8 11a4 4 0 0 1 8 0v1a10 10 0 0 0 2 6" />
      <path d="M12 11v2a14 14 0 0 0 2.5 8" />
      <path d="M8 15a18 18 0 0 0 1.8 6" />
      <path d="M4.9 19a22 22 0 0 1 -.9 -7v-1a8 8 0 0 1 12 -6.95" />
    </>
  ),
  backspace: (
    <>
      <path d="M20 6a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-11l-5 -5a1.5 1.5 0 0 1 0 -2l5 -5z" />
      <path d="M12 10l4 4m0 -4l-4 4" />
    </>
  ),
  'device-mobile': (
    <>
      <rect x="6" y="3" width="12" height="18" rx="2" />
      <path d="M11 4h2" />
      <path d="M12 17v.01" />
    </>
  ),
  'eye-off': (
    <>
      <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
      <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
      <path d="M3 3l18 18" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
      <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
    </>
  ),
  'arrows-horizontal': (
    <>
      <path d="M7 8l-4 4l4 4" />
      <path d="M17 8l4 4l-4 4" />
      <path d="M3 12l18 0" />
    </>
  ),
  tag: (
    <>
      <circle cx="7.5" cy="7.5" r="1" />
      <path d="M3 6v5.172a2 2 0 0 0 .586 1.414l7.71 7.71a2.41 2.41 0 0 0 3.408 0l5.592 -5.592a2.41 2.41 0 0 0 0 -3.408l-7.71 -7.71a2 2 0 0 0 -1.414 -.586h-5.172a3 3 0 0 0 -3 3z" />
    </>
  ),
  key: (
    <>
      <path d="M16.555 3.843l3.602 3.602a2.877 2.877 0 0 1 0 4.069l-2.643 2.643a2.877 2.877 0 0 1 -4.069 0l-.301 -.301l-6.558 6.558a2 2 0 0 1 -1.239 .578l-.175 .008h-1.172a1 1 0 0 1 -.993 -.883l-.007 -.117v-1.172a2 2 0 0 1 .467 -1.284l.119 -.13l.414 -.414h2v-2h2v-2l2.144 -2.144l-.301 -.301a2.877 2.877 0 0 1 0 -4.069l2.643 -2.643a2.877 2.877 0 0 1 4.069 0z" />
      <path d="M15 9h.01" />
    </>
  ),
  android: (
    <>
      <path d="M4 10l0 6" />
      <path d="M20 10l0 6" />
      <path d="M7 9h10v8a1 1 0 0 1 -1 1h-8a1 1 0 0 1 -1 -1v-8a5 5 0 0 1 10 0" />
      <path d="M8 3l1 2" />
      <path d="M16 3l-1 2" />
      <path d="M9 18l0 3" />
      <path d="M15 18l0 3" />
    </>
  ),
  check: <path d="M5 12l5 5l10 -10" />,
  'chevron-down': <path d="M6 9l6 6l6 -6" />,
  download: (
    <>
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
      <path d="M7 11l5 5l5 -5" />
      <path d="M12 4l0 12" />
    </>
  ),
  play: <path d="M7 4v16l13 -8z" />,
}

type Props = { name: IconName; size?: number } & Omit<SVGProps<SVGSVGElement>, 'name'>

export function Icon({ name, size = 20, ...rest }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  )
}
