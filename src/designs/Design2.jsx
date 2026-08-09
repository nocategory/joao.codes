import './design2.css'
import { useEffect, useRef } from 'react'
import {
  site,
  person,
  nav,
  hero,
  about,
  contact,
  links,
  sources,
} from '../content.js'

const emphasize = (text, words) => {
  if (!words || words.length === 0) {
    return text
  }

  const pattern = new RegExp(`(${words.join('|')})`, 'gi')
  const parts = text.split(pattern)

  return parts.map((part, i) =>
    words.some((w) => w.toLowerCase() === part.toLowerCase()) ? (
      <strong key={i}>{part}</strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

const PALETTES = {
  dark: {
    bg: '#05070a',
    grid: '#1fa971',
    gridFar: '#0d3d29',
    glow: 'rgba(31, 169, 113, 0.55)',
  },
  light: {
    bg: '#f4f1e9',
    grid: '#3a3a35',
    gridFar: '#b8b3a3',
    glow: 'rgba(58, 58, 53, 0.35)',
  },
}

function WireframeCanvas({ theme }) {
  const canvasRef = useRef(null)
  const pointerXRef = useRef(0.5)

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return
    }

    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    let width = 0
    let height = 0
    let dpr = 1
    let rafId = null
    let t = 0

    const palette = PALETTES[theme] || PALETTES.dark

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const handlePointerMove = (e) => {
      pointerXRef.current = e.clientX / window.innerWidth
    }

    const ROWS = 26
    const COLS = 20
    const SPACING = 2.4
    const COL_SPAN = 40

    const project = (x, z, y, cx, horizon, f) => {
      const scale = f / z
      return {
        sx: cx + x * scale,
        sy: horizon + y * scale,
        scale,
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      const horizon = height * 0.37
      const f = height * 0.9
      const pointerShift = (pointerXRef.current - 0.5) * width * 0.25
      const cx = width / 2 - pointerShift

      ctx.lineWidth = 1

      // Horizontal polylines (constant world-z rows)
      for (let row = 0; row < ROWS; row++) {
        const z = 1 + row * SPACING + (t % SPACING)
        const fade = Math.max(0, 1 - row / ROWS)

        if (fade <= 0.02) continue

        ctx.beginPath()
        let started = false

        for (let col = 0; col <= COLS; col++) {
          const worldX = (col / COLS - 0.5) * COL_SPAN
          const wobble =
            Math.sin(worldX * 0.5 + t * 0.6) *
              Math.cos(z * 0.15 + t * 0.4) *
              1.6 +
            Math.sin(z * 0.3 - t * 0.8) * 0.6
          const p = project(worldX * (f / 6), z, wobble, cx, horizon, f)

          if (!started) {
            ctx.moveTo(p.sx, p.sy)
            started = true
          } else {
            ctx.lineTo(p.sx, p.sy)
          }
        }

        const [r, g, b] = hexToRgb(palette.grid)
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${fade * 0.9})`
        ctx.stroke()
      }

      // Vertical connectors (constant world-x columns)
      for (let col = 0; col <= COLS; col++) {
        const worldX = (col / COLS - 0.5) * COL_SPAN

        ctx.beginPath()
        let started = false

        for (let row = 0; row < ROWS; row++) {
          const z = 1 + row * SPACING + (t % SPACING)
          const fade = Math.max(0, 1 - row / ROWS)

          if (fade <= 0.02) continue

          const wobble =
            Math.sin(worldX * 0.5 + t * 0.6) *
              Math.cos(z * 0.15 + t * 0.4) *
              1.6 +
            Math.sin(z * 0.3 - t * 0.8) * 0.6
          const p = project(worldX * (f / 6), z, wobble, cx, horizon, f)

          if (!started) {
            ctx.moveTo(p.sx, p.sy)
            started = true
          } else {
            ctx.lineTo(p.sx, p.sy)
          }
        }

        const [r, g, b] = hexToRgb(palette.gridFar)
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.5)`
        ctx.stroke()
      }

      // Horizon glow line
      const grad = ctx.createLinearGradient(0, horizon - 2, 0, horizon + 2)
      grad.addColorStop(0, 'rgba(0,0,0,0)')
      grad.addColorStop(0.5, palette.glow)
      grad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, horizon - 2, width, 4)
    }

    const hexToRgb = (hex) => {
      const clean = hex.replace('#', '')
      const num = parseInt(clean, 16)
      return [(num >> 16) & 255, (num >> 8) & 255, num & 255]
    }

    const loop = () => {
      t += 0.012
      draw()
      rafId = window.requestAnimationFrame(loop)
    }

    resize()
    window.addEventListener('resize', resize)

    if (!reduceMotion) {
      window.addEventListener('pointermove', handlePointerMove)
      rafId = window.requestAnimationFrame(loop)
    } else {
      draw()
    }

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointerMove)

      if (rafId !== null) {
        window.cancelAnimationFrame(rafId)
      }
    }
  }, [theme])

  return <canvas ref={canvasRef} className="d2-canvas" aria-hidden="true" />
}

export default function Design2({ theme }) {
  return (
    <div className="d2-root">
      <WireframeCanvas theme={theme} />
      <div className="d2-scanlines" aria-hidden="true" />

      <div className="d2-page">
        <header className="d2-header d2-frame">
          <span className="d2-corner d2-corner--tl" />
          <span className="d2-corner d2-corner--tr" />
          <span className="d2-corner d2-corner--bl" />
          <span className="d2-corner d2-corner--br" />

          <a href="#top" className="d2-wordmark">
            {site.wordmark}
          </a>

          <nav className="d2-nav" aria-label="Primary">
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                <span className="d2-nav-prompt">$</span> {item.label}
              </a>
            ))}
          </nav>
        </header>

        <main id="top">
          <section className="d2-hero d2-frame">
            <span className="d2-corner d2-corner--tl" />
            <span className="d2-corner d2-corner--tr" />
            <span className="d2-corner d2-corner--bl" />
            <span className="d2-corner d2-corner--br" />

            <p className="d2-kicker">
              <span className="d2-prompt">$</span> whoami
            </p>
            <p className="d2-eyebrow">{hero.eyebrow}</p>
            <h1 className="d2-headline">
              {hero.headline}
              <span className="d2-cursor" aria-hidden="true" />
            </h1>
            <p className="d2-lead">
              {emphasize(hero.lead, hero.leadEmphasis)}
            </p>

            <div className="d2-hero-bottom">
              <img
                className="d2-avatar"
                src={person.avatar.src}
                alt={person.avatar.alt}
                width={person.avatar.width}
                height={person.avatar.height}
                loading="eager"
              />
              <p className="d2-aside">{hero.aside}</p>
            </div>
          </section>

          <section id={about.id} className="d2-section d2-frame">
            <span className="d2-corner d2-corner--tl" />
            <span className="d2-corner d2-corner--tr" />
            <span className="d2-corner d2-corner--bl" />
            <span className="d2-corner d2-corner--br" />

            <p className="d2-kicker">
              <span className="d2-prompt">$</span> {about.kicker.toLowerCase()}
            </p>
            <h2 className="d2-heading">{about.heading}</h2>

            {about.paragraphs.map((paragraph, i) => (
              <p className="d2-paragraph" key={i}>
                {paragraph}
              </p>
            ))}

            <ul className="d2-stack">
              {about.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </section>

          <section id={contact.id} className="d2-section d2-frame">
            <span className="d2-corner d2-corner--tl" />
            <span className="d2-corner d2-corner--tr" />
            <span className="d2-corner d2-corner--bl" />
            <span className="d2-corner d2-corner--br" />

            <p className="d2-kicker">
              <span className="d2-prompt">$</span>{' '}
              {contact.kicker.toLowerCase()}
            </p>
            <h2 className="d2-heading">{contact.heading}</h2>
            <p className="d2-paragraph">
              {emphasize(contact.meta, contact.metaEmphasis)}
            </p>

            <a className="d2-email" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>

            <ul className="d2-links">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`d2-link d2-link--${link.tone}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </main>

        <footer className="d2-footer d2-frame">
          <span className="d2-corner d2-corner--tl" />
          <span className="d2-corner d2-corner--tr" />
          <span className="d2-corner d2-corner--bl" />
          <span className="d2-corner d2-corner--br" />

          <p className="d2-copyright">{site.copyright}</p>
          <p className="d2-references">
            References:{' '}
            {sources.map((source, i) => (
              <span key={source.href}>
                <a href={source.href} target="_blank" rel="noreferrer">
                  {source.label}
                </a>
                {i < sources.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        </footer>
      </div>
    </div>
  )
}
