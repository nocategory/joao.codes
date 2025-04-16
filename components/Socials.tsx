import { usePathname } from 'next/navigation'
import React from 'react'

type Social = {
  name: string
  url: string
  color: string
  underlineColor: string
}

const socials: Social[] = [
  {
    name: 'home',
    url: '/',
    color: 'text-zinc-700 dark:text-zinc-300',
    underlineColor: '#21d286',
  },
  {
    name: 'blog',
    url: 'https://blog.joaosalgueiro.com',
    color: 'text-zinc-700 dark:text-zinc-300',
    underlineColor: '#8e99ed',
  },
  {
    name: 'bluesky',
    url: 'https://bsky.app/profile/joao.codes',
    color: 'text-zinc-700 dark:text-zinc-300',
    underlineColor: '#4a90e2',
  },
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
]

const Socials: React.FC = () => {
  const pathname = usePathname()
  console.log(pathname)

  const isActive = (name: string) => {
    return (
      pathname.includes(name) || (pathname.endsWith('/') && name === 'home')
    )
  }

  return (
    <nav className="rounded-lg backdrop-blur-sm">
      <ul
        className="text-sm md:text-base font-medium text-center
             p-2 rounded-lg dark:bg-black/20 bg-black/5"
      >
        {socials.map(social => (
          <li key={social.name} className={`inline-block`}>
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
              ${isActive(social.name) ? 'underline ' : ''}
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
}

export default Socials
