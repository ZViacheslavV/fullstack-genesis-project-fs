import type { Metadata } from 'next';
import { Lato, Comfortaa } from 'next/font/google';

import { TanStackProvider } from '@/app/components';

import './globals.css';
// import css from './layout.module.css';

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

export const metadata: Metadata = {};

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
          <div className="container">
            <main /* className={css.main} */>
              <div /* className={css.container} */>
                {children}
                {modal}
              </div>
            </main>
          </div>
        </TanStackProvider>
      </body>
    </html>
  );
}

export default RootLayout;
