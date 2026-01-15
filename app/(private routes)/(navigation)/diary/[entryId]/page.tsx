'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { useDiaryStore } from '@/lib/store/diaryStore';

import GreetingBlock from '@/components/common/GreetingBlock/GreetingBlock';
import Loader from '@/components/common/Loader/Loader';
import DiaryEntryDetails from '@/components/diary/DiaryEntryDetails/DiaryEntryDetails';
import DiaryEntryModal from '@/components/diary/AddDiaryEntryModal/AddDiaryEntryModal';
import ConfirmationModal from '@/components/common/ConfirmationModal/ConfirmationModal';
import Toast from '@/components/common/Toast/Toast';

import css from './page.module.css';

type ModalMode = 'create' | 'edit';

export default function DiaryEntryPage() {
  const { entryId } = useParams<{ entryId: string }>();
  const router = useRouter();

  const { entries, isLoading, fetchEntries, removeEntry } = useDiaryStore();

  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);
  const [entryModalMode, setEntryModalMode] = useState<ModalMode>('edit');
  const [entryModalValues, setEntryModalValues] = useState<Record<string, unknown>>();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 2. Helper для тостів
  const showToast = (message: string, type: 'success' | 'error') => {
    toast.custom((t) => (
      <div
        className={`${css.toastWrapper} ${
          t.visible ? css.toastEnter : css.toastExit
        }`}
      >
        <Toast message={message} type={type} />
      </div>
    ));
  };

  const entry = useMemo(
    () => entries.find((e) => e._id === entryId) ?? null,
    [entries, entryId]
  );

  useEffect(() => {
    if (entries.length === 0) {
      fetchEntries();
    }
  }, [entries.length, fetchEntries]);

  const openEditModal = () => {
    if (!entry) return;
    setEntryModalMode('edit');
    setEntryModalValues({
      _id: entry._id,
      title: entry.title,
      description: entry.description, 
      emotions: entry.emotions,
    });
    setIsEntryModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await removeEntry(entryId);
      showToast('Запис видалено', 'success');
      router.push('/diary'); 
    } catch {
      showToast('Помилка видалення', 'error');
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className={css.page}>
      <GreetingBlock />

      {isLoading && !entry ? (
        <div className={css.loaderWrapper}>
          <Loader />
        </div>
      ) : entry ? (
        <>
          <div className={css.card}>
            <DiaryEntryDetails 
                entry={entry} 
                onEdit={openEditModal}
                onDelete={handleDeleteClick}
            />
          </div>

          <DiaryEntryModal
            isOpen={isEntryModalOpen}
            onClose={() => setIsEntryModalOpen(false)}
            onSuccess={() => {
                fetchEntries();
                showToast('Запис оновлено', 'success');
            }}
            mode={entryModalMode}
            initialValues={entryModalValues}
          />

          <ConfirmationModal
             isOpen={isDeleteModalOpen}
             title="Ви впевнені, що хочете видалити цей запис?"
             confirmButtonText="Видалити"
             cancelButtonText="Скасувати"
             onConfirm={handleConfirmDelete}
             onCancel={() => setIsDeleteModalOpen(false)}
             isLoading={isLoading}
          />
        </>
      ) : (
        <p className={css.infoText}>Запис не знайдено або було видалено.</p>
      )}
    </div>
  );
}