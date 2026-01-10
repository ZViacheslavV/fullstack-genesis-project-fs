import type { Metadata } from 'next';
import LoginForm from '@/components/auth/LoginForm/LoginForm';

//===========================================================================

const SITE_URL = 'https://fullstack-genesis-project.vercel.app/';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: 'Вхід | Лелека',
  description:
    'Увійдіть у “Лелеку”, щоб продовжити відстеження тижнів вагітності, перегляд порад, завдань і записів щоденника.',

  openGraph: {
    title: 'Вхід | Лелека',
    description:
      'Увійдіть у свій акаунт, щоб продовжити відстеження тижнів вагітності та користуватись усіма функціями.',
    url: `${SITE_URL}auth/login`,
    siteName: 'Лелека',
    images: [
      {
        url: '/leleka-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Вхід у “Лелеку”',
      },
    ],
    locale: 'uk_UA',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Вхід | Лелека',
    description:
      'Увійдіть у свій акаунт, щоб продовжити відстеження тижнів вагітності та користуватись усіма функціями.',
    images: ['/leleka-og-meta.jpg'],
  },
};

//===========================================================================

export default function LoginPage() {
  return <LoginForm />;
}
