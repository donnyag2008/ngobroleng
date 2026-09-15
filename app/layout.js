import './globals.css'
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
  title: 'NgobrolEng — Tempat Asyik Belajar Bahasa Inggris',
  description: 'Practice English conversation with AI. Fun, free, and designed for Indonesian students. The fun place to learn English!',
  keywords: 'belajar bahasa inggris, english practice, AI tutor, ngobrol english, latihan inggris',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'NgobrolEng — The Fun Place to Learn English',
    description: 'Ngobrol santai sama AI yang sabar, seru, dan nggak akan menghakimi kamu. Gratis!',
    url: 'https://ngobroleng.com',
    siteName: 'NgobrolEng',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NgobrolEng — Tempat Asyik Belajar Bahasa Inggris',
    description: 'Practice English with a cheeky AI fox. Free for Indonesian students!',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#1e3a8a',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}