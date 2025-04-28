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
  },
  openGraph: {
    title: "LEAD 2025 | مستقبل الابتكار",
    description:
      "انضم إلى LEAD 2025 واستمتع بجدول مميز من المتحدثين والمسارات والمناقشات حول مستقبل التكنولوجيا.",
    url: `https://game.lead-kfupm.com/`,
    siteName: "LEAD",
    images: [
      {
        url: `https://game.lead-kfupm.com/logo.png`,
        width: 1200,
        height: 630,
        alt: "شعار LEAD 2025",
      },
    ],
    type: "website",
  },
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
