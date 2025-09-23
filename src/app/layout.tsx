import type { Metadata } from 'next';
import './globals.css';
import { ppAgrandir, graphik, sohne } from './fonts';

export const metadata: Metadata = {
  title: 'Juicebox Frontend Assessment',
  description:
    'A Next.js application with Lottie animations, Swiper tutorials, and multi-step forms',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ppAgrandir.variable} ${graphik.variable} ${sohne.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
