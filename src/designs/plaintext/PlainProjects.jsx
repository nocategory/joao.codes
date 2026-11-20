import { selectedWork } from '../../content.js'
import { plaintextCopy as copy } from './plaintext-copy.js'

// The screenshot links to the version it shows: the archived copy when there is one.
function Project({ item, featured }) {
  const { name, what, detail, year, live, archive } = item
  const shown = archive ? String(archive.year) : copy.today
  return (
    <li className={`plaintext-shot${featured ? ' is-featured' : ''}`}>
      <a className="plaintext-shot-image" href={archive?.href ?? live}>
        <img
          src={`/work/${item.id}.webp`}
          width="800"
          height="500"
          loading="lazy"
          decoding="async"
          alt={`${name} home page, ${shown}`}
        />
      </a>
      <p className="plaintext-shot-name">
        <span>{name}</span> <span className="plaintext-shot-when">[{year}]</span>
      </p>
      <p className="plaintext-shot-what">{what}</p>
      {detail && <p className="plaintext-shot-detail">{detail}</p>}
      <p className="plaintext-shot-links">
        {live && (
          <a href={live}>
            {copy.visitLive}
            <span className="plaintext-sr">: {name}</span>
          </a>
        )}
        {live && archive && ' · '}
        {archive && (
          <a href={archive.href}>
            {copy.archived}
            <span className="plaintext-sr">: {name}</span>
          </a>
        )}
      </p>
    </li>
  )
}

export default function PlainProjects() {
  return (
    <ul className="plaintext-shots">
      {selectedWork.map((item, index) => (
        <Project key={item.id} item={item} featured={index === 0 && selectedWork.length % 2 === 1} />
      ))}
    </ul>
  )
}
