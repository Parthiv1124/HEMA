import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Hema Pharmaceuticals',
    default: 'Hema Pharmaceuticals Pvt. Ltd. | Leading API Manufacturer',
  },
  description:
    'Leading manufacturer of sterile injectable grade APIs with WHO-GMP certification, serving 40+ international markets from Ankleshwar, Gujarat, India.',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Hema Pharmaceuticals Pvt. Ltd.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
