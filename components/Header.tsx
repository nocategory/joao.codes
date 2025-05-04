'use client'
import WaterColor from '@components/WaterColor'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Links = {
  name: string
  url: string
  color: string
  underlineColor: string
}

const links: Links[] = [
  {
    name: 'home',
    url: '/',
    color: 'text-zinc-700 dark:text-zinc-300',
    underlineColor: '#21d286',
  },
  {
    name: 'posts',
    url: '/posts',
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

const Header: React.FC = () => {
  const pathname = usePathname()

  const isActive = (name: string) => {
    return (
      pathname?.includes(name) || (pathname?.endsWith('/') && name === 'home')
    )
  }

  return (
    <nav className="rounded-lg backdrop-blur-lg">
      <ul
        className="text-sm md:text-base font-medium text-center
             p-2 rounded-lg dark:bg-black/20 bg-black/5"
      >
        {links.map(link => (
          <li key={link.name} className={`inline-block`}>
            <Link
              href={link.url}
              rel="noopener noreferrer"
              style={{
                textDecorationColor: link.underlineColor,
                textDecorationThickness: '0.15rem',
              }}
              className={`
              hover:${link.color}
              hover:underline
              transition-all duration-200
              px-3 py-1.5
              rounded-md
              active:scale-95
              ${isActive(link.name) ? 'underline ' : ''}
            `}
              aria-label={`Link to ${link.name}`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Header
