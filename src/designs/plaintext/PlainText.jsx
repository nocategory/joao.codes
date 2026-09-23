import { Fragment } from 'react'
import { contact, horizon, links, person, site } from '../../content.js'
import { plaintextCopy as copy } from './plaintext-copy.js'
import PlainSky from './PlainSky.jsx'
import { useTheme } from './useTheme.js'
import './plaintext.css'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const LEADER_WIDTH = 12 // label plus dot leader, in characters

function month(value) {
  const [year, index] = value.split('-')
  return { year, name: MONTHS[Number(index) - 1] }
}

function range({ start, end }) {
  const from = month(start)
  if (!end) return `${from.name} ${from.year} – ${copy.now}`
  const to = month(end)
  if (from.year === to.year) return `${from.name} – ${to.name} ${to.year}`
  return `${from.name} ${from.year} – ${to.name} ${to.year}`
}

function Dates({ role }) {
  if (role.approximate) {
    return <span><span aria-hidden="true">~</span><span className="plaintext-sr">{copy.approximate} </span>{role.start.slice(0, 4)} – {role.end.slice(0, 4)}</span>
  }
  const periods = role.periods ? [...role.periods].reverse() : [role]
  return periods.map(period => <span key={period.start}>{range(period)}</span>)
}

// An address as people would type it, free to break after a slash on narrow screens.
function Address({ href }) {
  const parts = href.replace(/^https:\/\/(www\.)?/, '').replace(/\/$/, '').split('/')
  return parts.map((part, index) => <Fragment key={index}>{index > 0 && <>/<wbr /></>}{part}</Fragment>)
}

// A setext heading: the text, then a line of = or - exactly as long.
function Heading({ as, id, children, mark }) {
  const Tag = as
  return (
    <Tag className="plaintext-heading" id={id}>
      <span>{children}</span>
      <span className="plaintext-underline" aria-hidden="true">{mark.repeat(children.length)}</span>
    </Tag>
  )
}

// A plain-text button that switches between the live site's dark colours and paper.
function ThemeSwitch({ theme, onToggle }) {
  return <p className="plaintext-theme">
    <button type="button" className="plaintext-spin" onClick={onToggle}>
      <span aria-hidden="true">[ </span>{theme === 'dark' ? copy.toLight : copy.toDark}<span aria-hidden="true"> ]</span>
    </button>
  </p>
}

export default function PlainText() {
  const roles = [...horizon.experience].sort((a, b) => b.start.localeCompare(a.start))
  const [theme, toggleTheme] = useTheme()
  const dark = theme === 'dark'

  return (
    <div className={`plaintext-page${dark ? ' is-night' : ''}`}>
      <a className="plaintext-skip" href="#plaintext-main">{copy.skip}</a>

      <div className="plaintext-body"><div className="plaintext-doc">
        <ThemeSwitch theme={theme} onToggle={toggleTheme} />
        <PlainSky />

        <main id="plaintext-main" tabIndex={-1}>
          <header className="plaintext-intro">
            <Heading as="h1" mark="=">{person.name}</Heading>
            <p>{copy.intro}</p>
          </header>

          <nav className="plaintext-contents" aria-labelledby="plaintext-contents-title">
            <Heading as="h2" id="plaintext-contents-title" mark="-">{copy.contentsTitle}</Heading>
            <ul>
              {copy.contents.map(item => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                  <span aria-hidden="true"> {'.'.repeat(LEADER_WIDTH - item.label.length - 2)} </span>
                  <span className="plaintext-sr">: </span>
                  {item.note}
                </li>
              ))}
            </ul>
          </nav>

          <section id="about" className="plaintext-section" aria-labelledby="plaintext-about-title">
            <Heading as="h2" id="plaintext-about-title" mark="-">{copy.aboutTitle}</Heading>
            {copy.about.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </section>

          <section id="work" className="plaintext-section" aria-labelledby="plaintext-work-title">
            <Heading as="h2" id="plaintext-work-title" mark="-">{copy.workTitle}</Heading>
            <p>{copy.workIntro}</p>
            {roles.map(role => (
              <article key={role.id} className="plaintext-role" aria-labelledby={`plaintext-role-${role.id}`}>
                <h3 id={`plaintext-role-${role.id}`}>{role.company}</h3>
                <p className="plaintext-role-dates"><Dates role={role} /></p>
                <p className="plaintext-role-title">{role.role}</p>
                <p className="plaintext-role-summary">{role.summary}</p>
                {role.work.length > 0 && <>
                  <p className="plaintext-role-label">{copy.projects}</p>
                  <ul className="plaintext-role-work">
                    {role.work.map(item => <li key={item}>{copy.workItems[item] || item.replace(' · ', ': ')}</li>)}
                  </ul>
                </>}
                <p className="plaintext-role-tools">{copy.toolsLabel[role.id] || copy.tools} {role.tools.join(', ')}</p>
              </article>
            ))}
          </section>

          <section id="contact" className="plaintext-section" aria-labelledby="plaintext-contact-title">
            <Heading as="h2" id="plaintext-contact-title" mark="-">{copy.contactTitle}</Heading>
            <p>{copy.contactIntro}</p>
            <dl className="plaintext-contact">
              <div>
                <dt>{copy.email}</dt>
                <dd><a href={`mailto:${contact.email}`}>{contact.email}</a></dd>
              </div>
              {links.map(link => (
                <div key={link.href}>
                  <dt>{link.label}</dt>
                  <dd><a href={link.href}><Address href={link.href} /></a></dd>
                </div>
              ))}
            </dl>
          </section>
        </main>

        <footer className="plaintext-footer">
          <p aria-hidden="true">-- </p>
          <p>{site.copyright}. {copy.signature} {dark ? copy.heart.dark : copy.heart.light}</p>
        </footer>
      </div></div>
    </div>
  )
}
