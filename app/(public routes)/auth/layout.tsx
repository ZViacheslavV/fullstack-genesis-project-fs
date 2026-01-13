'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';

import css from './layout.module.css';

//===========================================================================

const IMAGES = {
  login:
    '/close-up-view-of-a-warm-nest-with-three-smooth-pastel-colored-eggs.jpg',
  register: '/illustration-of-two-storks-building-a-nest-together.jpg',
} as const;

//===========================================================================

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname.includes('/auth/login');

  const imageSrc = isLogin ? IMAGES.login : IMAGES.register;

  return (
    <div className={css.page}>
      <div className={css.left}>
        <div className={css.logoRow}>
          <Link href="/">
            <Image
              src="/company-logo.svg"
              alt="Лелека"
              width={105}
              height={45}
              priority
            />
          </Link>
        </div>

        <div className={css.formWrap}>{children}</div>
      </div>

      <div className={css.right} aria-hidden="true">
        <Image
          src={imageSrc}
          alt=""
          fill
          priority
          sizes="(min-width: 1440px) 40vw, 0px"
          className={css.illustration}
        />
      </div>

      <Toaster position="top-right" />
    </div>
  );
}
