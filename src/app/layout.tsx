import type { Metadata } from 'next'
import { Cairo, Tajawal } from 'next/font/google'
import './globals.css'

// Arabic fonts
const tajawal = Tajawal({
  variable: '--font-tajawal',
  subsets: ['arabic'],
  weight: ['400', '700']
})

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic'],
  weight: ['400', '700']
})

export const metadata: Metadata = {
  title: 'LEAD KFUPM | Leadership Game',
  description: 'Discover your leadership style with LEAD KFUPM',
  icons: {
    icon: '/favicon.ico'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className="dark">
      <body className={`${tajawal.variable} ${cairo.variable} antialiased`}>{children}</body>
    </html>
  )
}
