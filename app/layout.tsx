import type { Metadata } from 'next'

import { ColorScript } from '@components/ColorScript'
import ModeToggle from '@components/ModeToggle'
import { ThemeProvider } from '@components/theme-provider'
import { Analytics } from '@vercel/analytics/react'
import '../styles/globals.css'

interface LayoutProps {
  children?: JSX.Element
}

export const metadata: Metadata = {
  title: 'João Salgueiro | Software Engineer',
  description: 'Neurospicy Software Engineer based in Lisbon, Portugal',
}

export default function RootLayout({ children }: LayoutProps): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ModeToggle />
          {children}
          <footer className="p-4 text-sm md:text-base text-center mt-8">
            © 2025 João Salgueiro.{' '}
            <a
              href="https://github.com/nocategory/joao.codes"
              className="hover:underline"
            >
              This site is open source
            </a>{' '}
            and was built with &lt;3
          </footer>
          <ColorScript />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
