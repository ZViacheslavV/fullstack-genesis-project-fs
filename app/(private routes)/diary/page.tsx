'use client';

import { useSearchParams } from 'next/navigation';

import GreetingBlock from '@/components/diary/GreetingBlock/GreetingBlock';
import DiaryList from '@/components/diary/DiaryList/DiaryList';
import DiaryEntryDetails from '@/components/diary/DiaryEntryDetails/DiaryEntryDetails';

import css from './page.module.css';

export default function DiaryPage() {
  const searchParams = useSearchParams();
  const entryId = searchParams.get('entryId');

  return (
    <main className={css.page}>
      <GreetingBlock />

      <section className={css.content}>
        <div className={css.left}>
          <DiaryList />
        </div>

        <div className={css.right}>
          <DiaryEntryDetails entryId={entryId} />
        </div>
      </section>
    </main>
  );
}
