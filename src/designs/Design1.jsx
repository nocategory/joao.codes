import './design1.css'
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

const PALETTES = {
  light: {
    node: 'rgba(28, 32, 40, 0.62)',
    line: '28, 32, 40',
    tri: '122, 46, 31',
    accent: 'rgba(122, 46, 31, 0.85)',
  },
  dark: {
    node: 'rgba(226, 233, 246, 0.8)',
    line: '198, 212, 238',
    tri: '224, 163, 94',
    accent: 'rgba(224, 163, 94, 0.9)',
  },
}

function emphasize(text, words) {
  if (!words || words.length === 0) return text
  const escaped = words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const parts = text.split(new RegExp(`(${escaped.join('|')})`, 'gi'))
  const lower = words.map((w) => w.toLowerCase())
  return parts.map((part, i) =>
    lower.includes(part.toLowerCase()) ? (
      <strong key={i}>{part}</strong>
    ) : (
      part
    ),
  )
}

export default function Design1({ theme }) {
  const canvasRef = useRef(null)
  const nodesRef = useRef([])
  const paletteRef = useRef(PALETTES[theme === 'dark' ? 'dark' : 'light'])
  const redrawRef = useRef(null)

  useEffect(() => {
    paletteRef.current = PALETTES[theme === 'dark' ? 'dark' : 'light']
    if (redrawRef.current) redrawRef.current()
  }, [theme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let raf = 0
    const pointer = { x: -9999, y: -9999, active: false }

    const seed = (count) => {
      const nodes = []
      for (let i = 0; i < count; i += 1) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.16,
          vy: (Math.random() - 0.5) * 0.16,
          r: 0.7 + Math.random() * 1.5,
        })
      }
      nodesRef.current = nodes
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const prevW = width
      const prevH = height
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const target = Math.max(
        60,
        Math.min(120, Math.round((width * height) / 16000)),
      )

      if (nodesRef.current.length === 0) {
        seed(target)
      } else if (prevW > 0 && prevH > 0) {
        const sx = width / prevW
        const sy = height / prevH
        nodesRef.current.forEach((n) => {
          n.x *= sx
          n.y *= sy
        })
      }
    }

    const linkDist = () => Math.min(190, Math.max(120, width * 0.12))

    const draw = () => {
      const p = paletteRef.current
      const nodes = nodesRef.current
      const max = linkDist()
      const maxSq = max * max
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 > maxSq) continue
          const t = 1 - Math.sqrt(d2) / max

          if (t > 0.62) {
            for (let k = j + 1; k < nodes.length; k += 1) {
              const c = nodes[k]
              const d1x = a.x - c.x
              const d1y = a.y - c.y
              const d2x = b.x - c.x
              const d2y = b.y - c.y
              const ac = d1x * d1x + d1y * d1y
              const bc = d2x * d2x + d2y * d2y
              if (ac < maxSq * 0.16 && bc < maxSq * 0.16) {
                ctx.fillStyle = `rgba(${p.tri}, 0.035)`
                ctx.beginPath()
                ctx.moveTo(a.x, a.y)
                ctx.lineTo(b.x, b.y)
                ctx.lineTo(c.x, c.y)
                ctx.closePath()
                ctx.fill()
                break
              }
            }
          }

          ctx.strokeStyle = `rgba(${p.line}, ${(t * 0.34).toFixed(3)})`
          ctx.lineWidth = 0.6
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      for (let i = 0; i < nodes.length; i += 1) {
        const n = nodes[i]
        ctx.fillStyle = i % 11 === 0 ? p.accent : p.node
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const step = () => {
      const nodes = nodesRef.current
      const pullR = 170
      for (let i = 0; i < nodes.length; i += 1) {
        const n = nodes[i]
        if (pointer.active) {
          const dx = pointer.x - n.x
          const dy = pointer.y - n.y
          const d = Math.hypot(dx, dy)
          if (d < pullR && d > 1) {
            const f = (1 - d / pullR) * 0.012
            n.vx += (dx / d) * f
            n.vy += (dy / d) * f
          }
        }
        n.vx *= 0.994
        n.vy *= 0.994
        const sp = Math.hypot(n.vx, n.vy)
        if (sp > 0.5) {
          n.vx = (n.vx / sp) * 0.5
          n.vy = (n.vy / sp) * 0.5
        }
        n.x += n.vx
        n.y += n.vy
        if (n.x < -20) n.x = width + 20
        if (n.x > width + 20) n.x = -20
        if (n.y < -20) n.y = height + 20
        if (n.y > height + 20) n.y = -20
      }
    }

    const loop = () => {
      step()
      draw()
      raf = window.requestAnimationFrame(loop)
    }

    const onResize = () => {
      resize()
      if (reduced) draw()
    }
    const onPointerMove = (e) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
      pointer.active = true
    }
    const onPointerLeave = () => {
      pointer.active = false
      pointer.x = -9999
      pointer.y = -9999
    }

    resize()
    redrawRef.current = draw

    if (reduced) {
      draw()
    } else {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      window.addEventListener('pointerleave', onPointerLeave)
      raf = window.requestAnimationFrame(loop)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      redrawRef.current = null
    }
  }, [])

  return (
    <div className="d1-root" data-d1-theme={theme === 'dark' ? 'dark' : 'light'}>
      <canvas className="d1-canvas" ref={canvasRef} aria-hidden="true" />

      <div className="d1-shell">
        <header className="d1-header">
          <a className="d1-wordmark" href="#top" title={site.title}>
            {site.wordmark}
          </a>
          <nav className="d1-nav" aria-label="Primary">
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </header>

        <main id="top">
          <section className="d1-section d1-hero d1-wash">
            <div>
              <p className="d1-eyebrow">{hero.eyebrow}</p>
              <h1 className="d1-hero-headline">{hero.headline}</h1>
              <p className="d1-lead">
                {emphasize(hero.lead, hero.leadEmphasis)}
              </p>
              <p className="d1-aside">{hero.aside}</p>
            </div>
            <figure className="d1-portrait">
              <img
                src={person.avatar.src}
                alt={person.avatar.alt}
                width={person.avatar.width}
                height={person.avatar.height}
                loading="eager"
                decoding="async"
              />
            </figure>
          </section>

          <section className="d1-section d1-wash" id={about.id}>
            <div className="d1-columns">
              <div>
                <p className="d1-kicker">{about.kicker}</p>
                <h2 className="d1-heading">{about.heading}</h2>
              </div>
              <div className="d1-body">
                {about.paragraphs.map((text) => (
                  <p key={text}>{text}</p>
                ))}
                <ul className="d1-stack">
                  {about.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="d1-section d1-wash" id={contact.id}>
            <div className="d1-columns">
              <div>
                <p className="d1-kicker">{contact.kicker}</p>
                <h2 className="d1-heading">{contact.heading}</h2>
                <p className="d1-aside">
                  {person.name} — {person.location}
                </p>
              </div>
              <div className="d1-body">
                <p className="d1-meta">
                  {emphasize(contact.meta, contact.metaEmphasis)}
                </p>
                <a className="d1-email" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
                <div className="d1-links">
                  {links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      data-tone={link.tone}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="d1-footer">
          <p title={site.description}>{site.copyright}</p>
          <div className="d1-refs">
            <span className="d1-refs-label">References:</span>
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
