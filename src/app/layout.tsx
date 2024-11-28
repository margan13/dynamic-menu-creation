import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import '../components/Button/button.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Dynamic Menu',
  description: 'Recruitment task for Droplo',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} p-4 antialiased`}>{children}</body>
    </html>
  );
}
