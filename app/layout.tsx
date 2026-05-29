import type { Metadata } from 'next'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'Karr Care Mobile | Mobile Auto Mechanic in Daytona Beach & Ormond Beach',
  description: 'Professional mobile auto mechanic services in Daytona Beach, Ormond Beach, and Holly Hill, Florida. We come to you — home or work. No shop fees, honest prices.',
  keywords: 'mobile auto mechanic, car repair Daytona Beach, mobile mechanic Ormond Beach, mobile mechanic Holly Hill FL, on-site car repair',
  openGraph: {
    title: 'Karr Care Mobile | It Takes a Karr to Know a Car',
    description: 'Mobile auto mechanic serving Daytona Beach, Ormond Beach & Holly Hill. We Come To You.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
