import { Montserrat } from 'next/font/google'
import '../index.css'
import ClientShell from '../components/ClientShell'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://softecnu.org'),
  title: "SOFTEC'27 | FAST NUCES Lahore | Legacy Meets Tomorrow",
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
  themeColor: '#0b1512',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.className} scroll-smooth`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="bg-light text-dark antialiased overflow-x-hidden selection:bg-primary selection:text-dark">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  )
}
