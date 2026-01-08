import type { Metadata } from 'next';
import { Lato, Comfortaa } from 'next/font/google';

import TanStackProvider from '@/components/layout/TanStackProvider/TanStackProvider';
import AuthProvider from '@/components/layout/AuthProvider/AuthProvider';
import Header from '@/components/layout/Header/Header';

import './globals.css';
import css from './layout.module.css';

//===========================================================================

const lato = Lato({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '700'],
  variable: '--font-family',
  display: 'swap',
});

const comfortaa = Comfortaa({
  subsets: ['latin', 'latin-ext'],
  weight: ['700'],
  variable: '--second-family',
  display: 'swap',
});

//===========================================================================

const SITE_URL = 'https://...';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: 'Лелека | Додаток для майбутніх мам',
  description:
    'Лелека — додаток для майбутніх мам: відстеження тижнів вагітності, поради, важливі завдання та щоденник самопочуття.',

  openGraph: {
    title: 'Лелека | Додаток для майбутніх мам',
    description:
      'Відстежуйте тижні вагітності, отримуйте поради, керуйте завданнями та ведіть щоденник.',
    url: SITE_URL,
    siteName: 'Лелека',
    images: [
      {
        url: '/public/leleka-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Лелека — додаток для майбутніх мам',
      },
    ],

    locale: 'uk_UA',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Лелека | Додаток для майбутніх мам',
    description:
      'Відстежуйте тижні вагітності, отримуйте поради, керуйте завданнями та ведіть щоденник.',
    images: ['/public/leleka-og-meta.jpg'],
  },
};

//===========================================================================

function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${lato.variable} ${comfortaa.variable}`}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            <div className="container">
              <main className={css.main}>
                <div className={css.container}>
                  {children}
                  {modal}
                </div>
              </main>
            </div>
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}

export default RootLayout;
