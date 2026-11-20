import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createServer } from 'vite'

const root = process.cwd()
const htmlPath = resolve(root, 'dist/index.html')

const server = await createServer({
  root,
  logLevel: 'error',
  server: { middlewareMode: true },
  appType: 'custom',
})

try {
  const { render } = await server.ssrLoadModule('/src/entry-server.jsx')
  const appHtml = render()
  const template = await readFile(htmlPath, 'utf8')
  const marker = '<div id="root"></div>'

  if (!template.includes(marker)) {
    throw new Error(`Expected ${marker} in ${htmlPath}`)
  }

  const output = template.replace(marker, `<div id="root">${appHtml}</div>`)
  await writeFile(htmlPath, output, 'utf8')
} finally {
  await server.close()
}
