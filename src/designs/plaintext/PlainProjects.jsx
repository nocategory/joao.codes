import { useLayoutEffect, useRef, useState } from 'react'
import { selectedWork } from '../../content.js'
import { plaintextCopy as copy } from './plaintext-copy.js'

const PEEK = 0.4 // share of the second row left showing, under the fade, while collapsed

// The first row, plus the top of the second. Null when everything fits in one row.
function measure(list) {
  const cards = [...list.children]
  const firstHidden = cards.findIndex(card => card.offsetTop > cards[0].offsetTop)
  if (firstHidden === -1) return null
  const next = cards[firstHidden]
  return { collapsed: Math.round(next.offsetTop + next.offsetHeight * PEEK), full: list.offsetHeight, firstHidden }
}

// The screenshot links to the version it shows: the archived copy when there is one.
function Project({ item, hidden }) {
  const { name, what, live, archive } = item
  const when = archive ? String(archive.year) : copy.today
  return (
    <li className="plaintext-shot" inert={hidden}>
      <a className="plaintext-shot-image" href={archive?.href ?? live}>
        <img src={`/work/${item.id}.webp`} width="800" height="500" loading="lazy" decoding="async" alt={`${name} home page, ${when}`} />
      </a>
      <p className="plaintext-shot-name"><span>{name}</span> <span className="plaintext-shot-when">[{when}]</span></p>
      <p className="plaintext-shot-what">{what}</p>
      <p className="plaintext-shot-links">
        <a href={live}>{copy.visitLive}<span className="plaintext-sr">: {name}</span></a>
        {archive && <> · <a href={archive.href}>{copy.archived}<span className="plaintext-sr">: {name}</span></a></>}
      </p>
    </li>
  )
}

export default function PlainProjects() {
  const clip = useRef(null)
  const list = useRef(null)
  const [open, setOpen] = useState(false)
  const [size, setSize] = useState(null)

  useLayoutEffect(() => {
    const update = () => setSize(measure(list.current))
    update()
    const observer = new ResizeObserver(update)
    observer.observe(list.current)
    return () => observer.disconnect()
  }, [])

  const collapsible = size !== null
  const toggle = () => {
    const section = clip.current.closest('section')
    if (open && section.getBoundingClientRect().top < 0) section.scrollIntoView({ block: 'start' })
    setOpen(!open)
  }

  return (
    <>
      <div
        ref={clip}
        id="plaintext-shots"
        className={`plaintext-shots-clip${collapsible && !open ? ' is-collapsed' : ''}`}
        style={collapsible ? { height: open ? size.full : size.collapsed } : undefined}
      >
        <ul ref={list} className="plaintext-shots">
          {selectedWork.map((item, index) => (
            <Project key={item.id} item={item} hidden={collapsible && !open && index >= size.firstHidden} />
          ))}
        </ul>
      </div>
      {collapsible && (
        <p className="plaintext-more">
          <button type="button" className="plaintext-spin" aria-expanded={open} aria-controls="plaintext-shots" onClick={toggle}>
            <span aria-hidden="true">[ </span>{open ? copy.showFewer : copy.showAll(selectedWork.length)}<span aria-hidden="true"> ]</span>
          </button>
        </p>
      )}
    </>
  )
}
