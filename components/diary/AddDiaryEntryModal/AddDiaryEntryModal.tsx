'use client';

import Modal from '@/components/common/Modal/Modal';
import AddDiaryEntryForm from '@/components/diary/AddDiaryEntryForm/AddDiaryEntryForm';
import css from './DiaryEntryModal.module.css';

type DiaryEntryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'create' | 'edit';
  initialValues?: Record<string, unknown>;
};

function DiaryEntryModal({
  isOpen,
  onClose,
  mode = 'create',
  initialValues,
}: DiaryEntryModalProps) {
  const title = mode === 'edit' ? 'Редагувати запис' : 'Новий запис';

  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton closeOnBackdrop closeOnEsc>
      <div className={css.wrapper}>
        <h2 className={css.title}>{title}</h2>

        <AddDiaryEntryForm onSuccess={onClose} initialValues={initialValues} mode={mode} />
      </div>
    </Modal>
  );
}

export default DiaryEntryModal;
