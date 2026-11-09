import { useLayoutEffect, useRef, useState } from 'react'
import { selectedWork } from '../../content.js'
import { plaintextCopy as copy } from './plaintext-copy.js'

const PEEK = 0.5 // share of the first row's screenshots left showing, under the fade, while collapsed

function measure(list) {
  const shot = list.querySelector('img')
  return { collapsed: Math.round(shot.offsetTop + shot.offsetHeight * PEEK), full: list.offsetHeight }
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
        className={`plaintext-shots-clip${open ? '' : ' is-collapsed'}`}
        style={size ? { height: open ? size.full : size.collapsed } : undefined}
        onClick={open ? undefined : toggle}
      >
        <ul ref={list} className="plaintext-shots">
          {selectedWork.map(item => (
            <Project key={item.id} item={item} hidden={!open} />
          ))}
        </ul>
      </div>
      <p className="plaintext-more">
        <button type="button" className="plaintext-spin" aria-expanded={open} aria-controls="plaintext-shots" onClick={toggle}>
          <span aria-hidden="true">[ </span>{open ? copy.showFewer : copy.showAll(selectedWork.length)}<span aria-hidden="true"> ]</span>
        </button>
      </p>
    </>
  )
}
