import './design3.css'
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

  return text
    .split(pattern)
    .map((part, i) =>
      words.some((w) => w.toLowerCase() === part.toLowerCase()) ? (
        <strong key={i}>{part}</strong>
      ) : (
        <span key={i}>{part}</span>
      ),
    )
}

const PALETTES = {
  dark: {
    bg: '#060d13',
    fade: 'rgba(6, 13, 19, 0.075)',
    strokes: [
      'rgba(94, 242, 208, 0.42)',
      'rgba(120, 200, 255, 0.34)',
      'rgba(168, 255, 226, 0.26)',
      'rgba(255, 179, 122, 0.30)',
    ],
    weights: [0.42, 0.32, 0.18, 0.08],
    staticStroke: 'rgba(94, 242, 208, 0.30)',
  },
  light: {
    bg: '#f2f4f6',
    fade: 'rgba(242, 244, 246, 0.085)',
    strokes: [
      'rgba(96, 122, 145, 0.30)',
      'rgba(126, 150, 170, 0.24)',
      'rgba(66, 96, 122, 0.22)',
      'rgba(22, 104, 216, 0.28)',
    ],
    weights: [0.4, 0.3, 0.2, 0.1],
    staticStroke: 'rgba(80, 106, 130, 0.32)',
  },
}

// Layered-sine pseudo-noise: two spatial frequencies drifting over time.
const F1 = 0.0032
const F2 = 0.0091

const fieldAngle = (x, y, t) => {
  const a =
    Math.sin(x * F1 + t * 0.21) + Math.cos(y * F1 * 1.17 - t * 0.16)
  const b =
    Math.sin((x + y) * F2 * 0.55 - t * 0.34) *
    Math.cos((x - y) * F2 * 0.42 + t * 0.27)

  return (a * 1.35 + b * 0.85) * 1.15
}

function FlowField({ theme }) {
  const canvasRef = useRef(null)
  const themeRef = useRef(theme)

  themeRef.current = theme

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return undefined
    }

    const ctx = canvas.getContext('2d', { alpha: false })

    if (!ctx) {
      return undefined
    }

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let dpr = 1

    const COUNT = 560
    // Preallocated flat state: x, y, vx, vy, life, maxLife, colorIndex
    const px = new Float32Array(COUNT)
    const py = new Float32Array(COUNT)
    const pvx = new Float32Array(COUNT)
    const pvy = new Float32Array(COUNT)
    const plife = new Float32Array(COUNT)
    const pmax = new Float32Array(COUNT)
    const pcol = new Uint8Array(COUNT)
    const pw = new Float32Array(COUNT)

    const palette = () => PALETTES[themeRef.current] ?? PALETTES.dark

    const pickColor = () => {
      const w = palette().weights
      let r = Math.random()

      for (let i = 0; i < w.length; i += 1) {
        r -= w[i]

        if (r <= 0) {
          return i
        }
      }

      return 0
    }

    const spawn = (i, anywhere) => {
      px[i] = Math.random() * width
      py[i] = anywhere ? Math.random() * height : Math.random() * height
      pvx[i] = 0
      pvy[i] = 0
      plife[i] = 0
      pmax[i] = 90 + Math.random() * 260
      pcol[i] = pickColor()
      pw[i] = 0.5 + Math.random() * 1.15
    }

    const pointer = { x: -9999, y: -9999, active: false }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.lineCap = 'round'
      ctx.fillStyle = palette().bg
      ctx.fillRect(0, 0, width, height)
    }

    const drawStatic = () => {
      const p = palette()

      ctx.fillStyle = p.bg
      ctx.fillRect(0, 0, width, height)
      ctx.strokeStyle = p.staticStroke
      ctx.lineWidth = 1

      const step = 34

      ctx.beginPath()

      for (let x = step * 0.5; x < width; x += step) {
        for (let y = step * 0.5; y < height; y += step) {
          const a = fieldAngle(x, y, 0)
          const len = 11

          ctx.moveTo(x - Math.cos(a) * len * 0.5, y - Math.sin(a) * len * 0.5)
          ctx.lineTo(x + Math.cos(a) * len * 0.5, y + Math.sin(a) * len * 0.5)
        }
      }

      ctx.stroke()
    }

    resize()

    for (let i = 0; i < COUNT; i += 1) {
      spawn(i, true)
      plife[i] = Math.random() * pmax[i]
    }

    if (reduced) {
      drawStatic()

      const onResizeStatic = () => {
        resize()
        drawStatic()
      }

      window.addEventListener('resize', onResizeStatic)

      return () => {
        window.removeEventListener('resize', onResizeStatic)
      }
    }

    let raf = 0
    let t = 0
    let last = performance.now()

    const onPointerMove = (event) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
      pointer.active = true
    }

    const onPointerLeave = () => {
      pointer.active = false
      pointer.x = -9999
      pointer.y = -9999
    }

    const step = (now) => {
      const dt = Math.min((now - last) / 16.6667, 2.5)

      last = now
      t += dt * 0.016

      const p = palette()

      ctx.fillStyle = p.fade
      ctx.fillRect(0, 0, width, height)
      ctx.lineWidth = 1

      let current = -1

      for (let i = 0; i < COUNT; i += 1) {
        const x = px[i]
        const y = py[i]
        const a = fieldAngle(x, y, t)

        let ax = Math.cos(a) * 0.42
        let ay = Math.sin(a) * 0.42

        if (pointer.active) {
          const dx = x - pointer.x
          const dy = y - pointer.y
          const d2 = dx * dx + dy * dy

          if (d2 < 42000 && d2 > 1) {
            const d = Math.sqrt(d2)
            const f = (1 - d / 205) * 1.5

            // repulsion + tangential swirl
            ax += (dx / d) * f * 0.9 - (dy / d) * f * 0.85
            ay += (dy / d) * f * 0.9 + (dx / d) * f * 0.85
          }
        }

        let vx = pvx[i] * 0.86 + ax
        let vy = pvy[i] * 0.86 + ay
        const sp = Math.hypot(vx, vy)

        if (sp > 2.6) {
          vx = (vx / sp) * 2.6
          vy = (vy / sp) * 2.6
        }

        const nx = x + vx * dt
        const ny = y + vy * dt

        pvx[i] = vx
        pvy[i] = vy
        plife[i] += dt

        if (
          plife[i] > pmax[i] ||
          nx < -40 ||
          nx > width + 40 ||
          ny < -40 ||
          ny > height + 40
        ) {
          spawn(i, true)
          continue
        }

        px[i] = nx
        py[i] = ny

        if (pcol[i] !== current) {
          current = pcol[i]
          ctx.strokeStyle = p.strokes[current]
        }

        ctx.lineWidth = pw[i]
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(nx, ny)
        ctx.stroke()
      }

      raf = window.requestAnimationFrame(step)
    }

    raf = window.requestAnimationFrame(step)

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('blur', onPointerLeave)

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('blur', onPointerLeave)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return
    }

    const ctx = canvas.getContext('2d')

    if (!ctx) {
      return
    }

    ctx.fillStyle = (PALETTES[theme] ?? PALETTES.dark).bg
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
  }, [theme])

  return <canvas ref={canvasRef} className="d3-canvas" aria-hidden="true" />
}

export default function Design3({ theme }) {
  return (
    <div className="d3-root" data-theme={theme}>
      <FlowField theme={theme} />

      <div className="d3-shell">
        <header className="d3-header">
          <a className="d3-wordmark" href="#top">
            {site.wordmark}
          </a>
          <nav className="d3-nav" aria-label="Primary">
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </header>

        <main id="top">
          <section className="d3-section d3-panel d3-hero">
            <div>
              <p className="d3-eyebrow">{hero.eyebrow}</p>
              <h1 className="d3-headline">{hero.headline}</h1>
              <p className="d3-lead">
                {emphasize(hero.lead, hero.leadEmphasis)}
              </p>
              <p className="d3-aside">{hero.aside}</p>
            </div>
            <div className="d3-avatar-wrap">
              <img
                className="d3-avatar"
                src={person.avatar.src}
                alt={person.avatar.alt}
                width={person.avatar.width}
                height={person.avatar.height}
                loading="eager"
                decoding="async"
              />
            </div>
          </section>

          <section id={about.id} className="d3-section d3-panel">
            <p className="d3-kicker">{about.kicker}</p>
            <h2 className="d3-heading">{about.heading}</h2>
            <div className="d3-body">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <ul className="d3-stack">
              {about.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section id={contact.id} className="d3-section d3-panel">
            <div className="d3-contact-grid">
              <div>
                <p className="d3-kicker">{contact.kicker}</p>
                <h2 className="d3-heading">{contact.heading}</h2>
                <p className="d3-meta d3-body">
                  {emphasize(contact.meta, contact.metaEmphasis)}
                </p>
                <a className="d3-email" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
                <p className="d3-body" style={{ marginTop: '1rem' }}>
                  {person.name} — {person.location}
                </p>
              </div>
              <div className="d3-links">
                {links.map((link) => (
                  <a
                    key={link.href}
                    className="d3-link"
                    data-tone={link.tone}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>{link.label}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </main>

        <footer className="d3-footer">
          <span>{site.copyright}</span>
          <div className="d3-sources">
            <span>References:</span>
            {sources.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noreferrer"
              >
                {source.label}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  )
}
