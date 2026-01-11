'use client';
import { Toaster } from 'react-hot-toast';
import { getTasks } from '@/lib/api/clientApi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import TaskItem from '../TaskItem/TaskItem';
import css from './TasksReminderCard.module.css';
import { useAuthUserStore } from '@/lib/store/authStore';
import Button from '@/components/common/Button/Button';
import { useRouter } from 'next/navigation';
import AddTaskModal from '../AddTaskModal/AddTaskModal';

//===============================================================

function TasksReminderCard() {
  const { isAuthenticated } = useAuthUserStore();
  const router = useRouter();
  const { data, isError, isSuccess, isPending } = useQuery({
    queryKey: ['task'],
    queryFn: () => getTasks(),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  useEffect(() => {
    if (isError) {
      console.log('smth went wrong in get tasks');
      toast('Sorry, something went wrong, please try again');
    }
  }, [isError]);

  // temporary auth state
  // const isAuthenticated = true;
  // end of temporary auth state

  const handleCreateTaskBtnClick = () => {
    router.push('/auth/register');
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    if (isAuthenticated) {
      setIsModalOpen(true);
    } else {
      router.push('/auth/register');
    }
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className={css.taskCard}>
        <div className={css.taskCardHeader}>
          <h3 className={css.taskCardTitle}>Важливі завдання</h3>
          <button onClick={openModal} className={css.addTaskBtn}>
            <svg
              width={21}
              height={21}
              fill={'#000000'}
              className={css.addTaskBtnIcon}
            >
              <use href="/icons.svg#icon-add-circle"></use>
            </svg>
          </button>
        </div>
        {/* <Modal isOpen={isModalOpen} onClose={closeModal}>
          <AddTaskForm afterSubmit={closeModal} />
        </Modal> */}
        <AddTaskModal isOpen={isModalOpen} onClose={closeModal}></AddTaskModal>

        {isAuthenticated ? (
          <>
            {isPending ? (
              <p className={css.loading}>Завантаження завдань...</p>
            ) : isSuccess && data?.length > 0 ? (
              <ul className={css.taskList}>
                {data.map((task) => (
                  <TaskItem key={task._id} task={task} />
                ))}
              </ul>
            ) : (
              <p className={css.emptyState}>У вас поки немає завдань</p>
            )}
          </>
        ) : (
          <ul className={css.taskList}>
            <li>
              <p className={css.subTitleTaskList}>
                Наразі немає жодних завдань
              </p>
              <p>Створіть мершій нове завдання!</p>
            </li>
            <li>
              <Button onClick={handleCreateTaskBtnClick}>
                Створити завдання
              </Button>
            </li>
          </ul>
        )}
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </>
  );
}

export default TasksReminderCard;
