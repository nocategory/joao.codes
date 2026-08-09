import './design5.css'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
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
  dark: {
    bg: '#0a0a0c',
    fog: '#0a0a0c',
    terrain: '#6f7480',
    structure: '#aab0bb',
    accent: '#e2603f',
    terrainOpacity: 0.55,
    structureOpacity: 0.42,
    accentOpacity: 0.9,
  },
  light: {
    bg: '#f4f1ea',
    fog: '#f4f1ea',
    terrain: '#8d8878',
    structure: '#4a4740',
    accent: '#b3341a',
    terrainOpacity: 0.6,
    structureOpacity: 0.4,
    accentOpacity: 0.85,
  },
}

// Camera chapters: glide over terrain -> pass through the structure -> rise to horizon.
const PATH = [
  { pos: [0, 15, 42], look: [0, 8, -50] },
  { pos: [13, 9, -108], look: [-6, 7, -186] },
  { pos: [0, 30, -258], look: [0, 24, -372] },
]

const smoothstep = (t) => t * t * (3 - 2 * t)

const terrainHeight = (x, z) =>
  Math.sin(x * 0.058) * 2.1 +
  Math.cos(z * 0.043) * 2.5 +
  Math.sin((x + z) * 0.021) * 3.3 +
  Math.cos(x * 0.013 - z * 0.017) * 4.2

function emphasise(text, words) {
  if (!words || words.length === 0) {
    return text
  }

  const pattern = new RegExp(
    `(${words.map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
    'gi',
  )

  return text.split(pattern).map((part, index) =>
    words.some((word) => word.toLowerCase() === part.toLowerCase()) ? (
      <strong key={`${part}-${index}`}>{part}</strong>
    ) : (
      part
    ),
  )
}

export default function Design5({ theme }) {
  const canvasRef = useRef(null)
  const paletteRef = useRef(null)

  // Scene handles kept in refs so a theme change never rebuilds the world.
  const sceneRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return undefined
    }

    const reduced =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(window.innerWidth, window.innerHeight, false)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      52,
      window.innerWidth / window.innerHeight,
      0.5,
      620,
    )
    scene.fog = new THREE.Fog(0x0a0a0c, 60, 380)

    const geometries = []
    const materials = []

    const terrainMaterial = new THREE.LineBasicMaterial({ transparent: true })
    const structureMaterial = new THREE.LineBasicMaterial({ transparent: true })
    const accentMaterial = new THREE.LineBasicMaterial({ transparent: true })
    materials.push(terrainMaterial, structureMaterial, accentMaterial)

    // --- Terrain -------------------------------------------------------
    const plane = new THREE.PlaneGeometry(300, 560, 64, 96)
    const position = plane.attributes.position

    for (let i = 0; i < position.count; i += 1) {
      const x = position.getX(i)
      const y = position.getY(i)
      position.setZ(i, terrainHeight(x, y))
    }

    plane.computeVertexNormals()

    const terrainWire = new THREE.WireframeGeometry(plane)
    plane.dispose()
    geometries.push(terrainWire)

    const terrain = new THREE.LineSegments(terrainWire, terrainMaterial)
    terrain.rotation.x = -Math.PI / 2
    terrain.position.set(0, -6, -190)
    scene.add(terrain)

    // --- Structure: a corridor of gates the camera passes through ------
    const structure = new THREE.Group()
    const gateGeometry = new THREE.EdgesGeometry(
      new THREE.BoxGeometry(34, 22, 34),
    )
    geometries.push(gateGeometry)

    for (let i = 0; i < 8; i += 1) {
      const gate = new THREE.LineSegments(gateGeometry, structureMaterial)
      gate.position.set(
        Math.sin(i * 0.9) * 9,
        6 + Math.cos(i * 0.7) * 3,
        -70 - i * 26,
      )
      gate.rotation.y = i * 0.11
      gate.rotation.z = Math.sin(i * 1.3) * 0.05
      gate.scale.setScalar(1 + i * 0.07)
      structure.add(gate)
    }

    // Sparse floating line-forms.
    const shardGeometry = new THREE.EdgesGeometry(
      new THREE.IcosahedronGeometry(6, 0),
    )
    geometries.push(shardGeometry)

    for (let i = 0; i < 5; i += 1) {
      const shard = new THREE.LineSegments(shardGeometry, structureMaterial)
      shard.position.set(
        (i % 2 === 0 ? -1 : 1) * (26 + i * 4),
        14 + i * 6,
        -40 - i * 62,
      )
      shard.rotation.set(i * 0.4, i * 0.9, i * 0.2)
      structure.add(shard)
    }

    scene.add(structure)

    // --- Accent: exactly one marker per chapter ------------------------
    const accents = new THREE.Group()

    const makeLine = (points) => {
      const geometry = new THREE.BufferGeometry().setFromPoints(
        points.map((p) => new THREE.Vector3(p[0], p[1], p[2])),
      )
      geometries.push(geometry)

      return new THREE.Line(geometry, accentMaterial)
    }

    // 1 — a lone vertical mast on the opening plain.
    accents.add(makeLine([[-22, -4, -34], [-22, 26, -34]]))

    // 2 — a single ring inside the corridor.
    const ringPoints = []
    for (let i = 0; i <= 72; i += 1) {
      const a = (i / 72) * Math.PI * 2
      ringPoints.push([Math.cos(a) * 13, 7 + Math.sin(a) * 13, -170])
    }
    accents.add(makeLine(ringPoints))

    // 3 — the horizon bar at the end of the path.
    accents.add(makeLine([[-120, 20, -430], [120, 20, -430]]))

    scene.add(accents)

    // --- Motion --------------------------------------------------------
    const camPos = new THREE.Vector3()
    const camLook = new THREE.Vector3()
    const tmpA = new THREE.Vector3()
    const tmpB = new THREE.Vector3()
    const waypoints = PATH.map((p) => ({
      pos: new THREE.Vector3(...p.pos),
      look: new THREE.Vector3(...p.look),
    }))

    const sampleAt = (t, outPos, outLook) => {
      const scaled = Math.min(Math.max(t, 0), 1) * (waypoints.length - 1)
      const index = Math.min(Math.floor(scaled), waypoints.length - 2)
      const local = smoothstep(scaled - index)

      outPos.lerpVectors(waypoints[index].pos, waypoints[index + 1].pos, local)
      outLook.lerpVectors(
        waypoints[index].look,
        waypoints[index + 1].look,
        local,
      )
    }

    let targetProgress = 0
    let progress = 0
    let pointerX = 0
    let pointerY = 0
    let easedX = 0
    let easedY = 0
    let frame = 0

    const readScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      targetProgress = max > 0 ? window.scrollY / max : 0

      if (reduced) {
        progress = targetProgress
      }
    }

    const handlePointer = (event) => {
      pointerX = (event.clientX / window.innerWidth) * 2 - 1
      pointerY = (event.clientY / window.innerHeight) * 2 - 1
    }

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      renderer.setSize(window.innerWidth, window.innerHeight, false)
      readScroll()
    }

    readScroll()
    progress = targetProgress

    const clock = new THREE.Clock()

    const tick = () => {
      frame = requestAnimationFrame(tick)

      const time = clock.getElapsedTime()

      if (!reduced) {
        progress += (targetProgress - progress) * 0.055
        easedX += (pointerX - easedX) * 0.04
        easedY += (pointerY - easedY) * 0.04
        // Slow breathing only.
        terrain.position.y = -6 + Math.sin(time * 0.22) * 0.5
        structure.rotation.y = Math.sin(time * 0.06) * 0.02
      }

      sampleAt(progress, tmpA, tmpB)
      camPos.copy(tmpA)
      camPos.x += easedX * 3.2
      camPos.y -= easedY * 1.8
      camLook.copy(tmpB)
      camLook.x += easedX * 2.4
      camLook.y -= easedY * 1.4

      camera.position.copy(camPos)
      camera.lookAt(camLook)
      renderer.render(scene, camera)
    }

    window.addEventListener('scroll', readScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    window.addEventListener('pointermove', handlePointer, { passive: true })

    sceneRef.current = {
      scene,
      terrainMaterial,
      structureMaterial,
      accentMaterial,
      renderer,
    }

    if (paletteRef.current) {
      const p = paletteRef.current
      terrainMaterial.color.set(p.terrain)
      terrainMaterial.opacity = p.terrainOpacity
      structureMaterial.color.set(p.structure)
      structureMaterial.opacity = p.structureOpacity
      accentMaterial.color.set(p.accent)
      accentMaterial.opacity = p.accentOpacity
      scene.fog.color.set(p.fog)
      renderer.setClearColor(p.bg, 1)
    }

    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', readScroll)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('pointermove', handlePointer)
      sceneRef.current = null
      scene.clear()
      geometries.forEach((geometry) => geometry.dispose())
      materials.forEach((material) => material.dispose())
      renderer.dispose()
    }
  }, [])

  useEffect(() => {
    document.title = site.title
  }, [])

  useEffect(() => {
    const palette = PALETTES[theme] || PALETTES.dark
    paletteRef.current = palette

    const handles = sceneRef.current

    if (!handles) {
      return
    }

    handles.terrainMaterial.color.set(palette.terrain)
    handles.terrainMaterial.opacity = palette.terrainOpacity
    handles.structureMaterial.color.set(palette.structure)
    handles.structureMaterial.opacity = palette.structureOpacity
    handles.accentMaterial.color.set(palette.accent)
    handles.accentMaterial.opacity = palette.accentOpacity
    handles.scene.fog.color.set(palette.fog)
    handles.renderer.setClearColor(palette.bg, 1)
  }, [theme])

  return (
    <div className="d5-root">
      <canvas ref={canvasRef} className="d5-canvas" aria-hidden="true" />

      <div className="d5-frame" aria-hidden="true">
        <span className="d5-frame-line d5-frame-line--top" />
        <span className="d5-frame-line d5-frame-line--bottom" />
      </div>

      <header className="d5-header">
        <a className="d5-wordmark" href="#top">
          {site.wordmark}
        </a>
        <nav className="d5-nav" aria-label="Primary">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="d5-main" id="top">
        <section className="d5-chapter d5-hero">
          <p className="d5-index" aria-hidden="true">
            01 — plain
          </p>
          <div className="d5-block">
            <p className="d5-eyebrow">{hero.eyebrow}</p>
            <h1 className="d5-headline">{hero.headline}</h1>
            <p className="d5-lead">
              {emphasise(hero.lead, hero.leadEmphasis)}
            </p>
            <p className="d5-aside">{hero.aside}</p>
          </div>
          <figure className="d5-avatar">
            <img
              src={person.avatar.src}
              alt={person.avatar.alt}
              width={person.avatar.width}
              height={person.avatar.height}
              loading="lazy"
            />
            <figcaption>
              {person.name} · {person.location}
            </figcaption>
          </figure>
        </section>

        <section className="d5-chapter d5-about" id={about.id}>
          <p className="d5-index" aria-hidden="true">
            02 — corridor
          </p>
          <div className="d5-block">
            <p className="d5-kicker">{about.kicker}</p>
            <h2 className="d5-heading">{about.heading}</h2>
            {about.paragraphs.map((paragraph) => (
              <p className="d5-body" key={paragraph}>
                {paragraph}
              </p>
            ))}
            <ul className="d5-stack">
              {about.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="d5-chapter d5-contact" id={contact.id}>
          <p className="d5-index" aria-hidden="true">
            03 — horizon
          </p>
          <div className="d5-block">
            <p className="d5-kicker">{contact.kicker}</p>
            <h2 className="d5-heading">{contact.heading}</h2>
            <p className="d5-body">
              {emphasise(contact.meta, contact.metaEmphasis)}
            </p>
            <a className="d5-email" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
            <ul className="d5-links">
              {links.map((link) => (
                <li key={link.href} data-tone={link.tone}>
                  <a href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="d5-footer">
        <p className="d5-copy">
          {site.copyright}
          <span className="d5-dot" aria-hidden="true">
            /
          </span>
          <a href={`mailto:${person.email}`}>
            {person.firstName} — {person.email}
          </a>
        </p>
        <p className="d5-desc">{site.description}</p>
        <p className="d5-sources">
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
        </p>
      </footer>
    </div>
  )
}
