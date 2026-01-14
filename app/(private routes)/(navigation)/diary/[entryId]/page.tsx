'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

import GreetingBlock from '@/components/common/GreetingBlock/GreetingBlock';
import Loader from '@/components/common/Loader/Loader';
import DiaryEntryDetails from '@/components/diary/DiaryEntryDetails/DiaryEntryDetails';

import type { DiaryEntry } from '@/types/diary';
import { isWrappedDiariesResponse } from '@/types/diary';

import css from './page.module.css';

export default function DiaryEntryPage() {
  const { entryId } = useParams<{ entryId: string }>();

  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setIsLoading(true);

        const res = await fetch('/api/diaries', {
          credentials: 'include',
          cache: 'no-store',
        });

        if (!res.ok) throw new Error();

        const raw = await res.json();

        const list: DiaryEntry[] = Array.isArray(raw)
          ? raw
          : isWrappedDiariesResponse(raw)
            ? raw.data
            : [];

        if (active) setEntries(list);
      } catch {
        if (active) {
          toast.error('Не вдалося завантажити запис');
          setEntries([]);
        }
      } finally {
        if (active) setIsLoading(false);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, []);

  const entry = useMemo(
    () => entries.find((e) => e._id === entryId) ?? null,
    [entries, entryId]
  );

  return (
    <div className={css.page}>
      <GreetingBlock />

      {isLoading ? (
        <div className={css.loader}>
          <Loader />
        </div>
      ) : (
        <DiaryEntryDetails entry={entry} />
      )}
    </div>
  );
}
