import type { Metadata } from 'next'

import ModeToggle from '@components/ModeToggle'
import { ThemeProvider } from '@components/theme-provider'
import WaterColor from '@components/WaterColor'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Joao Salgueiro | Software Engineer',
  description: 'Software Engineer based in Lisbon, Portugal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <WaterColor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
