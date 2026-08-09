import './design6.css'

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
} from '../content'

const PALETTES = {
  dark: {
    background: '#0d0e0e',
    line: '#aeb1ac',
    accent: '#d78a65',
  },
  light: {
    background: '#f2efe7',
    line: '#303332',
    accent: '#7b3f2d',
  },
}

function renderEmphasis(text, emphasis) {
  return text.split(/(\s+)/).map((part, index) => {
    const word = part.replace(/^[^\p{L}\p{N}-]+|[^\p{L}\p{N}-]+$/gu, '')

    return emphasis.includes(word) ? <strong key={`${word}-${index}`}>{part}</strong> : part
  })
}

function smoothstep(value) {
  return value * value * (3 - 2 * value)
}

function createLatticeGeometry() {
  const levels = 19
  const sides = 12
  const height = 18
  const positions = []
  const accentPositions = []

  const point = (level, side) => {
    const verticalProgress = level / (levels - 1)
    const y = verticalProgress * height - height / 2
    const angle = (side / sides) * Math.PI * 2 + verticalProgress * 0.72
    const taper = 0.84 + Math.sin(verticalProgress * Math.PI) * 0.24
    const x = Math.cos(angle) * 4.1 * taper
    const z = Math.sin(angle) * 2.75 * taper

    return [x, y, z]
  }

  for (let level = 0; level < levels; level += 1) {
    for (let side = 0; side < sides; side += 1) {
      const current = point(level, side)
      const next = point(level, (side + 1) % sides)
      positions.push(...current, ...next)

      if (level < levels - 1) {
        const above = point(level + 1, side)
        const destination = side === 0 ? accentPositions : positions
        destination.push(...current, ...above)
      }
    }
  }

  const lattice = new THREE.BufferGeometry()
  lattice.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))

  const datum = new THREE.BufferGeometry()
  datum.setAttribute('position', new THREE.Float32BufferAttribute(accentPositions, 3))

  return { lattice, datum }
}

export default function Design6({ theme }) {
  const sceneHostRef = useRef(null)
  const sceneStateRef = useRef(null)

  useEffect(() => {
    const host = sceneHostRef.current
    if (!host) return undefined

    const initialTheme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
    const palette = PALETTES[initialTheme]
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(palette.background)
    scene.fog = new THREE.Fog(palette.background, 12, 38)

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 80)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    host.appendChild(renderer.domElement)

    const { lattice, datum } = createLatticeGeometry()
    const latticeMaterial = new THREE.LineBasicMaterial({
      color: palette.line,
      transparent: true,
      opacity: 0.42,
    })
    const datumMaterial = new THREE.LineBasicMaterial({
      color: palette.accent,
      transparent: true,
      opacity: 0.9,
    })
    const world = new THREE.Group()
    world.add(
      new THREE.LineSegments(lattice, latticeMaterial),
      new THREE.LineSegments(datum, datumMaterial),
    )
    scene.add(world)

    const cameraFrames = [
      new THREE.Vector3(15, 6.5, 19),
      new THREE.Vector3(-12.5, 1.5, 11),
      new THREE.Vector3(2.7, -5.2, 7.4),
    ]
    const lookFrames = [
      new THREE.Vector3(0, 1.4, 0),
      new THREE.Vector3(0, 0.4, 0),
      new THREE.Vector3(0, -2.4, 0),
    ]
    const currentCamera = cameraFrames[0].clone()
    const currentLook = lookFrames[0].clone()
    const targetCamera = new THREE.Vector3()
    const targetLook = new THREE.Vector3()
    const scrollProgress = { value: 0 }
    const pointer = { x: 0, y: 0, easedX: 0, easedY: 0 }
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reducedMotion = motionQuery.matches
    let animationFrame = 0
    let elapsed = 0
    let previousTime = performance.now()

    const updateScrollProgress = () => {
      const scrollRange = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      scrollProgress.value = Math.min(Math.max(window.scrollY / scrollRange, 0), 1)
    }

    const resize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      renderer.setSize(width, height, false)
      updateScrollProgress()
    }

    const updatePointer = (event) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2
    }

    const updateMotionPreference = (event) => {
      reducedMotion = event.matches
      if (reducedMotion) {
        pointer.x = 0
        pointer.y = 0
      }
    }

    const animate = (time) => {
      const delta = Math.min((time - previousTime) / 1000, 0.05)
      previousTime = time
      elapsed += delta

      let frameIndex = 0
      let frameMix = 0

      if (reducedMotion) {
        frameIndex = Math.min(Math.floor(scrollProgress.value * 3), 2)
      } else if (scrollProgress.value < 0.5) {
        frameMix = smoothstep(scrollProgress.value * 2)
      } else {
        frameIndex = 1
        frameMix = smoothstep((scrollProgress.value - 0.5) * 2)
      }

      if (reducedMotion || frameIndex === 2) {
        targetCamera.copy(cameraFrames[frameIndex])
        targetLook.copy(lookFrames[frameIndex])
      } else {
        targetCamera.lerpVectors(cameraFrames[frameIndex], cameraFrames[frameIndex + 1], frameMix)
        targetLook.lerpVectors(lookFrames[frameIndex], lookFrames[frameIndex + 1], frameMix)
      }

      const cameraEase = reducedMotion ? 1 : 1 - Math.pow(0.001, delta)
      currentCamera.lerp(targetCamera, cameraEase)
      currentLook.lerp(targetLook, cameraEase)
      camera.position.copy(currentCamera)
      camera.lookAt(currentLook)

      if (reducedMotion) {
        pointer.easedX = 0
        pointer.easedY = 0
        world.rotation.set(0, 0, 0)
        world.scale.setScalar(1)
      } else {
        const pointerEase = 1 - Math.pow(0.004, delta)
        pointer.easedX += (pointer.x - pointer.easedX) * pointerEase
        pointer.easedY += (pointer.y - pointer.easedY) * pointerEase
        world.rotation.x = pointer.easedY * 0.018
        world.rotation.y = elapsed * 0.007 + pointer.easedX * 0.035
        world.scale.setScalar(1 + Math.sin(elapsed * 0.32) * 0.0025)
      }

      renderer.render(scene, camera)
      animationFrame = window.requestAnimationFrame(animate)
    }

    sceneStateRef.current = {
      scene,
      fog: scene.fog,
      latticeMaterial,
      datumMaterial,
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', updatePointer)
    motionQuery.addEventListener('change', updateMotionPreference)
    resize()
    camera.position.copy(currentCamera)
    camera.lookAt(currentLook)
    animationFrame = window.requestAnimationFrame(animate)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('scroll', updateScrollProgress)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', updatePointer)
      motionQuery.removeEventListener('change', updateMotionPreference)

      lattice.dispose()
      datum.dispose()
      latticeMaterial.dispose()
      datumMaterial.dispose()
      renderer.dispose()
      renderer.forceContextLoss()

      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement)
      }
      sceneStateRef.current = null
    }
  }, [])

  useEffect(() => {
    const state = sceneStateRef.current
    if (!state) return

    const palette = PALETTES[theme] || PALETTES.dark
    state.scene.background.set(palette.background)
    state.fog.color.set(palette.background)
    state.latticeMaterial.color.set(palette.line)
    state.datumMaterial.color.set(palette.accent)
  }, [theme])

  const resolvedTheme = theme === 'light' ? 'light' : 'dark'

  return (
    <main className={`d6-page d6-theme-${resolvedTheme}`}>
      <div ref={sceneHostRef} className="d6-scene" aria-hidden="true" />

      <header className="d6-header">
        <a className="d6-wordmark" href="#d6-top" aria-label={`${site.wordmark}, home`}>
          {site.wordmark}
        </a>
        <nav className="d6-nav" aria-label="Primary navigation">
          {nav.map((item, index) => (
            <a className="d6-nav-link" href={item.href} key={item.href}>
              <span className="d6-nav-index">0{index + 2}</span>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <section className="d6-chapter d6-hero" id="d6-top" aria-labelledby="d6-hero-title">
        <div className="d6-chapter-marker" aria-hidden="true">
          <span>01</span>
          <span>15°N / 19°E</span>
        </div>

        <div className="d6-hero-copy">
          <p className="d6-kicker">{hero.eyebrow}</p>
          <h1 id="d6-hero-title">{hero.headline}</h1>
          <p className="d6-lead">{renderEmphasis(hero.lead, hero.leadEmphasis)}</p>
        </div>

        <figure className="d6-portrait">
          <div className="d6-avatar-frame">
            <img
              className="d6-avatar"
              src={person.avatar.src}
              alt={person.avatar.alt}
              width={person.avatar.width}
              height={person.avatar.height}
            />
          </div>
          <figcaption className="d6-portrait-caption">
            <span>{person.firstName}</span>
            <span>{person.name}</span>
            <span>{person.location}</span>
          </figcaption>
        </figure>

        <aside className="d6-hero-aside">
          <span className="d6-rule-label">Off screen</span>
          <p>{hero.aside}</p>
        </aside>

        <div className="d6-site-note">
          <p>{site.title}</p>
          <p>{site.description}</p>
        </div>
      </section>

      <section className="d6-chapter d6-about" id={about.id} aria-labelledby="d6-about-title">
        <div className="d6-chapter-marker" aria-hidden="true">
          <span>02</span>
          <span>−12°N / 11°E</span>
        </div>

        <div className="d6-about-copy">
          <p className="d6-kicker">{about.kicker}</p>
          <h2 id="d6-about-title">{about.heading}</h2>
          <div className="d6-prose">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="d6-stack" aria-label="Technology stack">
          <span className="d6-rule-label">Current stack</span>
          <ul>
            {about.stack.map((technology, index) => (
              <li key={technology}>
                <span>0{index + 1}</span>
                {technology}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="d6-chapter d6-contact" id={contact.id} aria-labelledby="d6-contact-title">
        <div className="d6-chapter-marker" aria-hidden="true">
          <span>03</span>
          <span>03°N / 07°E</span>
        </div>

        <div className="d6-contact-copy">
          <p className="d6-kicker">{contact.kicker}</p>
          <h2 id="d6-contact-title">{contact.heading}</h2>
          <p className="d6-contact-meta">
            {renderEmphasis(contact.meta, contact.metaEmphasis)}
          </p>
          <a className="d6-email" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          <p className="d6-identity-email">Identity channel: {person.email}</p>
        </div>

        <div className="d6-socials" aria-label="Social profiles">
          {links.map((link, index) => (
            <a
              className={`d6-social-link d6-social-${link.tone}`}
              href={link.href}
              key={link.href}
              target="_blank"
              rel="noreferrer"
            >
              <span className="d6-social-index">0{index + 1}</span>
              <span>{link.label}</span>
              <span className="d6-social-tone">/{link.tone}</span>
            </a>
          ))}
        </div>

        <footer className="d6-footer">
          <p>{site.copyright}</p>
          <div className="d6-references">
            <span>References:</span>
            {sources.map((source) => (
              <a
                href={source.href}
                key={source.href}
                target="_blank"
                rel="noreferrer"
              >
                {source.label}
              </a>
            ))}
          </div>
        </footer>
      </section>
    </main>
  )
}
