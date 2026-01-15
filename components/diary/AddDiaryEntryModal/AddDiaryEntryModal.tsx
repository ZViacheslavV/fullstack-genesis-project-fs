'use client';

import Modal from '@/components/common/Modal/Modal';
import AddDiaryEntryForm from '@/components/diary/AddDiaryEntryForm/addDiaryEntryForm'; 
import css from './AddDiaryEntryModal.module.css';

type DiaryEntryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  mode?: 'create' | 'edit';
  initialValues?: Record<string, unknown>;
};

function DiaryEntryModal({ 
  isOpen, 
  onClose, 
  onSuccess,
  mode = 'create', 
  initialValues 
}: DiaryEntryModalProps) {
  
  const title = mode === 'edit' ? 'Редагувати запис' : 'Новий запис';

  const handleFormSuccess = () => {
  
    if (onSuccess) {
      onSuccess();
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton
      closeOnBackdrop
      closeOnEsc
      modalClassName={css.modal}
    >
      <div className={css.wrapper}>
        <h2 className={css.title}>{title}</h2>

        <AddDiaryEntryForm 
            onSuccess={handleFormSuccess} 
            initialValues={initialValues} 
            mode={mode} 
        />
      </div>
    </Modal>
  );
}

export default DiaryEntryModal;