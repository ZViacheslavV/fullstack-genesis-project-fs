'use client';

import Modal from '@/components/common/Modal/Modal';
import Button from '@/components/common/Button/Button';
import css from './ConfirmationModal.module.css';


type ConfirmationModalProps = {
  isOpen: boolean;
  title: string;

  confirmButtonText: string;
  cancelButtonText: string;

  onConfirm: () => void;
  onCancel: () => void;

  isLoading?: boolean;
};

function ConfirmationModal({
  isOpen,
  title,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmationModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      showCloseButton={false}
      closeOnBackdrop
      closeOnEsc
    >
      <div className={css.wrapper}>
        <h2 className={css.title}>{title}</h2>

        <div className={css.actions}>
          <Button
            variant="cancel"
            size="sm"
            onClick={onCancel}
            disabled={isLoading}
            className={css.btn}
          >
            {cancelButtonText}
          </Button>

          <Button
            variant="delete"
            size="sm"
            onClick={onConfirm}
            isLoading={isLoading}
            className={css.btn}
          >
            {confirmButtonText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmationModal;
