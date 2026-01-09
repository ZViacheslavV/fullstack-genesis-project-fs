'use client';

import Modal from '@/components/common/Modal/Modal';
import AddTaskForm from '@/components/tasks/AddTaskForm/AddTaskForm';
import css from './TaskModal.module.css';

type TaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'create' | 'edit';
  initialValues?: Record<string, unknown>;
};

function TaskModal({
  isOpen,
  onClose,
  mode = 'create',
  initialValues,
}: TaskModalProps) {
  const title = mode === 'edit' ? 'Редагувати завдання' : 'Нове завдання';

  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton closeOnBackdrop closeOnEsc>
      <div className={css.wrapper}>
        <h2 className={css.title}>{title}</h2>

        <AddTaskForm onSuccess={onClose} initialValues={initialValues} mode={mode} />
      </div>
    </Modal>
  );
}

export default TaskModal;