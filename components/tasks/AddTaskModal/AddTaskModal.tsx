'use client';

import Modal from '@/components/common/Modal/Modal';
import AddTaskForm from '@/components/tasks/AddTaskForm/AddTaskForm';
import css from './AddTaskModal.module.css';

type AddTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton
      closeOnBackdrop
      closeOnEsc
    >
      <div className={css.wrapper}>
        <AddTaskForm afterSubmit={onClose} />
      </div>
    </Modal>
  );
}
