import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'abm Printing Solution | One-Stop Shop for All Printing Needs',
  description: 'Quality printing services in Rawalpindi. From business cards and customized packaging to large-scale 3D sign boards. We deliver precision and speed for every brand.',
  keywords: 'printing, business cards, packaging, bags, signs, rawalpindi, pakistan, custom printing',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
