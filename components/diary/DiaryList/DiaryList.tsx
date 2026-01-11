'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import DiaryEntryCard from '@/components/diary/DiaryEntryCard/DiaryEntryCard';
import type { DiaryEntry } from '@/types/diary';

import css from './DiaryList.module.css';

type DiaryListProps = {
  entries: DiaryEntry[];
  selectedId: string | null;
  onAddEntry: () => void;
  onSelectEntry: (id: string) => void;
};

const DESKTOP_MQ = '(min-width: 1440px)';

export default function DiaryList({
  entries,
  selectedId,
  onAddEntry,
  onSelectEntry,
}: DiaryListProps) {
  const router = useRouter();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const update = () => setIsDesktop(mq.matches);

    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const sortedEntries = useMemo(() => {
    return [...entries].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [entries]);

  const handleCardClick = (id: string) => {
    if (isDesktop) {
      onSelectEntry(id);
      return;
    }
    router.push(`/diary/${id}`);
  };

  return (
    <section className={css.wrapper} aria-label="Щоденник: список записів">
      <div className={css.header}>
        <h2 className={css.heading}>Ваші записи</h2>

        <button type="button" className={css.addBtn} onClick={onAddEntry}>
          <span>Новий запис</span>
          <span className={css.plus} aria-hidden="true">
            +
          </span>
        </button>
      </div>

      {sortedEntries.length === 0 ? (
        <div className={css.state}>
          <p className={css.stateText}>Наразі записи у щоденнику відсутні</p>
        </div>
      ) : (
        <ul className={css.list}>
          {sortedEntries.map((entry) => (
            <li key={entry._id} className={css.item}>
              <DiaryEntryCard
                entry={entry}
                onClick={() => handleCardClick(entry._id)}
                isActive={isDesktop && selectedId === entry._id}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
