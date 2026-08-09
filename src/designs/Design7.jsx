import './design7.css'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

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

const ASSET_BASE = '/assets/kenney/space-kit/'

// Every model loaded is placed. Repeats are clones of these prototypes.
const MODELS = [
  'terrain',
  'platform_large',
  'rocket_baseA',
  'rocket_fuelA',
  'rocket_sidesA',
  'rocket_topA',
  'satelliteDish_large',
  'hangar_smallB',
  'rover',
  'astronautA',
  'craft_speederA',
  'rock',
  'rock_largeA',
  'rocks_smallA',
  'rock_crystals',
  'craterLarge',
  'barrels',
  'meteor',
]

// Three chapters of a single slow orbit around the launch site.
const SHOTS = [
  { az: 0.78, radius: 13.2, height: 6.5, target: [0, 1.1, -0.2] },
  { az: 2.55, radius: 8.8, height: 3.0, target: [-0.6, 0.9, 0.5] },
  { az: 4.55, radius: 5.5, height: 0.8, target: [0.1, 3.0, -0.5] },
]

const CHAPTER_LABELS = ['establishing', 'ground level', 'liftoff']

const THEMES = {
  dark: {
    bg: 0x070a12,
    fogNear: 9,
    fogFar: 34,
    hemiSky: 0x2b3c63,
    hemiGround: 0x0a0d16,
    hemiIntensity: 0.75,
    keyColor: 0x9fc0ff,
    keyIntensity: 1.15,
    keyPos: [-6.5, 8.5, 5.5],
    fillColor: 0x35507f,
    fillIntensity: 0.35,
    practicalColor: 0xffa14d,
    practicalIntensity: 9,
    starOpacity: 0.75,
  },
  light: {
    bg: 0xeceff5,
    fogNear: 12,
    fogFar: 42,
    hemiSky: 0xdfe8f7,
    hemiGround: 0xbfae95,
    hemiIntensity: 1.5,
    keyColor: 0xfff2dc,
    keyIntensity: 2.1,
    keyPos: [6.5, 9.5, 5.0],
    fillColor: 0xc9d8f2,
    fillIntensity: 0.5,
    practicalColor: 0xff9b3d,
    practicalIntensity: 2,
    starOpacity: 0.12,
  },
}

const smoothstep = (t) => t * t * (3 - 2 * t)
const clamp01 = (t) => (t < 0 ? 0 : t > 1 ? 1 : t)

function emphasise(text, words) {
  if (!words || words.length === 0) {
    return text
  }

  const pattern = new RegExp(
    `(${words
      .map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('|')})`,
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

export default function Design7({ theme }) {
  const canvasRef = useRef(null)
  const worldRef = useRef(null)
  const themeRef = useRef(theme)
  const [ready, setReady] = useState(false)
  const [chapter, setChapter] = useState(0)

  themeRef.current = theme

  useEffect(() => {
    document.title = site.title
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return undefined
    }

    let disposed = false
    let frame = 0

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(window.innerWidth, window.innerHeight, false)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    // Light + diorama are static, so the shadow map is baked once.
    renderer.shadowMap.autoUpdate = false

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x070a12, 9, 34)

    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      160,
    )

    // --- Lighting -------------------------------------------------------
    const hemi = new THREE.HemisphereLight(0xffffff, 0x000000, 1)
    scene.add(hemi)

    const key = new THREE.DirectionalLight(0xffffff, 1)
    key.castShadow = true
    key.shadow.mapSize.set(1024, 1024)
    key.shadow.bias = -0.0016
    key.shadow.normalBias = 0.02
    const shadowCam = key.shadow.camera
    shadowCam.left = -7
    shadowCam.right = 7
    shadowCam.top = 7
    shadowCam.bottom = -7
    shadowCam.near = 1
    shadowCam.far = 30
    shadowCam.updateProjectionMatrix()
    scene.add(key)
    scene.add(key.target)

    const fill = new THREE.DirectionalLight(0xffffff, 0.4)
    fill.position.set(4, 3, -6)
    scene.add(fill)

    // One warm practical near the pad — the night-shift lamp.
    const practical = new THREE.PointLight(0xffa14d, 6, 12, 2)
    practical.position.set(1.7, 1.1, 0.6)
    scene.add(practical)

    // --- Starfield ------------------------------------------------------
    const starGeometry = new THREE.BufferGeometry()
    const starCount = 420
    const starPositions = new Float32Array(starCount * 3)

    for (let i = 0; i < starCount; i += 1) {
      const r = 48 + Math.random() * 22
      const phi = Math.acos(2 * Math.random() - 1)
      const theta = Math.random() * Math.PI * 2
      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      starPositions[i * 3 + 1] = r * Math.cos(phi) * 0.7
      starPositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }

    starGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(starPositions, 3),
    )

    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.5,
      sizeAttenuation: false,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      fog: false,
    })

    const stars = new THREE.Points(starGeometry, starMaterial)
    scene.add(stars)

    // --- Island underside (only non-Kenney geometry) --------------------
    const baseGeometry = new THREE.CylinderGeometry(4.1, 0.7, 3.9, 10, 1, false)
    const baseMaterial = new THREE.MeshLambertMaterial({ color: 0x6b4b3c })
    const islandBase = new THREE.Mesh(baseGeometry, baseMaterial)
    islandBase.position.y = -1.98
    islandBase.rotation.y = 0.31
    islandBase.receiveShadow = true
    scene.add(islandBase)

    // --- Model plumbing --------------------------------------------------
    // Kenney GLBs are unlit + share a small palette: swap to shared lambert
    // materials so lighting reads and draw state stays cheap.
    const materialCache = new Map()
    const materials = [starMaterial, baseMaterial]
    const geometries = [starGeometry, baseGeometry]

    const litMaterial = (source) => {
      const hex = source.color ? source.color.getHex() : 0xffffff
      let material = materialCache.get(hex)

      if (!material) {
        material = new THREE.MeshLambertMaterial({ color: hex })
        materialCache.set(hex, material)
        materials.push(material)
      }

      return material
    }

    const prepare = (gltf) => {
      const root = gltf.scene

      root.traverse((child) => {
        if (!child.isMesh) {
          return
        }

        child.castShadow = true
        child.receiveShadow = true
        child.material = Array.isArray(child.material)
          ? child.material.map(litMaterial)
          : litMaterial(child.material)

        if (geometries.indexOf(child.geometry) === -1) {
          geometries.push(child.geometry)
        }
      })

      // Kenney nodes carry an authoring offset — recentre on X/Z, sit on Y=0.
      const box = new THREE.Box3().setFromObject(root)
      const centre = box.getCenter(new THREE.Vector3())
      root.position.set(-centre.x, -box.min.y, -centre.z)

      const pivot = new THREE.Group()
      pivot.add(root)

      return pivot
    }

    const diorama = new THREE.Group()
    scene.add(diorama)

    const speeders = []

    const loader = new GLTFLoader()

    Promise.all(
      MODELS.map((name) => loader.loadAsync(`${ASSET_BASE}${name}.glb`)),
    )
      .then((results) => {
        if (disposed) {
          results.forEach((gltf) => {
            gltf.scene.traverse((child) => {
              if (child.isMesh) {
                child.geometry.dispose()
              }
            })
          })

          return
        }

        const proto = {}
        MODELS.forEach((name, index) => {
          proto[name] = prepare(results[index])
        })

        const place = (name, x, y, z, scale = 1, rotY = 0) => {
          const object = proto[name].clone(true)
          object.position.set(x, y, z)
          object.rotation.y = rotY
          object.scale.setScalar(scale)
          diorama.add(object)

          return object
        }

        // Ground plate — a rounded island of 1x1 terrain tiles.
        for (let x = -4; x <= 4; x += 1) {
          for (let z = -4; z <= 4; z += 1) {
            if (x * x + z * z > 12.6) {
              continue
            }

            place('terrain', x, 0, z, 1, (((x * 7 + z * 3) % 4) * Math.PI) / 2)
          }
        }

        // Launch pad + assembled rocket: the focal point.
        place('platform_large', 0, 0, -0.6, 1, 0)
        place('rocket_baseA', 0, 0.1, -0.6)
        place('rocket_fuelA', 0, 1.7, -0.6)
        place('rocket_sidesA', 0, 2.2, -0.6)
        place('rocket_topA', 0, 3.2, -0.6)

        // Support cast, kept sparse and readable from every chapter.
        place('satelliteDish_large', 2.55, 0, 1.0, 1.3, -2.25)
        place('hangar_smallB', -2.25, 0, 1.45, 1, 0.34)
        place('rover', 1.55, 0, 2.25, 2.2, -0.85)
        place('astronautA', 0.75, 0, 1.7, 0.55, 0.6)
        place('barrels', -1.25, 0, 2.5, 1.2, 0.4)
        place('barrels', -2.95, 0, 0.25, 1, -0.9)

        const speeder = place('craft_speederA', -2.7, 1.35, -1.85, 0.62, 1.15)
        speeder.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = false
          }
        })
        speeders.push(speeder)

        // Terrain detail.
        place('craterLarge', -1.6, 0, -2.4, 1.3, 0.5)
        place('craterLarge', 2.3, 0, -1.5, 0.9, 1.9)
        place('rock_largeA', -2.85, 0, -1.95, 1.15, 0.7)
        place('rock_largeA', 2.75, 0, -2.35, 0.8, 2.4)
        place('rock', -0.85, 0, 3.05, 1, 1.2)
        place('rock', 3.05, 0, 0.15, 0.85, -0.4)
        place('rock', 1.15, 0, -2.95, 0.7, 2.9)
        place('rocks_smallA', -3.15, 0, 1.05, 1, 0.2)
        place('rocks_smallA', 0.35, 0, 2.85, 0.9, 1.7)
        place('rocks_smallA', 2.05, 0, -3.05, 1, -1.1)
        place('rock_crystals', -2.05, 0, 2.85, 1.05, 0.9)
        place('rock_crystals', 3.15, 0, 1.95, 0.8, -1.6)

        // A little debris drifting beneath the island.
        place('meteor', -3.6, -3.4, 2.6, 0.8, 0.6)
        place('meteor', 4.2, -5.2, -1.6, 0.5, 2.1)
        place('rock', 2.2, -4.4, 3.8, 0.9, 1.4)

        renderer.shadowMap.needsUpdate = true
        setReady(true)
      })
      .catch(() => {
        if (!disposed) {
          setReady(true)
        }
      })

    // --- Camera motion ----------------------------------------------------
    const shots = SHOTS.map((shot) => ({
      ...shot,
      target: new THREE.Vector3(...shot.target),
    }))

    const camPos = new THREE.Vector3()
    const camTarget = new THREE.Vector3()
    const easedTarget = new THREE.Vector3().copy(shots[0].target)

    let targetProgress = 0
    let progress = 0
    let pointerX = 0
    let pointerY = 0
    let easedX = 0
    let easedY = 0
    let radiusScale = 1
    let currentChapter = 0

    const applyRadiusScale = () => {
      const aspect = window.innerWidth / Math.max(window.innerHeight, 1)
      radiusScale = Math.min(Math.max(1 + (1.35 - aspect) * 0.5, 1), 1.85)
    }

    const readScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      targetProgress = max > 0 ? clamp01(window.scrollY / max) : 0

      if (reduced) {
        progress = targetProgress
      }

      const next = targetProgress < 0.34 ? 0 : targetProgress < 0.72 ? 1 : 2

      if (next !== currentChapter) {
        currentChapter = next
        setChapter(next)
      }
    }

    const handlePointer = (event) => {
      pointerX = (event.clientX / window.innerWidth) * 2 - 1
      pointerY = (event.clientY / window.innerHeight) * 2 - 1
    }

    const handleResize = () => {
      camera.aspect = window.innerWidth / Math.max(window.innerHeight, 1)
      camera.updateProjectionMatrix()
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      renderer.setSize(window.innerWidth, window.innerHeight, false)
      applyRadiusScale()
      readScroll()
    }

    const applyTheme = () => {
      const palette = THEMES[themeRef.current] || THEMES.dark

      renderer.setClearColor(palette.bg, 1)
      scene.fog.color.setHex(palette.bg)
      scene.fog.near = palette.fogNear
      scene.fog.far = palette.fogFar

      hemi.color.setHex(palette.hemiSky)
      hemi.groundColor.setHex(palette.hemiGround)
      hemi.intensity = palette.hemiIntensity

      key.color.setHex(palette.keyColor)
      key.intensity = palette.keyIntensity
      key.position.set(...palette.keyPos)

      fill.color.setHex(palette.fillColor)
      fill.intensity = palette.fillIntensity

      practical.color.setHex(palette.practicalColor)
      practical.intensity = palette.practicalIntensity

      starMaterial.opacity = palette.starOpacity
      renderer.shadowMap.needsUpdate = true
    }

    applyRadiusScale()
    readScroll()
    progress = targetProgress
    applyTheme()

    const clock = new THREE.Clock()

    const sample = (t) => {
      const scaled = clamp01(t) * (shots.length - 1)
      const index = Math.min(Math.floor(scaled), shots.length - 2)
      const local = smoothstep(scaled - index)
      const a = shots[index]
      const b = shots[index + 1]

      return {
        az: a.az + (b.az - a.az) * local,
        radius: a.radius + (b.radius - a.radius) * local,
        height: a.height + (b.height - a.height) * local,
        from: a.target,
        to: b.target,
        local,
      }
    }

    const tick = () => {
      frame = requestAnimationFrame(tick)

      const time = clock.getElapsedTime()

      if (!reduced) {
        progress += (targetProgress - progress) * 0.055
        easedX += (pointerX - easedX) * 0.04
        easedY += (pointerY - easedY) * 0.04

        for (let i = 0; i < speeders.length; i += 1) {
          const craft = speeders[i]
          craft.position.y = 1.35 + Math.sin(time * 0.55) * 0.11
          craft.rotation.z = Math.sin(time * 0.4) * 0.03
        }
      }

      const shot = sample(progress)
      const drift = reduced ? 0 : Math.sin(time * 0.05) * 0.035
      const az = shot.az + drift + easedX * 0.075
      const radius = shot.radius * radiusScale

      camPos.set(
        Math.sin(az) * radius,
        shot.height - easedY * 0.55,
        Math.cos(az) * radius,
      )

      camTarget.lerpVectors(shot.from, shot.to, shot.local)
      easedTarget.lerp(camTarget, reduced ? 1 : 0.09)

      camera.position.copy(camPos)
      camera.lookAt(easedTarget)
      camera.rotation.z += easedX * 0.012

      stars.position.copy(camPos)

      renderer.render(scene, camera)
    }

    window.addEventListener('scroll', readScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    window.addEventListener('pointermove', handlePointer, { passive: true })

    worldRef.current = { applyTheme }
    frame = requestAnimationFrame(tick)

    return () => {
      disposed = true
      worldRef.current = null
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', readScroll)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('pointermove', handlePointer)

      scene.traverse((child) => {
        if (child.isMesh && geometries.indexOf(child.geometry) === -1) {
          geometries.push(child.geometry)
        }
      })

      scene.clear()
      geometries.forEach((geometry) => geometry.dispose())
      materials.forEach((material) => material.dispose())
      key.shadow.dispose()
      renderer.dispose()
    }
  }, [])

  useEffect(() => {
    if (worldRef.current) {
      worldRef.current.applyTheme()
    }
  }, [theme])

  return (
    <div className={`d7-root${ready ? ' is-ready' : ''}`} id="top">
      <canvas ref={canvasRef} className="d7-canvas" aria-hidden="true" />

      <header className="d7-header">
        <a className="d7-wordmark" href="#top">
          {site.wordmark}
        </a>
        <nav className="d7-nav" aria-label="Primary">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <p className="d7-hud" aria-hidden="true">
        <span className="d7-hud-dot" />
        {`0${chapter + 1} / ${CHAPTER_LABELS[chapter]}`}
      </p>

      <main className="d7-main">
        <section className="d7-chapter d7-chapter--hero">
          <div className="d7-panel">
            <div className="d7-badge">
              <img
                className="d7-avatar"
                src={person.avatar.src}
                alt={person.avatar.alt}
                width={person.avatar.width}
                height={person.avatar.height}
              />
              <span>
                {person.name}
                <em>{person.location}</em>
              </span>
            </div>
            <p className="d7-eyebrow">{hero.eyebrow}</p>
            <h1 className="d7-headline">{hero.headline}</h1>
            <p className="d7-lead">{emphasise(hero.lead, hero.leadEmphasis)}</p>
            <p className="d7-aside">{hero.aside}</p>
          </div>
        </section>

        <section className="d7-chapter d7-chapter--about" id={about.id}>
          <div className="d7-panel">
            <p className="d7-kicker">{about.kicker}</p>
            <h2 className="d7-heading">{about.heading}</h2>
            {about.paragraphs.map((paragraph) => (
              <p className="d7-body" key={paragraph}>
                {paragraph}
              </p>
            ))}
            <ul className="d7-stack">
              {about.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="d7-chapter d7-chapter--contact" id={contact.id}>
          <div className="d7-panel">
            <p className="d7-kicker">{contact.kicker}</p>
            <h2 className="d7-heading">{contact.heading}</h2>
            <p className="d7-body">
              {emphasise(contact.meta, contact.metaEmphasis)}
            </p>
            <a className="d7-email" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
            <ul className="d7-links">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    data-tone={link.tone}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="d7-footer">
        <p className="d7-copy">{site.copyright}</p>
        <p className="d7-sources">
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
