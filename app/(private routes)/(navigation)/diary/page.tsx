'use client';

import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { useDiaryStore } from '@/lib/store/diaryStore';

import GreetingBlock from '@/components/common/GreetingBlock/GreetingBlock';
import Loader from '@/components/common/Loader/Loader';

import DiaryList from '@/components/diary/DiaryList/DiaryList';
import DiaryEntryDetails from '@/components/diary/DiaryEntryDetails/DiaryEntryDetails';
import DiaryEntryModal from '@/components/diary/AddDiaryEntryModal/AddDiaryEntryModal';
import ConfirmationModal from '@/components/common/ConfirmationModal/ConfirmationModal';
import Toast from '@/components/common/Toast/Toast';

import type { DiaryEntry } from '@/types/diary';
import css from './page.module.css';

type ModalMode = 'create' | 'edit';

export default function DiaryPage() {
  const { entries, isLoading, fetchEntries, removeEntry } = useDiaryStore();

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);
  const [entryModalMode, setEntryModalMode] = useState<ModalMode>('create');
  const [entryModalValues, setEntryModalValues] =
    useState<Record<string, unknown>>();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);

  // --- Helper для красивих тостів ---
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

  const selectedEntry = useMemo(() => {
    if (!selectedId) return null;
    return entries.find((e) => e._id === selectedId) ?? null;
  }, [entries, selectedId]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  // Автоматичний вибір першого запису (Desktop)
  useEffect(() => {
    if (!selectedId && entries.length > 0) {
      setSelectedId(entries[0]._id);
    }
  }, [entries, selectedId]);

  const openCreateModal = () => {
    setEntryModalMode('create');
    setEntryModalValues(undefined);
    setIsEntryModalOpen(true);
  };

  const openEditModal = (entry: DiaryEntry) => {
    setEntryModalMode('edit');
    setEntryModalValues({
      _id: entry._id,
      title: entry.title,
      description: entry.description,
      emotions: entry.emotions,
    });
    setIsEntryModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!idToDelete) return;

    try {
      await removeEntry(idToDelete);
      showToast('Запис успішно видалено', 'success');

      if (selectedId === idToDelete) {
        setSelectedId(null);
      }
    } catch {
      showToast('Не вдалося видалити запис', 'error');
    } finally {
      setIsDeleteModalOpen(false);
      setIdToDelete(null);
    }
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setIdToDelete(null);
  };

  return (
    <div className={css.page}>
      <GreetingBlock />

      {isLoading && entries.length === 0 ? (
        <div className={css.loader}>
          <Loader />
        </div>
      ) : (
        <>
          <div className={css.grid}>
            <DiaryList
              entries={entries}
              selectedId={selectedId}
              onAddEntry={openCreateModal}
              onSelectEntry={setSelectedId}
            />

            <DiaryEntryDetails
              entry={selectedEntry}
              onEdit={openEditModal}
              onDelete={handleDeleteClick}
            />
          </div>

          <DiaryEntryModal
            isOpen={isEntryModalOpen}
            onClose={() => setIsEntryModalOpen(false)}
            onSuccess={() => {
              fetchEntries();
              showToast(
                entryModalMode === 'create'
                  ? 'Запис створено'
                  : 'Запис оновлено',
                'success'
              );
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
            onCancel={handleCloseDeleteModal}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  );
}
