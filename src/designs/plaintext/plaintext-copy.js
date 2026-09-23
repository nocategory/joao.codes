// Copy for the site. Roles, dates, tools and links come from src/content.js; this file only rewrites wording.
export const plaintextCopy = {
  skip: 'Skip to content',

  galaxyLabel: 'A spiral galaxy drawn in text characters, turning slowly.',
  toLight: 'Switch to light',
  toDark: 'Switch to dark',

  intro: 'I’m a software engineer based in Lisbon. I build web interfaces and the systems behind them.',

  contentsTitle: 'Contents',
  contents: [
    { href: '#about', label: 'About', note: 'how I like to work, and away from it' },
    { href: '#work', label: 'Work', note: 'six roles since 2017, latest first' },
    { href: '#contact', label: 'Contact', note: 'email, and where else to find me' },
  ],

  aboutTitle: 'About',
  about: [
    'JavaScript is familiar ground: React, TypeScript and Node.js. My current role has taken me into Elixir and Phoenix, which I learned on the job. I like figuring things out, whatever the stack happens to be.',
    'I like the focus and trust of remote work. Clear communication, thoughtful decisions and space to do good work matter to me.',
    'Away from the screen, you’ll find me with a book or a cup of tea. Preferably somewhere quiet, close to nature, and a little cold.',
    'Portuguese and English are both native languages for me.',
  ],

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
