// Copy for the site. Roles, dates, tools and links come from src/content.js; this file only rewrites wording.
export const plaintextCopy = {
  skip: 'Skip to content',

  galaxyLabel: 'A spiral galaxy drawn in text characters, turning slowly.',
  toLight: 'Switch to light',
  toDark: 'Switch to dark',

  intro: 'I’m a software engineer working remotely from Lisbon. I build web interfaces and the systems behind them.',

  contentsTitle: 'Contents',
  contents: [
    { href: '#about', label: 'About', note: 'working remotely, and away from the screen' },
    { href: '#projects', label: 'Projects', note: 'public-facing sites I worked on' },
    { href: '#work', label: 'Work', note: 'six roles since 2017, latest first' },
    { href: '#contact', label: 'Contact', note: 'email, and where else to find me' },
  ],

  aboutTitle: 'About',
  about: [
    'I work remotely, and it’s how I want to keep working. I like the focus and the trust that come with it. Clear communication, thoughtful decisions and space to do good work matter to me.',
    'JavaScript is familiar ground: React, TypeScript and Node.js. My current role has taken me into Elixir and Phoenix, which I learned on the job. I like figuring things out, whatever the stack happens to be.',
    'Most days I work alongside AI coding agents like Claude Code and Codex. They help me explore unfamiliar code and try ideas quickly, and I review what they write before it ships.',
    'Away from the screen, you’ll find me with a book or a cup of tea. Preferably somewhere quiet, close to nature, and a little cold.',
    'Portuguese and English are both native languages for me.',
  ],

  projectsTitle: 'Public projects',
  visitLive: 'Visit live',
  archived: 'Archived copy',
  today: 'today',
  showAll: count => `Show all ${count}`,
  showFewer: 'Show fewer',

  workTitle: 'Work',
  workIntro: 'Latest first. Dates marked ~ are approximate.',
  approximate: 'about',
  now: 'now',
  projects: 'Projects:',
  toolsLabel: { appbrewery: 'Areas:', polywork: 'Areas:' },
  tools: 'Tools:',
  // The source joins client and project with a middle dot; here they read as a sentence.
  workItems: {
    'International Labour Organization · Livestreaming platform': 'International Labour Organization: a livestreaming platform',
    'Malaria No More · Zero Malaria, Change the Story, and the UK website': 'Malaria No More: Zero Malaria, Change the Story and the UK website',
    'CreativStrategies · Website and integrations': 'CreativStrategies: website and integrations',
    'Canal River Trust · React, Ruby, and Redux': 'Canal River Trust: React, Ruby and Redux',
    'Discriminology · Report Cards': 'Discriminology: Report Cards',
    'Marzee · Astro and Sanity website': 'Marzee: the Astro and Sanity website',
    'Constellr · React and a custom backend': 'Constellr: React and a custom backend',
  },

  contactTitle: 'Contact',
  contactIntro: 'Tell me what you’re building, where you’re stuck, or what you’d like to explore.',
  email: 'Email',

  signature: 'Built with love',
  // The heart takes the page's colour: white on dark, black on paper.
  heart: { dark: '🤍', light: '🖤' },
}
