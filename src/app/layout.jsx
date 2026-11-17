import { Montserrat } from 'next/font/google'
import '../index.css'
import ClientShell from '../components/ClientShell'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://softecnu.org'),
  title: "SOFTEC'27",
  description:
    "SOFTEC'27 - Pakistan's largest international IT event at FAST Lahore. Join us for competitions, workshops, and networking opportunities at FAST NUCES Lahore.",
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: "SOFTEC'27 - Pakistan's Largest IT Event at FAST Lahore",
    description:
      "SOFTEC'27 - Pakistan's largest international IT event at FAST Lahore. Join us for competitions, workshops, and networking opportunities at FAST NUCES Lahore.",
    type: 'website',
    images: ['/icon.png'],
  },
}

export const viewport = {
  themeColor: '#173D32',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.className}>
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  )
}
