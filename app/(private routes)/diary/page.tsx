'use client';

import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import GreetingBlock from '@/components/common/GreetingBlock/GreetingBlock';
import Loader from '@/components/common/Loader/Loader';

import DiaryList from '@/components/diary/DiaryList/DiaryList';
import DiaryEntryDetails from '@/components/diary/DiaryEntryDetails/DiaryEntryDetails';
import DiaryEntryModal from '@/components/diary/AddDiaryEntryModal/AddDiaryEntryModal';

import type { DiaryEntry } from '@/types/diary';
import { isWrappedDiariesResponse } from '@/types/diary';

import css from './page.module.css';

type ModalMode = 'create' | 'edit';

const DiaryPage = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isForbidden, setIsForbidden] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('create');
  const [modalInitialValues, setModalInitialValues] = useState<Record<string, unknown> | undefined>(
    undefined
  );

  const selectedEntry = useMemo(() => {
    if (!selectedId) return null;
    return entries.find((e) => e._id === selectedId) ?? null;
  }, [entries, selectedId]);

  // Load diaries
  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        setIsLoading(true);
        setIsForbidden(false);

        const res = await fetch('/api/diaries', {
          method: 'GET',
          credentials: 'include',
          headers: { Accept: 'application/json' },
          cache: 'no-store',
        });

        if (res.status === 401 || res.status === 403) {
          if (!isMounted) return;
          setIsForbidden(true);
          setEntries([]);
          setSelectedId(null);
          return;
        }

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }

        const raw = (await res.json()) as unknown;

        const list: DiaryEntry[] = Array.isArray(raw)
          ? raw
          : isWrappedDiariesResponse(raw)
            ? raw.data
            : [];

        if (!isMounted) return;

        setEntries(list);


        if (!selectedId && list.length > 0) {
          setSelectedId(list[0]._id);
        }
      } catch {
        if (!isMounted) return;
        toast.error('Не вдалося завантажити записи щоденника');
        setEntries([]);
        setSelectedId(null);
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

  // Open create modal
  const openCreateModal = () => {
    setModalMode('create');
    setModalInitialValues(undefined);
    setIsModalOpen(true);
  };

  // Open edit modal (prefill)
  const openEditModal = (entry: DiaryEntry) => {
    setModalMode('edit');

    setModalInitialValues({
      _id: entry._id,
      title: entry.title,
      note: entry.note,
      emotions: entry.emotions,
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.page}>
      <GreetingBlock />

      {isLoading ? (
        <div className={css.loader}>
          <Loader />
        </div>
      ) : isForbidden ? (
        <p className={css.infoText}>Щоб переглянути щоденник, потрібно увійти.</p>
      ) : (
        <>
          <div className={css.grid}>
            <DiaryList
              entries={entries}
              selectedId={selectedId}
              onAddEntry={openCreateModal}
              onSelectEntry={(id) => setSelectedId(id)}
            />

            <div className={css.details}>
              <DiaryEntryDetails entry={selectedEntry} onEdit={openEditModal} />
            </div>
          </div>

          <DiaryEntryModal
            isOpen={isModalOpen}
            onClose={closeModal}
            mode={modalMode}
            initialValues={modalInitialValues}
          />
        </>
      )}
    </div>
  );
};

export default DiaryPage;
