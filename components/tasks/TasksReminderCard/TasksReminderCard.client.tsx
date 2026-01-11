'use client';

import { getTasks } from '@/lib/api/clientApi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import TaskItem from '../TaskItem/TaskItem';
import css from './TasksReminderCard.module.css';

export default function TaskReminderCardClientPage() {
  const { data, isError, isSuccess } = useQuery({
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
  return (
    <>
      {isSuccess && data?.length > 0 && (
        <ul className={css.taskList}>
          {data.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </ul>
      )}
    </>
  );
}
