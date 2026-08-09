import './design4.css'

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

const PHI = (1 + Math.sqrt(5)) / 2

const ICOSAHEDRON_VERTICES = [
  [-1, PHI, 0],
  [1, PHI, 0],
  [-1, -PHI, 0],
  [1, -PHI, 0],
  [0, -1, PHI],
  [0, 1, PHI],
  [0, -1, -PHI],
  [0, 1, -PHI],
  [PHI, 0, -1],
  [PHI, 0, 1],
  [-PHI, 0, -1],
  [-PHI, 0, 1],
]

const OCTAHEDRON_VERTICES = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
]

function edgesAtShortestDistance(vertices) {
  let shortest = Infinity

  for (let a = 0; a < vertices.length; a += 1) {
    for (let b = a + 1; b < vertices.length; b += 1) {
      const dx = vertices[a][0] - vertices[b][0]
      const dy = vertices[a][1] - vertices[b][1]
      const dz = vertices[a][2] - vertices[b][2]
      const distance = Math.hypot(dx, dy, dz)
      if (distance < shortest) shortest = distance
    }
  }

  const edges = []
  for (let a = 0; a < vertices.length; a += 1) {
    for (let b = a + 1; b < vertices.length; b += 1) {
      const dx = vertices[a][0] - vertices[b][0]
      const dy = vertices[a][1] - vertices[b][1]
      const dz = vertices[a][2] - vertices[b][2]
      if (Math.hypot(dx, dy, dz) <= shortest * 1.01) edges.push([a, b])
    }
  }

  return edges
}

function createTorusKnot(segments = 96) {
  const vertices = []
  const edges = []

  for (let index = 0; index < segments; index += 1) {
    const t = (index / segments) * Math.PI * 2
    const radius = 1.05 + 0.38 * Math.cos(3 * t)
    vertices.push([
      radius * Math.cos(2 * t),
      radius * Math.sin(2 * t),
      0.38 * Math.sin(3 * t),
    ])
    edges.push([index, (index + 1) % segments])
  }

  return { vertices, edges }
}

const TORUS_KNOT = createTorusKnot()
const SHAPES = [
  {
    vertices: ICOSAHEDRON_VERTICES,
    edges: edgesAtShortestDistance(ICOSAHEDRON_VERTICES),
    scale: 1.18,
    offset: [-0.15, -0.15, 0.55],
    speed: [1, 0.82],
    paletteKey: 'accent',
    dots: true,
  },
  {
    vertices: OCTAHEDRON_VERTICES,
    edges: edgesAtShortestDistance(OCTAHEDRON_VERTICES),
    scale: 0.88,
    offset: [2.65, -1.55, -0.7],
    speed: [-0.72, 1.3],
    paletteKey: 'ink',
    dots: true,
  },
  {
    vertices: TORUS_KNOT.vertices,
    edges: TORUS_KNOT.edges,
    scale: 0.82,
    offset: [-2.85, 1.7, -1.2],
    speed: [0.62, -0.9],
    paletteKey: 'faint',
    dots: false,
  },
]

const CANVAS_PALETTES = {
  light: { background: '#f5f0e6', accent: '#ff4f35', ink: '#171717', faint: '#171717' },
  dark: { background: '#191919', accent: '#f4ff3d', ink: '#f7f6f2', faint: '#f7f6f2' },
}

function emphasize(text, words) {
  const emphasized = new Set(words)
  return text.split(/(\s+)/).map((part, index) => {
    const plainWord = part.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}-]+$/gu, '')
    return emphasized.has(plainWord) ? <strong key={`${part}-${index}`}>{part}</strong> : part
  })
}

function PolyhedraCanvas({ theme }) {
  const canvasRef = useRef(null)
  const drawRef = useRef(null)
  const paletteRef = useRef(CANVAS_PALETTES[theme])
  const anglesRef = useRef({ x: -0.35, y: 0.48 })

  useEffect(() => {
    paletteRef.current = CANVAS_PALETTES[theme]
    drawRef.current?.()
  }, [theme])

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointer = { targetX: 0, targetY: 0, easedX: 0, easedY: 0 }
    const size = { width: 0, height: 0, dpr: 1 }
    let rafId = null
    let previousTime = performance.now()
    let pointerListening = false
    let reduceMotion = motionQuery.matches

    function rotateAndProject(vertex, shape, angleX, angleY) {
      const scaledX = vertex[0] * shape.scale
      const scaledY = vertex[1] * shape.scale
      const scaledZ = vertex[2] * shape.scale

      const cosX = Math.cos(angleX)
      const sinX = Math.sin(angleX)
      const yAfterX = scaledY * cosX - scaledZ * sinX
      const zAfterX = scaledY * sinX + scaledZ * cosX

      const cosY = Math.cos(angleY)
      const sinY = Math.sin(angleY)
      const xAfterY = scaledX * cosY + zAfterX * sinY
      const zAfterY = -scaledX * sinY + zAfterX * cosY

      const x = xAfterY + shape.offset[0]
      const y = yAfterX + shape.offset[1]
      const z = zAfterY + shape.offset[2]
      const cameraDistance = 8.5
      const perspective = 6.8 / (cameraDistance - z)
      const unit = Math.min(size.width, size.height) * 0.205

      return {
        x: size.width * 0.5 + x * perspective * unit,
        y: size.height * 0.5 + y * perspective * unit,
        z,
      }
    }

    function draw() {
      const palette = paletteRef.current
      context.setTransform(size.dpr, 0, 0, size.dpr, 0, 0)
      context.clearRect(0, 0, size.width, size.height)
      context.fillStyle = palette.background
      context.fillRect(0, 0, size.width, size.height)

      SHAPES.forEach((shape, shapeIndex) => {
        const shapeAngleX =
          anglesRef.current.x * shape.speed[0] + pointer.easedY * (0.22 + shapeIndex * 0.035)
        const shapeAngleY =
          anglesRef.current.y * shape.speed[1] + pointer.easedX * (0.28 + shapeIndex * 0.04)
        const projected = shape.vertices.map((vertex) =>
          rotateAndProject(vertex, shape, shapeAngleX, shapeAngleY),
        )

        const sortedEdges = shape.edges
          .map(([start, end]) => ({ start, end, depth: (projected[start].z + projected[end].z) / 2 }))
          .sort((a, b) => a.depth - b.depth)

        context.strokeStyle = palette[shape.paletteKey]
        context.lineCap = 'round'
        sortedEdges.forEach(({ start, end, depth }) => {
          const depthFactor = Math.max(0, Math.min(1, (depth + 4) / 8))
          context.globalAlpha = 0.2 + depthFactor * 0.58
          context.lineWidth = 0.65 + depthFactor * 1.45
          context.beginPath()
          context.moveTo(projected[start].x, projected[start].y)
          context.lineTo(projected[end].x, projected[end].y)
          context.stroke()
        })

        if (shape.dots) {
          context.fillStyle = palette[shape.paletteKey]
          projected.forEach((point) => {
            const depthFactor = Math.max(0, Math.min(1, (point.z + 4) / 8))
            context.globalAlpha = 0.45 + depthFactor * 0.5
            context.beginPath()
            context.arc(point.x, point.y, 1.2 + depthFactor * 1.4, 0, Math.PI * 2)
            context.fill()
          })
        }
      })

      context.globalAlpha = 1
    }

    function resize() {
      size.width = window.innerWidth
      size.height = window.innerHeight
      size.dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(size.width * size.dpr)
      canvas.height = Math.round(size.height * size.dpr)
      canvas.style.width = `${size.width}px`
      canvas.style.height = `${size.height}px`
      draw()
    }

    function handlePointerMove(event) {
      pointer.targetX = (event.clientX / Math.max(size.width, 1) - 0.5) * 2
      pointer.targetY = (event.clientY / Math.max(size.height, 1) - 0.5) * 2
    }

    function addPointerListener() {
      if (pointerListening) return
      window.addEventListener('pointermove', handlePointerMove, { passive: true })
      pointerListening = true
    }

    function removePointerListener() {
      if (!pointerListening) return
      window.removeEventListener('pointermove', handlePointerMove)
      pointerListening = false
    }

    function frame(time) {
      const elapsed = Math.min((time - previousTime) / 1000, 0.05)
      previousTime = time
      anglesRef.current.x += elapsed * 0.11
      anglesRef.current.y += elapsed * 0.145
      pointer.easedX += (pointer.targetX - pointer.easedX) * 0.045
      pointer.easedY += (pointer.targetY - pointer.easedY) * 0.045
      draw()
      rafId = window.requestAnimationFrame(frame)
    }

    function startAnimation() {
      if (rafId !== null) return
      previousTime = performance.now()
      rafId = window.requestAnimationFrame(frame)
    }

    function stopAnimation() {
      if (rafId === null) return
      window.cancelAnimationFrame(rafId)
      rafId = null
    }

    function handleMotionChange(event) {
      reduceMotion = event.matches
      if (reduceMotion) {
        stopAnimation()
        removePointerListener()
        pointer.targetX = 0
        pointer.targetY = 0
        pointer.easedX = 0
        pointer.easedY = 0
        draw()
      } else {
        addPointerListener()
        startAnimation()
      }
    }

    drawRef.current = draw
    window.addEventListener('resize', resize)
    motionQuery.addEventListener('change', handleMotionChange)
    resize()

    if (!reduceMotion) {
      addPointerListener()
      startAnimation()
    }

    return () => {
      stopAnimation()
      window.removeEventListener('resize', resize)
      removePointerListener()
      motionQuery.removeEventListener('change', handleMotionChange)
      drawRef.current = null
    }
  }, [])

  return <canvas ref={canvasRef} className="d4-canvas" aria-hidden="true" />
}

export default function Design4({ theme }) {
  return (
    <div className="d4-root">
      <PolyhedraCanvas theme={theme} />

      <div className="d4-poster">
        <header className="d4-header">
          <a className="d4-wordmark" href="#top">
            {site.wordmark}
          </a>
          <nav className="d4-nav" aria-label="Primary navigation">
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </header>

        <main id="top" className="d4-main">
          <section className="d4-hero" aria-labelledby="d4-hero-title">
            <div className="d4-hero-copy">
              <p className="d4-kicker">{hero.eyebrow}</p>
              <h1 id="d4-hero-title" className="d4-headline">
                {hero.headline}
              </h1>
              <p className="d4-lead">{emphasize(hero.lead, hero.leadEmphasis)}</p>
            </div>

            <aside className="d4-hero-aside">
              <img
                className="d4-avatar"
                src={person.avatar.src}
                alt={person.avatar.alt}
                width={person.avatar.width}
                height={person.avatar.height}
              />
              <div className="d4-person-card">
                <p className="d4-person-name">{person.name}</p>
                <p className="d4-person-first">Call me {person.firstName}.</p>
                <p className="d4-person-location">{person.location}</p>
                <a className="d4-person-email" href={`mailto:${person.email}`}>
                  {person.email}
                </a>
              </div>
              <p className="d4-aside-copy">{hero.aside}</p>
            </aside>

            <div className="d4-site-note">
              <p>{site.title}</p>
              <p>{site.description}</p>
            </div>
          </section>

          <section id={about.id} className="d4-about" aria-labelledby="d4-about-title">
            <div className="d4-section-number" aria-hidden="true">
              01
            </div>
            <div className="d4-about-copy">
              <p className="d4-kicker">{about.kicker}</p>
              <h2 id="d4-about-title" className="d4-section-heading">
                {about.heading}
              </h2>
              {about.paragraphs.map((paragraph) => (
                <p className="d4-body-copy" key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
            <ul className="d4-stack" aria-label="Technology stack">
              {about.stack.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </section>

          <section id={contact.id} className="d4-contact" aria-labelledby="d4-contact-title">
            <div className="d4-section-number" aria-hidden="true">
              02
            </div>
            <div className="d4-contact-copy">
              <p className="d4-kicker">{contact.kicker}</p>
              <h2 id="d4-contact-title" className="d4-section-heading">
                {contact.heading}
              </h2>
              <p className="d4-body-copy">{emphasize(contact.meta, contact.metaEmphasis)}</p>
              <a className="d4-email" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </div>

            <ul className="d4-socials">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    className={`d4-button d4-button--${link.tone}`}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </main>

        <footer className="d4-footer">
          <p>{site.copyright}</p>
          <div className="d4-references">
            <span>References:</span>
            {sources.map((source) => (
              <a key={source.href} href={source.href} target="_blank" rel="noreferrer">
                {source.label}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  )
}
