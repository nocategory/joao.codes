import { useEffect, useRef, useState } from 'react'
import { drawField, layoutField, makeStars, naturalHeight } from './plaintext-galaxy.js'
import { plaintextCopy as copy } from './plaintext-copy.js'

const TEXT_COLS = 72 // the document's measure
const MAX_BLEED = 12 // columns the art may spread past the measure on each side
const MARGIN_COLS = 2 // columns kept clear at the edges of the window
const FRAME_MS = 40 // the disc turns slowly; 25 redraws a second is plenty

const reducedQuery = '(prefers-reduced-motion: reduce)'

export default function PlainSky() {
  const figureRef = useRef(null)
  const artRef = useRef(null)
  const probeRef = useRef(null)
  const [grid, setGrid] = useState(null)

  useEffect(() => {
    const figure = figureRef.current
    const art = artRef.current
    const probe = probeRef.current
    const media = window.matchMedia(reducedQuery)
    const stars = makeStars()
    const lens = { x: 0, y: 0, strength: 0, target: 0 }
    let field = null
    let text = ''
    let time = 0
    let last = 0
    let frame = 0
    let visible = true
    let pointerMoved = false

    function paint() {
      if (!field) return
      const next = drawField(field, stars, time, lens.strength > 0.01 ? lens : null).join('\n')
      if (next !== text) {
        text = next
        art.textContent = next
      }
    }

    function measure() {
      const cellW = probe.getBoundingClientRect().width / 20
      const line = parseFloat(getComputedStyle(figure).lineHeight)
      if (!cellW || !line) return
      const textCols = Math.min(TEXT_COLS, Math.floor(figure.clientWidth / cellW + 0.01))
      const pageCols = Math.floor(document.documentElement.clientWidth / cellW)
      const bleed = Math.max(0, Math.min(MAX_BLEED, Math.floor((pageCols - textCols) / 2) - MARGIN_COLS))
      const cols = textCols + bleed * 2
      // As tall as the disc wants to be at this width, but leave room for the name below it.
      const budget = Math.min(window.innerHeight * 0.6, line * 24)
      const wanted = Math.min(budget, naturalHeight(cols * cellW) * 1.02)
      const rows = Math.max(12, Math.round(wanted / line) * 2)
      field = layoutField(cols, rows, cellW, line / 2)
      text = ''
      setGrid(current => current && current.cols === cols && current.rows === rows && current.bleed === bleed ? current : { cols, rows, bleed })
      paint()
    }

    function running() {
      return visible && !document.hidden && (!media.matches || Math.abs(lens.target - lens.strength) > 0.005 || pointerMoved)
    }

    function tick(now) {
      frame = 0
      if (!running()) return
      if (!last || now - last >= FRAME_MS) {
        if (!media.matches) time += last ? Math.min((now - last) / 1000, 0.1) : 0
        lens.strength += (lens.target - lens.strength) * 0.18
        pointerMoved = false
        paint()
        last = now
      }
      frame = requestAnimationFrame(tick)
    }

    function wake() {
      if (frame) return
      last = 0
      if (running()) frame = requestAnimationFrame(tick)
    }

    function onPointerMove(event) {
      if (media.matches || event.pointerType === 'touch') return
      const box = art.getBoundingClientRect()
      lens.x = event.clientX - box.left
      lens.y = event.clientY - box.top
      lens.target = 1
      pointerMoved = true
      wake()
    }

    function onPointerLeave() {
      lens.target = 0
      wake()
    }

    function onMotionPreference(event) {
      if (event.matches) {
        lens.target = 0
        lens.strength = 0
        time = 0
        paint()
      }
      wake()
    }

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      wake()
    })
    const resize = new ResizeObserver(() => measure())
    intersection.observe(art)
    resize.observe(figure)
    art.addEventListener('pointermove', onPointerMove)
    art.addEventListener('pointerleave', onPointerLeave)
    media.addEventListener('change', onMotionPreference)
    document.addEventListener('visibilitychange', wake)
    document.fonts?.ready.then(() => {
      measure()
      wake()
    })
    measure()
    wake()

    return () => {
      cancelAnimationFrame(frame)
      intersection.disconnect()
      resize.disconnect()
      art.removeEventListener('pointermove', onPointerMove)
      art.removeEventListener('pointerleave', onPointerLeave)
      media.removeEventListener('change', onMotionPreference)
      document.removeEventListener('visibilitychange', wake)
    }
  }, [])

  const artStyle = grid ? { width: `${grid.cols}ch`, height: `calc(var(--plaintext-line) * ${grid.rows / 2})`, marginLeft: `-${grid.bleed}ch` } : undefined

  return (
    <figure className="plaintext-sky" ref={figureRef}>
      <span className="plaintext-probe" ref={probeRef} aria-hidden="true">{'0'.repeat(20)}</span>
      <div className="plaintext-art-frame" role="img" aria-label={copy.galaxyLabel}>
        <pre className="plaintext-art" ref={artRef} style={artStyle} aria-hidden="true" />
      </div>
    </figure>
  )
}
