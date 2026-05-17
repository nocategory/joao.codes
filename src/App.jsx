import { useEffect, useMemo, useState } from 'react'
import WaterColor from './components/WaterColor'

const links = [
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

const sources = [
  { label: 'Current site', href: 'https://www.joao.codes/' },
  { label: 'Open source site', href: 'https://github.com/nocategory/joao.codes' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jfilsalgueiro/' },
]

const getSystemTheme = () =>
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark'

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return 'dark'
  }

  const stored = localStorage.getItem('theme')

  if (stored === 'light' || stored === 'dark') {
    return stored
  }

  return getSystemTheme()
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme)
  const [isThemeAnimating, setIsThemeAnimating] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    if (localStorage.getItem('theme')) {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)')
    const handleSystemChange = () => setTheme(getSystemTheme())

    mediaQuery.addEventListener('change', handleSystemChange)

    return () => mediaQuery.removeEventListener('change', handleSystemChange)
  }, [])

  const toggleLabel = useMemo(
    () => (theme === 'dark' ? 'Switch to light' : 'Switch to dark'),
    [theme],
  )

  const handleThemeToggle = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'

    setIsThemeAnimating(true)
    setTheme(nextTheme)
    localStorage.setItem('theme', nextTheme)
    window.setTimeout(() => setIsThemeAnimating(false), 900)
  }

  return (
    <div className="page">
      <WaterColor />
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="joao.codes home">
          joao.codes
        </a>
        <nav className="nav" aria-label="Primary navigation">
          <a href="#work">work</a>
          <a href="#contact">contact</a>
        </nav>
        <button
          className="theme-toggle"
          type="button"
          onClick={handleThemeToggle}
          aria-pressed={theme === 'dark'}
        >
          {toggleLabel}
        </button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Full-stack developer | JavaScript ♥</p>
            <h1>I build clean, reusable web experiences.</h1>
            <p className="lead">
              I am João, a <strong>remote-first</strong> full-stack developer
              with a heart for the JavaScript ecosystem and the flexibility to
              move across stacks when the product needs it. I love the{' '}
              <strong>focus</strong> and <strong>trust</strong> of remote work.
              <br />
              <span className="lead-aside">
                Away from the screen, I like nature{' '}
              <span role="img" aria-label="tree">
                🌳
              </span>
              , winter cold, tea{' '}
              <span role="img" aria-label="tea">
                🍵
              </span>
              , reading, yoga, and meditation{' '}
              <span role="img" aria-label="meditation">
                🧘
              </span>
              .
              </span>
            </p>
          </div>

          <aside className="hero-side" aria-label="Profile links">
            <div
              className={`portrait ${isThemeAnimating ? 'is-switching' : ''}`}
              aria-label="João Salgueiro monogram"
            >
              <img
                className="avatar-mark"
                src="/avatar-mark.jpeg"
                alt="Illustrated João Salgueiro avatar"
                width="320"
                height="320"
              />
            </div>
            <div className="link-row" aria-label="Social links">
              {links.map(link => (
                <a
                  key={link.label}
                  className={`social-link ${link.tone}`}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${link.label}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </aside>
        </section>

        <section id="work" className="section split">
          <div>
            <p className="section-kicker">About</p>
            <h2>Neat UI. Reusable systems. Practical engineering.</h2>
          </div>
          <div className="statement">
            <p>
              I care about interfaces that feel neat, reusable, and easy to
              keep improving. That shows up in professional projects,
              open-source contributions, and the advice I give to teams.
            </p>
            <p>
              Most of my work sits in the JavaScript web world, especially
              React, TypeScript, Node.js, and Next.js, but I am happy crossing
              boundaries{' '}
              <span role="img" aria-label="wink">
                😉
              </span>
              .
            </p>
          </div>
        </section>

        <section id="contact" className="section contact">
          <p className="section-kicker">Find me online</p>
          <h2>Lisbon-based, remote lover.</h2>
          <p className="contact-meta">
            I like working with teams that communicate clearly, leave room for
            focus, and care about the <strong>purpose</strong> behind what
            they are building. Portuguese and English are both native languages
            for me.
          </p>
          <div className="contact-links">
            <a className="email-link" href="mailto:hi@joao.codes">
              hi@joao.codes
            </a>
            {links.map(link => (
              <a
                key={link.label}
                className={`social-link ${link.tone}`}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${link.label}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-primary">
          <span>© 2026 João Salgueiro</span>
          <a href="mailto:hi@joao.codes">hi@joao.codes</a>
        </div>
        <div className="footer-sources">
          <span>References:</span>
          {sources.map(source => (
            <a key={source.label} href={source.href} target="_blank" rel="noreferrer">
              {source.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  )
}

export default App
