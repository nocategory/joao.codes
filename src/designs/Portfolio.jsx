import { useEffect, useRef, useState } from 'react'
import { horizon, links, person, site } from '../content.js'
import './portfolio.css'

function Arrow({ diagonal = false }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M5 12h14m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.4" />
  </svg>
}

function Landscape({ paused }) {
  const canvasRef = useRef(null)
  const pauseRef = useRef(paused)
  const playbackRef = useRef(() => {})
  useEffect(() => { pauseRef.current = paused; playbackRef.current() }, [paused])

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    if (!context) return
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reduced = media.matches
    let visible = true
    let frame = 0
    let last = 0
    let time = 0
    let width = 0
    let height = 0
    let seed = 81
    const random = () => {
      seed = (seed * 16807) % 2147483647
      return seed / 2147483647
    }
    const stars = Array.from({ length: 2100 }, (_, index) => {
      const distance = Math.pow(random(), 0.65)
      const arm = index % 3
      return {
        distance,
        angle: distance * 7.8 + arm * Math.PI * 2 / 3 + (random() - 0.5) * (0.25 + distance * 0.65),
        depth: (random() - 0.5) * 0.14 * distance,
        size: random(),
        phase: random() * Math.PI * 2,
        blue: random() > 0.86,
      }
    })
    const distant = Array.from({ length: 95 }, () => ({ x: random(), y: random(), alpha: random() * 0.4, size: random() + 0.3 }))
    const glow = document.createElement('canvas')
    glow.width = 64
    glow.height = 64
    const glowContext = glow.getContext('2d')
    const gradient = glowContext.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0, '#fffaf1')
    gradient.addColorStop(0.08, '#f6f0e9e6')
    gradient.addColorStop(0.22, '#c4d7e578')
    gradient.addColorStop(0.5, '#8aaccc20')
    gradient.addColorStop(1, '#8aaccc00')
    glowContext.fillStyle = gradient
    glowContext.fillRect(0, 0, 64, 64)

    function draw() {
      context.clearRect(0, 0, width, height)
      const centerX = width * 0.5
      const centerY = height * (width / height < 0.8 ? 0.38 : 0.42)
      const radius = Math.min(width * 0.36, height * 0.32)
      const halo = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 1.5)
      halo.addColorStop(0, '#aebfd51a')
      halo.addColorStop(0.3, '#6c879917')
      halo.addColorStop(0.65, '#273d4910')
      halo.addColorStop(1, '#00000000')
      context.fillStyle = halo
      context.fillRect(0, 0, width, height)
      distant.forEach(star => {
        context.fillStyle = `rgba(197,215,226,${star.alpha})`
        context.fillRect(star.x * width, star.y * height * 0.8, star.size, star.size)
      })
      context.globalCompositeOperation = 'lighter'
      stars.forEach(star => {
        const angle = star.angle + time * 0.045
        const x = Math.cos(angle) * star.distance
        const y = Math.sin(angle) * star.distance
        const turn = -0.42
        const px = (x * Math.cos(turn) - y * 0.82 * Math.sin(turn)) * radius
        const py = (x * Math.sin(turn) + y * 0.82 * Math.cos(turn) + star.depth) * radius
        const pulse = 0.75 + Math.sin(time * 0.7 + star.phase) * 0.25
        const size = (1.3 + Math.pow(star.size, 5) * 13) * Math.min(1.35, radius / 390)
        context.globalAlpha = (0.4 + star.size * 0.6) * pulse
        if (star.size > 0.5) context.drawImage(glow, centerX + px - size, centerY + py - size, size * 2, size * 2)
        context.fillStyle = star.blue ? '#adc5dd' : '#e1eaf3'
        context.beginPath()
        context.arc(centerX + px, centerY + py, Math.max(0.35, size * 0.09), 0, Math.PI * 2)
        context.fill()
      })
      context.globalAlpha = 0.6
      context.drawImage(glow, centerX - radius * 0.14, centerY - radius * 0.14, radius * 0.28, radius * 0.28)
      context.globalAlpha = 1
      context.globalCompositeOperation = 'source-over'
    }
    function resize() {
      const scale = Math.min(window.devicePixelRatio || 1, 1.5)
      width = Math.round(canvas.clientWidth * scale)
      height = Math.round(canvas.clientHeight * scale)
      canvas.width = width
      canvas.height = height
      draw()
    }
    function tick(now) {
      if (last && now - last < 33) { frame = requestAnimationFrame(tick); return }
      if (!pauseRef.current) {
        time += last ? Math.min((now - last) / 1000, 0.1) : 0
        draw()
      }
      last = now
      frame = requestAnimationFrame(tick)
    }
    function updatePlayback() {
      cancelAnimationFrame(frame)
      last = 0
      if (!pauseRef.current && !reduced && visible && !document.hidden) frame = requestAnimationFrame(tick)
    }
    function updatePreference(event) { reduced = event.matches; updatePlayback() }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; updatePlayback() })
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    observer.observe(canvas)
    media.addEventListener('change', updatePreference)
    document.addEventListener('visibilitychange', updatePlayback)
    playbackRef.current = updatePlayback
    resize()
    updatePlayback()
    return () => {
      cancelAnimationFrame(frame)
      playbackRef.current = () => {}
      observer.disconnect()
      resizeObserver.disconnect()
      media.removeEventListener('change', updatePreference)
      document.removeEventListener('visibilitychange', updatePlayback)
    }
  }, [])

  return <canvas ref={canvasRef} className="horizon-landscape" aria-hidden="true" />
}

function ExperienceDetails({ experience }) {
  return <div className="experience-detail-content" key={experience.id}>
    <div className="experience-detail-heading"><p className="horizon-eyebrow">{experience.period}</p><h3>{experience.company}</h3><p className="experience-role">{experience.role}</p></div>
    <p className="experience-summary">{experience.summary}</p>
    <ul className="experience-tools" aria-label="Tools and areas of work">{experience.tools.map(tool => <li key={tool}>{tool}</li>)}</ul>
    {experience.work.length > 0 && <div className="experience-work"><h4>Work from this period</h4><ul>{experience.work.map(item => <li key={item}>{item}</li>)}</ul></div>}
  </div>
}

function ExperienceTimeline() {
  const [selected, setSelected] = useState('complear')
  const [compact, setCompact] = useState(() => window.matchMedia('(max-width: 900px)').matches)
  const activeId = selected || (compact ? null : 'complear')
  const experience = horizon.experience.find(role => role.id === activeId)
  const firstYear = 2017
  const now = new Date()
  const currentYear = now.getUTCFullYear() + now.getUTCMonth() / 12

  useEffect(() => {
    const query = window.matchMedia('(max-width: 900px)')
    const update = event => setCompact(event.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  const position = (date, includeMonth = false) => {
    if (!date) return 100
    const [year, month] = date.split('-').map(Number)
    return Math.max(0, Math.min(100, (year + (month - 1 + Number(includeMonth)) / 12 - firstYear) / (currentYear - firstYear) * 100))
  }

  return <section id="experience" className="horizon-experience horizon-section" aria-labelledby="experience-title">
    <div className="experience-intro" data-reveal>
      <p className="horizon-eyebrow">Along the way</p>
      <h2 id="experience-title">{horizon.experienceTitle}</h2>
      <p>{horizon.experienceIntro}</p>
    </div>
    <div className="experience-layout">
      <div className="experience-chart" data-reveal>
        <div className="experience-axis" aria-hidden="true">{[2017, 2020, 2023].map(year => <span key={year} style={{ left: `${position(`${year}-01`)}%` }}>{year}</span>)}<span style={{ right: 0 }}>Now</span></div>
        <div className="experience-rows" aria-label="Choose an experience">
          {horizon.experience.map(role => <div className="experience-entry" key={role.id}>
            <button type="button" id={`experience-button-${role.id}`} className={`experience-row${activeId === role.id ? ' is-selected' : ''}`} aria-pressed={compact ? undefined : activeId === role.id} aria-expanded={compact ? activeId === role.id : undefined} aria-controls={compact ? `experience-detail-${role.id}` : 'experience-detail'} onClick={() => setSelected(current => compact && current === role.id ? null : role.id)}>
              <span className="experience-label"><span>{role.company}</span><span className="experience-period">{role.period}</span></span>
              <span className="experience-track" aria-hidden="true">
                {[2017, 2020, 2023].map(year => <span className="experience-gridline" key={year} style={{ left: `${position(`${year}-01`)}%` }} />)}
                {(role.periods || [{ start: role.start, end: role.end }]).map(period => <span key={period.start} className={`experience-bar${role.approximate ? ' is-approximate' : ''}`} style={{ left: `${position(period.start)}%`, width: `${Math.max(0.8, position(period.end, true) - position(period.start))}%` }} />)}
                {!role.end && <span className="experience-now" />}
              </span>
              {compact && <span className="experience-expand" aria-hidden="true">{activeId === role.id ? '−' : '+'}</span>}
            </button>
            {compact && <div id={`experience-detail-${role.id}`} className="experience-detail experience-inline-detail" role="region" aria-labelledby={`experience-button-${role.id}`} hidden={activeId !== role.id}>
              {activeId === role.id && <ExperienceDetails experience={role} />}
            </div>}
          </div>)}
        </div>
      </div>
      {!compact && <div id="experience-detail" className="experience-detail experience-desktop-detail" aria-live="polite" aria-atomic="true">
        <ExperienceDetails experience={experience} />
      </div>}
    </div>
  </section>
}

export default function Portfolio() {
  const [paused, setPaused] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    document.title = site.title
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (media.matches) return
    const elements = rootRef.current.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    elements.forEach(element => { element.classList.add('will-reveal'); observer.observe(element) })
    return () => observer.disconnect()
  }, [])

  return <div className="horizon-page" ref={rootRef} id="top">
    <a className="horizon-skip" href="#about">Skip to about</a>
    <header className="horizon-header">
      <a href="#top" className="horizon-wordmark" aria-label={`${horizon.wordmark} home`}>{horizon.wordmark}</a>
      <nav aria-label="Main navigation"><a href="#about">About</a><a href="#experience">Experience</a><a href="#contact">Say hello <Arrow diagonal /></a></nav>
    </header>
    <main>
      <section className="horizon-hero" aria-labelledby="horizon-title">
        <Landscape paused={paused} />
        <div className="horizon-hero-shade" />
        <div className="horizon-hero-copy">
          <p className="horizon-eyebrow hero-enter">{horizon.role}<span />{person.location}</p>
          <h1 id="horizon-title" className="hero-enter">{person.name}</h1>
          <p className="horizon-tagline hero-enter">{horizon.intro}</p>
          <a className="horizon-explore hero-enter" href="#about">{horizon.aboutCta}<span aria-hidden="true">↓</span></a>
        </div>
        <div className="horizon-hero-bottom"><p><span className="location-dot" />{horizon.location}</p>
          <button className="motion-toggle" onClick={() => setPaused(value => !value)} aria-pressed={paused}>
            <span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span>{paused ? 'Resume motion' : 'Pause motion'}
          </button>
        </div>
      </section>

      <section id="about" className="horizon-about horizon-section" aria-labelledby="about-title">
        <div className="about-layout">
          <div className="about-portrait" data-reveal><figure><img src={person.avatar.src} alt={person.avatar.alt} width="480" height="600" loading="lazy" /><figcaption>{horizon.portraitCaption}</figcaption></figure><span className="portrait-note" aria-hidden="true">A little less screen time.<br />A little more outside.</span></div>
          <div className="about-copy" data-reveal><p className="horizon-eyebrow">A little about me</p><h2 id="about-title">{horizon.aboutTitle}</h2>{horizon.aboutParagraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<ul className="horizon-stack" aria-label="Technologies">{horizon.stack.map(technology => <li key={technology}>{technology}</li>)}</ul></div>
        </div>
      </section>

      <ExperienceTimeline />

      <section id="contact" className="horizon-contact horizon-section" aria-labelledby="contact-title">
        <div data-reveal><p className="horizon-eyebrow">Good things start with a conversation</p><h2 id="contact-title">{horizon.contactTitle}</h2><p className="contact-intro">{horizon.contactIntro}</p><a className="contact-email" href={`mailto:${person.email}`}>{person.email}<Arrow diagonal /></a></div>
        <div className="contact-halo" aria-hidden="true" />
      </section>
    </main>
    <footer className="horizon-footer"><div><a href="#top" className="horizon-wordmark">{horizon.wordmark}</a><p>{horizon.footerNote}</p></div><nav aria-label="Social profiles">{links.map(link => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label}<Arrow diagonal /></a>)}</nav><p className="copyright">{site.copyright}</p></footer>
  </div>
}
