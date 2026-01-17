import Image from 'next/image';
import Link from 'next/link';
import css from './page.module.css';

import { getServerMe } from '@/lib/api/serverApi';
import OnboardingClient from './OnboardingClient';



export default async function OnboardingPage() {
  const user = await getServerMe(); // user гарантирован

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

        <div className={css.formWrap}>
          <h1 className={css.title}>Давайте познаймимось ближче</h1>

          <OnboardingClient user={user} />
        </div>
      </div>

      <div className={css.right} aria-hidden="true">
        <Image
          src="/painting-of-a-tiny-delicate-sprout-emerging-from-the-ground-surrounded-by-a-soft-warm-magical-glow.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 1440px) 40vw, 0px"
          className={css.illustration}
        />
      </div>
    </div>
  );
}