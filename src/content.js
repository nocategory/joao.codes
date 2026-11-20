// Single source of truth for all site content.

export const site = {
  title: 'João Salgueiro | Software Engineer',
  description:
    'João Salgueiro, Portugal-based Software Engineer focused on React, TypeScript, Node.js, Elixir, and Phoenix.',
  wordmark: 'joao.codes',
  copyright: '© 2026 João Salgueiro',
}

export const person = {
  name: 'João Salgueiro',
  firstName: 'João',
  email: 'hi@joao.codes',
  location: 'Portugal',
}

export const contact = {
  id: 'contact',
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

// Experience data.
export const horizon = {
  experience: [
    {
      id: 'rebis',
      company: 'REBIS Consulting',
      start: '2017-03',
      end: '2018-08',
      period: 'Mar–Jul 2017 · Sep 2017–Aug 2018',
      role: 'Web development & full-stack engineering',
      summary:
        'Started with a PHP and MySQL internship, then developed Java applications, PHP websites, and JavaScript extensions for SAP Lumira data visualizations.',
      tools: ['PHP', 'MySQL', 'Java', 'JavaScript', 'D3.js', 'SAP Lumira'],
      periods: [
        { start: '2017-03', end: '2017-07' },
        { start: '2017-09', end: '2018-08' },
      ],
      work: [
        'SAP Lumira extensions for clients including Jerónimo Martins',
        'PHP web applications, including apop.pt',
      ],
    },
    {
      id: 'devv',
      company: 'Devv',
      start: '2019-01',
      end: '2019-02',
      period: 'Jan – Feb 2019',
      role: 'Full-stack developer',
      summary: 'Developed and maintained a web application with Ruby on Rails and Vue.',
      tools: ['Ruby', 'Rails', 'Vue.js'],
      work: [],
    },
    {
      id: 'appbrewery',
      company: 'The App Brewery',
      href: 'https://www.appbrewery.com/',
      start: '2020-01',
      end: '2022-12',
      period: '2020 – 2022',
      role: 'Community manager',
      summary:
        'Helped learners with code and technology questions across the iOS, web, Flutter, and Python course communities. Supported new members and moderated the Discord servers.',
      tools: ['Technical support', 'Community', 'Discord'],
      work: [],
      approximate: true,
    },
    {
      id: 'polywork',
      company: 'Polywork',
      start: '2021-03',
      end: '2024-12',
      period: 'Mar 2021 – Dec 2024',
      role: 'Advisor',
      summary:
        'Advised Polywork across its evolution from a professional network into an AI personal-site builder, giving product feedback, reporting bugs, and suggesting ideas.',
      tools: ['Product feedback', 'Bug reporting', 'Code reviews'],
      work: [],
    },
    {
      id: 'marzee',
      company: 'Marzee',
      href: 'https://marzee.co/',
      start: '2022-03',
      end: '2024-12',
      period: 'Mar 2022 – Dec 2024',
      role: 'Full-stack Node & React developer',
      summary:
        'Built client websites and applications across nonprofit, media, and commercial projects, working with different content systems, integrations, and backends.',
      tools: ['React', 'Node.js', 'Next.js', 'Sanity', 'GraphQL', 'Astro', 'Algolia'],
      work: [
        'International Labour Organization · Livestreaming platform',
        'Malaria No More · Zero Malaria, Change the Story, and the UK website',
        'CreativStrategies · Website and integrations',
        'Canal River Trust · React, Ruby, and Redux',
        'Discriminology · Report Cards',
        'Marzee · Astro and Sanity website',
        'Constellr · React and a custom backend',
      ],
    },
    {
      id: 'complear',
      company: 'Complear',
      href: 'https://complear.com/',
      start: '2025-06',
      end: null,
      period: 'Jun 2025 – Present',
      role: 'Full-stack developer',
      summary:
        'Building company software end to end with React, Elixir, and Phoenix — stepping into a new backend stack and shipping across the existing product.',
      tools: ['React', 'Elixir', 'Phoenix'],
      work: [],
    },
  ],
}

// Public sites I worked on, each with a 1440×900 screenshot scaled to 800×500 in public/work.
// A site redesigned or shut down since has an archive entry: the screenshot and the link show that Wayback Machine copy.
// Without one, the screenshot was taken from the live site. A site with no live address is gone.
// year is roughly when I worked on it: the middle of my time at the company, or the year the site launched.
export const selectedWork = [
  {
    id: 'ilo',
    name: 'ILO Live',
    what: 'livestreaming platform',
    detail: 'Full-stack React and Node.js at Marzee',
    year: 2022,
    live: 'https://live.ilo.org/',
    archive: {
      year: 2024,
      href: 'https://web.archive.org/web/20241213014757/https://live.ilo.org/',
    },
  },
  {
    id: 'polywork',
    name: 'Polywork',
    what: 'professional network & AI site builder',
    detail: 'Product advisor — feedback, bug reports and reviews',
    year: 2023,
    archive: {
      year: 2023,
      href: 'https://web.archive.org/web/20231204054445/https://www.polywork.com/',
    },
  },
  {
    id: 'zero-malaria',
    name: 'Zero Malaria',
    what: 'campaign site',
    detail: 'Frontend and CMS development at Marzee',
    year: 2023,
    live: 'https://zeromalaria.org/',
    archive: {
      year: 2024,
      href: 'https://web.archive.org/web/20241119180628/https://zeromalaria.org/',
    },
  },
  {
    id: 'malaria-no-more-uk',
    name: 'Malaria No More UK',
    what: 'charity website',
    detail: 'Full-stack React and Node.js at Marzee',
    year: 2023,
    live: 'https://malarianomore.org.uk/',
    archive: {
      year: 2024,
      href: 'https://web.archive.org/web/20241203094340/https://malarianomore.org.uk/',
    },
  },
  {
    id: 'constellr',
    name: 'Constellr',
    what: 'satellite data company',
    detail: 'React frontend and custom backend at Marzee',
    year: 2023,
    live: 'https://www.constellr.com/',
    archive: {
      year: 2024,
      href: 'https://web.archive.org/web/20241213045146/https://www.constellr.com/',
    },
  },
]
