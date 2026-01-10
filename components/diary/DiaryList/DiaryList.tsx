'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import DiaryEntryCard from '../DiaryEntryCard/DiaryEntryCard';
import css from './DiaryList.module.css';

// ===============================================================

export type DiaryEntry = {
  _id: string;
  title: string;
  emotions: string[];
  createdAt: string;
};

type DiaryListProps = {
  onAddEntry?: () => void;              // 👈 заглушка під модалку
  onSelectEntry?: (id: string) => void; // 👈 для desktop (потім)
};

const fetchDiaries = async (): Promise<DiaryEntry[]> => {
  const res = await fetch('/api/diaries', {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch diaries');
  }

  return res.json();
};

// ===============================================================

function DiaryList({ onAddEntry, onSelectEntry }: DiaryListProps) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['diaries'],
    queryFn: fetchDiaries,
  });

  const handleSelect = (id: string) => {
    // ✅ mobile-first логіка
    if (onSelectEntry) {
      // desktop сценарій (коли буде права колонка)
      onSelectEntry(id);
      return;
    }

    // mobile / tablet
    router.push(`/diary/${id}`);
  };

  return (
    <section className={css.wrapper}>
      {/* ===== Header ===== */}
      <div className={css.header}>
        <h2 className={css.title}>Щоденник</h2>

        <button
          type="button"
          className={css.addBtn}
          onClick={onAddEntry}
        >
          Новий запис +
        </button>
      </div>

      {/* ===== States ===== */}
      {isLoading && (
        <p className={css.state}>Завантаження…</p>
      )}

      {isError && (
        <p className={css.state}>Помилка завантаження</p>
      )}

      {!isLoading && data?.length === 0 && (
        <p className={css.state}>
          Наразі записи у щоденнику відсутні
        </p>
      )}

      {/* ===== List ===== */}
      <ul className={css.list}>
        {data?.map(entry => (
          <li key={entry._id}>
            <DiaryEntryCard
              entry={entry}
              onClick={() => handleSelect(entry._id)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default DiaryList;
