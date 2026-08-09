// Single source of truth for all site content.
// Designs are skins over this data — never hardcode copy in a design file.

export const site = {
  title: 'João Salgueiro | Software Engineer',
  description:
    'João Salgueiro, Lisbon-based Software Engineer focused on React, TypeScript, Node.js, and reusable web interfaces.',
  wordmark: 'joao.codes',
  copyright: '© 2026 João Salgueiro',
}

export const person = {
  name: 'João Salgueiro',
  firstName: 'João',
  email: 'hi@joao.codes',
  location: 'Lisbon, Portugal',
  avatar: {
    src: '/avatar-photo.jpg',
    alt: 'Photo of João Salgueiro',
    width: 320,
    height: 320,
  },
}

export const nav = [
  { label: 'work', href: '#work' },
  { label: 'contact', href: '#contact' },
]

export const hero = {
  eyebrow: 'Full-stack developer | JavaScript ♥',
  headline: 'I build clean, reusable web experiences.',
  // Words listed in `emphasis` should be visually emphasised (e.g. <strong>).
  lead: 'I am João, a remote-first full-stack developer with a heart for the JavaScript ecosystem and the flexibility to move across stacks when the product needs it. I love the focus and trust of remote work.',
  leadEmphasis: ['remote-first', 'focus', 'trust'],
  aside:
    'Away from the screen, I like nature 🌳, winter cold, tea 🍵, reading, yoga, and meditation 🧘.',
}

export const about = {
  id: 'work',
  kicker: 'About',
  heading: 'Neat UI. Reusable systems. Practical engineering.',
  paragraphs: [
    'I care about interfaces that feel neat, reusable, and easy to keep improving. That shows up in professional projects, open-source contributions, and the advice I give to teams.',
    'Most of my work sits in the JavaScript web world, especially React, TypeScript, Node.js, and Next.js, but I am happy crossing boundaries 😉.',
  ],
  stack: ['React', 'TypeScript', 'Node.js', 'Next.js'],
}

export const contact = {
  id: 'contact',
  kicker: 'Find me online',
  heading: 'Lisbon-based, remote lover.',
  meta: 'I like working with teams that communicate clearly, leave room for focus, and care about the purpose and meaning behind what they are building. Portuguese and English are both native languages for me.',
  metaEmphasis: ['purpose', 'meaning'],
  email: 'hi@joao.codes',
}

export const links = [
  { label: 'GitHub', href: 'https://github.com/nocategory', tone: 'github' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jfilsalgueiro/',
    tone: 'linkedin',
  },
  {
    label: 'Bluesky',
    href: 'https://bsky.app/profile/joao.codes',
    tone: 'bluesky',
  },
]

export const sources = [
  { label: 'Current site', href: 'https://www.joao.codes/' },
  {
    label: 'Open source site',
    href: 'https://github.com/nocategory/joao.codes',
  },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jfilsalgueiro/' },
]
