import React from 'react'

type Social = {
  name: string
  url: string
  color: string
  underlineColor: string
}

const socials: Social[] = [
  {
    name: 'X',
    url: 'https://x.com/joaodotcodes',
    color: 'text-zinc-700 dark:text-zinc-300',
    underlineColor: '#FF6B6B',
  },
  {
    name: 'github',
    url: 'https://github.com/nocategory',
    color: 'text-zinc-700 dark:text-zinc-300',
    underlineColor: '#2ECDC2',
  },
  {
    name: 'linkedin',
    url: 'https://www.linkedin.com/in/jfilsalgueiro/',
    color: 'text-zinc-700 dark:text-zinc-300',
    underlineColor: '#21d286',
  },
  {
    name: 'polywork',
    url: 'https://www.polywork.com/js',
    color: 'text-zinc-700 dark:text-zinc-300',
    underlineColor: '#8e99ed',
  },
  {
    name: 'bluesky',
    url: 'https://bsky.app/profile/joao.codes',
    color: 'text-zinc-700 dark:text-zinc-300',
    underlineColor: '#4a90e2',
  },
]

const Socials: React.FC = () => (
  <nav className="rounded-lg backdrop-blur-sm bg-white/10 dark:bg-black/20 py-3 px-5 md:py-2 shadow-md w-max m-auto">
    <ul className="flex flex-wrap items-center justify-center text-sm md:text-base font-medium max-w-content">
      {socials.map(social => (
        <li key={social.name}>
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecorationColor: social.underlineColor,
              textDecorationThickness: '0.15rem',
            }}
            className={`
              hover:${social.color}
              hover:underline
              transition-all duration-200
              px-3 py-1.5
              rounded-md
              active:scale-95
            `}
            aria-label={`Link to ${social.name}`}
          >
            {social.name}
          </a>
        </li>
      ))}
    </ul>
  </nav>
)

export default Socials
