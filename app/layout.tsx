import type { Metadata } from 'next';
import { Libre_Caslon_Text, Manrope } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const libreCaslon = Libre_Caslon_Text({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'METANOIA - Restore, Create, Reconnect',
  description: 'Luxury wellness retreat sanctuary for healing, creativity, and personal transformation.',
  keywords: 'wellness, retreat, yoga, spa, wellness sanctuary, luxury retreat',
  openGraph: {
    title: 'METANOIA - Restore, Create, Reconnect',
    description: 'Luxury wellness retreat sanctuary for healing, creativity, and personal transformation.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${libreCaslon.variable} ${manrope.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-ivory text-brown font-sans">
        <div className="noise-overlay" />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
