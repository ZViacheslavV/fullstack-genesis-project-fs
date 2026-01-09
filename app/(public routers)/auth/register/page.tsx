import type { Metadata } from 'next';
import RegistrationForm from '@/components/auth/RegistrationForm/RegistrationForm';

//===========================================================================

const SITE_URL = 'https://fullstack-genesis-project.vercel.app/';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: 'Реєстрація | Лелека',
  description:
    'Створіть акаунт у “Лелеці”, щоб відстежувати тижні вагітності, отримувати поради, керувати завданнями та вести щоденник самопочуття.',

  openGraph: {
    title: 'Реєстрація | Лелека',
    description:
      'Створіть акаунт і почніть відстежувати тижні вагітності, отримувати поради та вести щоденник.',
    url: `${SITE_URL}auth/register`,
    siteName: 'Лелека',
    images: [
      {
        url: '/leleka-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Реєстрація в “Лелеці”',
      },
    ],
    locale: 'uk_UA',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Реєстрація | Лелека',
    description:
      'Створіть акаунт і почніть відстежувати тижні вагітності, отримувати поради та вести щоденник.',
    images: ['/leleka-og-meta.jpg'],
  },
};

//===========================================================================

export default function RegisterPage() {
  return <RegistrationForm />;
}
