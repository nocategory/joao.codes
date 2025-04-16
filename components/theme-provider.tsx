'use client'

import type { ThemeProviderProps as NextThemesProviderProps } from 'next-themes'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import React from 'react'

interface ThemeProviderProps extends NextThemesProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
