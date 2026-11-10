// Copy for the site. Roles, dates, tools and links come from src/content.js; this file only rewrites wording.
export const plaintextCopy = {
  skip: 'Skip to content',

  galaxyLabel: 'A spiral galaxy drawn in text characters, turning slowly.',
  toLight: 'Switch to light',
  toDark: 'Switch to dark',

  intro: [
    'I’m a software engineer in Lisbon. I build web interfaces and the systems behind them, mostly with React, TypeScript and Node.js, and lately with Elixir and Phoenix.',
    'I work remotely, and it’s how I want to keep working.',
  ],

  contentsTitle: 'Contents',
  contents: [
    { href: '#about', label: 'About', note: 'working remotely, and away from the screen' },
    { href: '#projects', label: 'Projects', note: 'public-facing sites I worked on' },
    { href: '#work', label: 'Work', note: 'six roles since 2017, latest first' },
    { href: '#contact', label: 'Contact', note: 'email, and where else to find me' },
  ],

  aboutTitle: 'About',
  about: [
    'I like the focus and the trust that come with remote work. Clear communication, thoughtful decisions and space to do good work matter to me. Portuguese and English are both native languages for me.',
    'I learned Elixir and Phoenix on the job, and I like figuring things out, whatever the stack happens to be. I use AI coding agents like Claude Code and Codex every day, and I trust them as far as the system can check them. Tests, types, CI and code review are what make their speed safe.',
    'Away from the screen, you’ll find me meditating, doing yoga or having a cup of tea. Preferably somewhere quiet, close to nature, and a little cold.',
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
