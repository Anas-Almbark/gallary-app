import type { IconName } from './components/Icon'

/* All copy lives here so it can be edited without touching components. */

export const brand = {
  name: 'Sitr',
  tagline: 'Private photo vault',
}

export const nav = {
  links: [
    { label: 'Features', href: '#features' },
    { label: 'Backup', href: '#backup' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'FAQ', href: '#faq' },
  ],
  cta: { label: 'Get Sitr', href: '#download' },
}

export const hero = {
  headline: 'Your photos,\nfor your eyes only.',
  subheadline:
    'Sitr locks your photos behind a PIN or fingerprint, encrypts them on your phone, and backs them up so nobody else can read them. No account, no tracking.',
  primary: { label: 'Get Sitr', href: '#download' },
  secondary: { label: 'See how it works', href: '#how-it-works' },
  trust: [
    { icon: 'lock', label: 'Encrypted on your phone' },
    { icon: 'user-off', label: 'No account' },
    { icon: 'cloud-lock', label: 'Private backup' },
  ] as { icon: IconName; label: string }[],
  hint: 'Try it: tap any 4 digits or the fingerprint',
}

export const phone = {
  lockedTitle: 'Sitr is locked',
  lockedSub: 'Enter your PIN',
  vaultTitle: 'Vault',
  vaultSub: '128 photos, all encrypted',
  backupTitle: 'Backed up privately',
  backupSub: 'Just now, end-to-end encrypted',
}

export const marquee = [
  'AES-256 encryption',
  'PIN lock',
  'Fingerprint unlock',
  'Private backup',
  'Hidden from gallery',
  'No account',
]

export const features = {
  title: 'Locked down, without the hassle',
  subtitle: 'Everything that keeps your photos private happens on your phone.',
  aes: {
    icon: 'lock' as IconName,
    title: 'AES-256, on your device',
    desc: "Every photo is encrypted before it's saved. The key never leaves your phone.",
  },
  tiles: [
    {
      area: 't2',
      icon: 'fingerprint',
      title: 'PIN or fingerprint',
      desc: "Unlock with a 4-digit PIN or a single touch. Wrong guesses slow down, you don't.",
    },
    {
      area: 't3',
      icon: 'eye-off',
      title: 'Hidden from your gallery',
      desc: 'Vaulted photos disappear from your camera roll and from every other app.',
    },
    {
      area: 't4',
      icon: 'user-off',
      title: 'No account, ever',
      desc: 'No email, no sign-up, no profile. Sitr never learns who you are.',
    },
    {
      area: 't5',
      icon: 'device-mobile',
      title: 'Works offline',
      desc: 'Lock, unlock and browse with airplane mode on. Nothing phones home.',
    },
    {
      area: 't6',
      icon: 'cloud-lock',
      title: 'Private backup, when you want it',
      desc: 'Turn it on and encrypted copies sync in the background. Only your key can open them, on any phone you own.',
    },
  ] as { area: string; icon: IconName; title: string; desc: string }[],
}

export const backup = {
  title: 'Backed up. Privately.',
  subtitle:
    "Your vault is encrypted on your phone before it's uploaded. Without your key, what reaches the cloud is just noise.",
  points: [
    { icon: 'lock', text: 'Encrypted before it leaves your phone' },
    { icon: 'eye-off', text: "We can't see your photos, and neither can the cloud provider" },
    { icon: 'refresh', text: 'Restore everything on a new phone with your recovery key' },
  ] as { icon: IconName; text: string }[],
  labels: { you: 'What you see', cloud: 'What the cloud sees' },
}

export const howItWorks = {
  title: 'Set up in a minute',
  subtitle: 'Three steps from open to locked.',
  steps: [
    { n: '01', title: 'Set your PIN', desc: 'Add your fingerprint for faster unlocking.' },
    { n: '02', title: 'Add your photos', desc: 'Import from your gallery or shoot straight into the vault.' },
    { n: '03', title: 'Turn on private backup', desc: 'Encrypted copies sync quietly in the background.' },
  ],
}

export type Plan = {
  id: string
  name: string
  price: number
  period: string
  desc: string
  features: string[]
  cta: string
  featured?: boolean
  badge?: string
}

export const pricing = {
  title: 'Pick your plan',
  subtitle:
    'Pay securely on our website, then activate Sitr on Android or iPhone with your license key.',
  plans: [
    {
      id: 'yearly',
      name: 'Yearly',
      price: 9.99,
      period: '/ year',
      desc: 'Billed once a year. Cancel anytime.',
      features: ['Unlimited photos and videos', 'PIN and fingerprint lock', '10 GB private backup', 'Android and iPhone'],
      cta: 'Choose yearly',
    },
    {
      id: 'lifetime',
      name: 'Lifetime',
      price: 29,
      period: 'once',
      desc: 'Pay once, keep it forever.',
      features: ['Everything in Yearly', '50 GB private backup', 'All future updates', 'Priority support'],
      cta: 'Buy lifetime',
      featured: true,
      badge: 'Best value',
    },
  ] as Plan[],
  coupon: {
    title: 'Have a coupon?',
    desc: 'Discounts apply to both plans before you pay.',
    placeholder: 'Coupon code',
    button: 'Apply',
    secure: 'Secure checkout. Your license key is emailed right after payment.',
    key: 'One license works on Android and iPhone.',
    /* Demo codes. Replace with a real validation call when wiring checkout. */
    codes: { SITR10: 10, WELCOME20: 20 } as Record<string, number>,
  },
}

export const faq = {
  title: 'Questions',
  subtitleBefore: 'Still unsure about something? ',
  contactLabel: 'Contact us',
  subtitleAfter: " and we'll get back to you.",
  contactHref: 'mailto:hello@sitr.app',
  items: [
    {
      q: 'What happens if I forget my PIN?',
      a: 'Reset it with the recovery key you saved during setup. Without the PIN or the recovery key nobody can open the vault, including us. That is the point.',
    },
    {
      q: 'Can Sitr see my photos?',
      a: 'No. Photos are encrypted on your phone with a key that never leaves it. Backups reach the cloud already encrypted, so they look like random noise to anyone else.',
    },
    {
      q: 'Does it work without an internet connection?',
      a: 'Yes. Locking, unlocking, importing and viewing all happen offline. Only private backup needs a connection, and it waits quietly until you have one.',
    },
    {
      q: 'What if I lose my phone?',
      a: 'Install Sitr on your new phone and enter your recovery key. Your encrypted backup is downloaded and decrypted locally, tile by tile.',
    },
    {
      q: 'Is one license enough for Android and iPhone?',
      a: 'Yes. One license key activates Sitr on both platforms, on any phone you own.',
    },
  ],
}

export type Platform = {
  id: string
  icon: IconName
  name: string
  version: string
  size: string
  requires: string
  requiresShort: string
  buttons: { label: string; href: string; variant: 'primary' | 'secondary'; icon: IconName }[]
}

export const download = {
  title: 'Get Sitr',
  subtitle: 'Download the app, then enter the license key from your email to unlock it.',
  scanHint: 'Scan with your camera',
  platforms: [
    {
      id: 'android',
      icon: 'android',
      name: 'Android',
      version: '1.0.0',
      size: '18 MB',
      requires: 'Android 8 or later',
      requiresShort: 'Android 8+',
      buttons: [
        { label: 'Download APK', href: '#', variant: 'primary', icon: 'download' },
        { label: 'Get it on Google Play', href: '#', variant: 'secondary', icon: 'play' },
      ],
    },
    {
      id: 'iphone',
      icon: 'device-mobile',
      name: 'iPhone',
      version: '1.0.0',
      size: '24 MB',
      requires: 'iOS 15 or later',
      requiresShort: 'iOS 15+',
      buttons: [{ label: 'Download on the App Store', href: '#', variant: 'primary', icon: 'download' }],
    },
  ] as Platform[],
}

export const footer = {
  links: [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Contact', href: 'mailto:hello@sitr.app' },
  ],
  copyright: `© ${new Date().getFullYear()} Sitr`,
}
