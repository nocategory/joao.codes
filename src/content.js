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

// Portfolio copy and experience data.
export const horizon = {
  wordmark: 'joao.codes',
  role: 'Software engineer',
  intro: 'Building for the web. Learning what comes next.',
  aboutCta: 'A little about me',
  location: 'Based in Lisbon. Working everywhere.',
  aboutTitle: 'A person behind\nthe pixels.',
  aboutParagraphs: [
    "I'm João, a full-stack developer in Lisbon. I build web interfaces and the systems behind them, using the tools the work calls for. JavaScript is familiar ground; my current role has taken me into Elixir and Phoenix.",
    'I like the focus and trust of remote work. Clear communication, thoughtful decisions, and space to do good work matter to me.',
    'Away from the screen, you’ll find me with a book or a cup of tea. Preferably somewhere quiet, close to nature, and a little cold.',
  ],
  portraitCaption: 'João, away from the keyboard.',
  contactTitle: 'Have something\nin mind?',
  contactIntro: 'I’m always happy to hear about thoughtful projects and the people behind them.',
  footerNote: 'Built with care, in Lisbon.',
  stack: ['React', 'TypeScript', 'Node.js', 'Elixir', 'Phoenix'],
  experienceTitle: 'Experience across stacks.',
  experienceIntro: 'The product shapes the toolkit. Select a role to see what I worked on and the technologies I used.',
  experience: [
    {
      id: 'rebis', company: 'REBIS Consulting', start: '2017-03', end: '2018-08',
      period: 'Mar–Jul 2017 · Sep 2017–Aug 2018', role: 'Web development & full-stack engineering',
      summary: 'Started with a PHP and MySQL internship, then developed Java applications, PHP websites, and JavaScript extensions for SAP Lumira data visualizations.',
      tools: ['PHP', 'MySQL', 'Java', 'JavaScript', 'D3.js', 'SAP Lumira'],
      periods: [{ start: '2017-03', end: '2017-07' }, { start: '2017-09', end: '2018-08' }],
      work: ['SAP Lumira extensions for clients including Jerónimo Martins', 'PHP web applications, including apop.pt'],
    },
    {
      id: 'devv', company: 'Devv', start: '2019-01', end: '2019-02',
      period: 'Jan – Feb 2019', role: 'Full-stack developer',
      summary: 'Developed and maintained a web application with Ruby on Rails and Vue.',
      tools: ['Ruby', 'Rails', 'Vue.js'], work: [],
    },
    {
      id: 'appbrewery', company: 'The App Brewery', start: '2020-01', end: '2022-12',
      period: '2020 – 2022', role: 'Community manager',
      summary: 'Helped learners with code and technology questions across the iOS, web, Flutter, and Python course communities. Supported new members and moderated the Discord servers.',
      tools: ['Technical support', 'Community', 'Discord'], work: [],
      approximate: true,
    },
    {
      id: 'polywork', company: 'Polywork', start: '2021-03', end: '2024-12',
      period: 'Mar 2021 – Dec 2024', role: 'Advisor',
      summary: 'Contributed product feedback, bug reports, and ideas for a professional network built around the different kinds of work people do.',
      tools: ['Product feedback', 'Bug reporting', 'Code reviews'], work: [],
    },
    {
      id: 'marzee', company: 'Marzee', start: '2022-03', end: '2024-12',
      period: 'Mar 2022 – Dec 2024', role: 'Full-stack Node & React developer',
      summary: 'Built client websites and applications across nonprofit, media, and commercial projects, working with different content systems, integrations, and backends.',
      tools: ['React', 'Node.js', 'Next.js', 'Sanity', 'GraphQL', 'Astro', 'Algolia'],
      work: ['International Labour Organization · Livestreaming platform', 'Malaria No More · Zero Malaria, Change the Story, and the UK website', 'CreativStrategies · Website and integrations', 'Canal River Trust · React, Ruby, and Redux', 'Discriminology · Report Cards', 'Marzee · Astro and Sanity website', 'Constellr · React and a custom backend'],
    },
    {
      id: 'complear', company: 'Complear', start: '2025-06', end: null,
      period: 'Jun 2025 – Present', role: 'Full-stack developer',
      summary: 'Building company software with React, Elixir, and Phoenix. I learned Elixir and Phoenix as part of the job, adapting to the existing product and the work it needed.',
      tools: ['React', 'Elixir', 'Phoenix'], work: [],
    },
  ],
}
