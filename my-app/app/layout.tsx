import "./globals.css";
import "./fontawesome";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { Poppins } from 'next/font/google';

// Prevent Font Awesome from adding its CSS since we did it manually above
config.autoAddCss = false;

// Initialize the Poppins font with all needed weights
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-poppins',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={poppins.variable}>
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
}
