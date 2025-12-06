import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  // Basic metadata
  title: {
    default: "Hansen's Excavating & Trucking | Southern Alberta",
    template: "%s | Hansen's Excavating & Trucking",
  },
  description: "Professional excavation, trucking, land reclamation, and oil & gas services in Southern Alberta since 1976. Family-owned business serving Taber and surrounding areas.",
  keywords: ["excavation", "trucking", "land reclamation", "oil and gas", "grading", "Taber", "Alberta", "earthmoving", "Hansen's Excavating", "Southern Alberta excavation"],
  authors: [{ name: "Hansen's Excavating & Trucking" }],
  creator: "Hansen's Excavating & Trucking",
  publisher: "Hansen's Excavating & Trucking",
  
  // Favicon & icons
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/favicon.svg',
  },
  
  // Canonical URL
  metadataBase: new URL('https://hansensexcavating.com'),
  alternates: {
    canonical: '/',
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Open Graph
  openGraph: {
    title: "Hansen's Excavating & Trucking",
    description: "Southern Alberta's trusted partner for oil & gas excavation, land reclamation, and commercial earthmoving since 1976.",
    url: 'https://hansensexcavating.com',
    siteName: "Hansen's Excavating & Trucking",
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: "Hansen's Excavating & Trucking - Southern Alberta",
      },
    ],
  },
  
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: "Hansen's Excavating & Trucking",
    description: "Southern Alberta's trusted partner for oil & gas excavation, land reclamation, and commercial earthmoving since 1976.",
    images: ['/og-image.png'],
  },
  
  // Verification (add these when you have the codes)
  // verification: {
  //   google: 'google-site-verification-code',
  // },
  
  // Geographic targeting for local SEO
  other: {
    'geo.region': 'CA-AB',
    'geo.placename': 'Taber',
    'geo.position': '49.7847;-112.1508',
    'ICBM': '49.7847, -112.1508',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
