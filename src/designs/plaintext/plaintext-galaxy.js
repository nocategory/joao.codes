// The joao.codes galaxy, drawn as characters on the document's own grid.
// Same stars as src/components/Galaxy.jsx (same seed, same three arms), but each
// frame is accumulated into a grid of cells and every cell becomes one glyph.

// Faint to dense. The space is empty paper.
export const RAMP = ' .·:-=+*#%@'

const MAX_STARS = 16000


const SPIN = 0.045 // radians per second, as on the current site
// How the disc sits on the page and how starlight becomes ink. Tuned by eye at 39 to 96 columns.
const TUNE = {
  turn: -0.35, // tilt of the disc on the page, radians
  squash: 0.66, // how far the disc leans away from us
  winding: 6, // radians the arms turn from core to rim (7.8 on the current site; looser reads better in type)
  scatter: 0.45, // arms drawn tighter than the original so they survive coarse cells
  perCell: 6, // stars per cell, so small screens are not noisier than large ones
  gain: 0.55,
  curve: 0.9,
  gamma: 1.5, // pushes thin light back to blank paper
  threshold: 0.12,
  core: 4,
  coreSize: 0.02,
  disc: 0.5,
  discSize: 0.05,
  lensSize: 0.1, // Einstein radius as a share of the field's shorter side
  ring: 0.65, // faint lensed background light around the pointer
}

export function makeStars() {
  let seed = 81
  const random = () => {
    seed = (seed * 16807) % 2147483647
    return seed / 2147483647
  }
  return Array.from({ length: MAX_STARS }, (_, index) => {
    const distance = Math.pow(random(), 0.65)
    const arm = index % 3
    const angle = distance * TUNE.winding + arm * Math.PI * 2 / 3 + (random() - 0.5) * (0.25 + distance * 0.65) * TUNE.scatter
    const depth = (random() - 0.5) * 0.14 * distance
    const size = random()
    random() // phase and colour in the original; drawn here so the sequence matches
    random()
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      depth,
      weight: 0.4 + size * 0.6 + Math.pow(size, 6) * 2.5,
    }
  })
}

// Height in pixels the disc needs to fill `width` pixels.
export function naturalHeight(width) {
  const cos = Math.cos(TUNE.turn)
  const sin = Math.sin(TUNE.turn)
  const extentX = Math.sqrt(cos * cos + TUNE.squash * TUNE.squash * sin * sin)
  const extentY = Math.sqrt(sin * sin + TUNE.squash * TUNE.squash * cos * cos) + 0.04
  return (width * extentY) / extentX
}

// Geometry for a field of `cols` x `rows` cells, each `cellW` x `cellH` pixels.
export function layoutField(cols, rows, cellW, cellH) {
  const width = cols * cellW
  const height = rows * cellH
  const cos = Math.cos(TUNE.turn)
  const sin = Math.sin(TUNE.turn)
  const extentX = Math.sqrt(cos * cos + TUNE.squash * TUNE.squash * sin * sin)
  const extentY = Math.sqrt(sin * sin + TUNE.squash * TUNE.squash * cos * cos) + 0.04
  const radius = Math.min((width * 0.5 * 0.97) / extentX, (height * 0.5 * 0.97) / extentY)
  // Keep the number of stars per cell roughly constant across screen sizes.
  const area = Math.PI * radius * radius * TUNE.squash
  const count = Math.max(1800, Math.min(MAX_STARS, Math.round((area / (cellW * cellH)) * TUNE.perCell)))
  // Distant stars that do not turn: a few fixed points across the whole field.
  let seed = 7
  const random = () => {
    seed = (seed * 16807) % 2147483647
    return seed / 2147483647
  }
  const distant = new Map()
  for (let index = Math.round((cols * rows) / 55); index > 0; index--) {
    distant.set(Math.floor(random() * rows) * cols + Math.floor(random() * cols), random() > 0.8 ? '·' : '.')
  }
  return { cols, rows, cellW, cellH, width, height, radius, count, cos, sin, distant, density: new Float32Array(cols * rows) }
}

// Returns the field as lines of text. `lens` is { x, y, strength } in field pixels, or null.
export function drawField(field, stars, time, lens) {
  const { cols, rows, cellW, cellH, width, height, radius, count, cos, sin, distant, density } = field
  density.fill(0)
  const centerX = width / 2
  const centerY = height / 2
  const spinCos = Math.cos(time * SPIN)
  const spinSin = Math.sin(time * SPIN)
  const starsPerCell = (count * cellW * cellH) / (Math.PI * radius * radius * TUNE.squash)
  const unit = 1 / starsPerCell

  // A pointer over the galaxy acts as a small point mass: light from stars behind it
  // is bent outward into a bright ring (a gravitational lens).
  const lensOn = lens && lens.strength > 0.01
  const einstein = lensOn ? Math.min(width, height) * TUNE.lensSize * lens.strength : 0
  const einstein2 = einstein * einstein
  const reach = einstein * 7

  for (let index = 0; index < count; index++) {
    const star = stars[index]
    const x = star.x * spinCos - star.y * spinSin
    const y = star.x * spinSin + star.y * spinCos
    let px = centerX + (x * cos - y * TUNE.squash * sin) * radius
    let py = centerY + (x * sin + y * TUNE.squash * cos + star.depth) * radius
    let weight = star.weight * unit

    if (lensOn) {
      const dx = px - lens.x
      const dy = py - lens.y
      const beta = Math.hypot(dx, dy)
      if (beta < reach) {
        const b = Math.max(beta, 0.01)
        const theta = (b + Math.sqrt(b * b + 4 * einstein2)) / 2
        px = lens.x + (dx / b) * theta
        py = lens.y + (dy / b) * theta
        const t4 = theta ** 4
        weight *= Math.min(4, t4 / (t4 - einstein2 * einstein2))
      }
    }

    // Spread each star over the four nearest cells so motion is gradual.
    const u = px / cellW - 0.5
    const v = py / cellH - 0.5
    const col = Math.floor(u)
    const row = Math.floor(v)
    const fx = u - col
    const fy = v - row
    if (row >= 0 && row < rows) {
      if (col >= 0 && col < cols) density[row * cols + col] += weight * (1 - fx) * (1 - fy)
      if (col + 1 >= 0 && col + 1 < cols) density[row * cols + col + 1] += weight * fx * (1 - fy)
    }
    if (row + 1 >= 0 && row + 1 < rows) {
      if (col >= 0 && col < cols) density[(row + 1) * cols + col] += weight * (1 - fx) * fy
      if (col + 1 >= 0 && col + 1 < cols) density[(row + 1) * cols + col + 1] += weight * fx * fy
    }
  }

  // Bright core and a faint disc, measured in the plane of the galaxy.
  const lines = new Array(rows)
  const last = RAMP.length - 1
  for (let row = 0; row < rows; row++) {
    let line = ''
    const dy = (row + 0.5) * cellH - centerY
    for (let col = 0; col < cols; col++) {
      const dx = (col + 0.5) * cellW - centerX
      const along = (dx * cos + dy * sin) / radius
      const across = (-dx * sin + dy * cos) / (radius * TUNE.squash)
      const r2 = along * along + across * across
      let light = density[row * cols + col] * TUNE.gain + TUNE.core * Math.exp(-r2 / TUNE.coreSize) + TUNE.disc * Math.exp(-r2 / TUNE.discSize)
      if (lensOn) {
        const offset = (Math.hypot(dx + centerX - lens.x, dy + centerY - lens.y) - einstein) / (einstein * 0.3)
        if (offset < 4) light += TUNE.ring * lens.strength * Math.exp(-offset * offset)
      }
      const tone = Math.pow(1 - Math.exp(-light * TUNE.curve), TUNE.gamma)
      line += tone < TUNE.threshold ? distant.get(row * cols + col) || ' ' : RAMP[Math.min(last, 1 + Math.floor((tone - TUNE.threshold) / (1 - TUNE.threshold) * last))]
    }
    lines[row] = line
  }
  return lines
}
