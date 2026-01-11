'use client';

import Modal from '@/components/common/Modal/Modal';
import AddTaskForm from '@/components/tasks/AddTaskForm/AddTaskForm';
import css from './AddTaskModal.module.css';

type AddTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
  return (
    <Modal
  isOpen={isOpen}
  onClose={onClose}
  showCloseButton
  closeOnBackdrop
  closeOnEsc
  modalClassName={css.modalTask}
>
  <div className={css.wrapper}>
    <AddTaskForm afterSubmit={onClose} />
  </div>
</Modal>
  );
}

export default AddTaskModal;