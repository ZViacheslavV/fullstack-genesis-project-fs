'use client';

import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';

import GreetingBlock from '@/components/common/GreetingBlock/GreetingBlock';
import Loader from '@/components/common/Loader/Loader';
import DiaryEntryDetails from '@/components/diary/DiaryEntryDetails/DiaryEntryDetails';

import type { DiaryEntry } from '@/types/diary';
import { isWrappedDiariesResponse } from '@/types/diary';

import css from './page.module.css';

function DiaryEntryPage() {
  const params = useParams<{ entryId: string }>();
  const entryId = params.entryId;

  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        setIsLoading(true);

        const res = await fetch('/api/diaries', {
          method: 'GET',
          credentials: 'include',
          headers: { Accept: 'application/json' },
          cache: 'no-store',
        });

        if (!res.ok) {
          const text = await res.text().catch(() => '');
          throw new Error(text || `Request failed: ${res.status}`);
        }

        const raw = (await res.json()) as unknown;

        const list: DiaryEntry[] = Array.isArray(raw)
          ? (raw as DiaryEntry[])
          : isWrappedDiariesResponse(raw)
            ? raw.data
            : [];

        if (!isMounted) return;
        setEntries(list);
      } catch {
        if (!isMounted) return;
        toast.error('Не вдалося завантажити запис');
        setEntries([]);
      } finally {
        if (!isMounted) return;
        setIsLoading(false);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  const entry = useMemo(() => {
    return entries.find((e) => e._id === entryId) ?? null;
  }, [entries, entryId]);

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

export default DiaryEntryPage;
