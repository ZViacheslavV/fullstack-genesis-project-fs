'use client';
import Modal from '@/components/common/Modal/Modal';
import { useState } from 'react';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import css from './CreateTaskWidget.module.css';

export default function CreateTaskWidget() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <button onClick={openModal} className={css.addTaskBtn}>
        <svg width={21} height={21} fill={'#000000'}>
          <use href="/icons.svg#icon-add-circle"></use>
        </svg>
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AddTaskForm afterSubmit={closeModal} />
      </Modal>
    </>
  );
}
