'use client';

import { getTasks } from '@/lib/api/userApi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useEffect } from 'react';

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
      // toast('Sorry, something went wrong, please try again');
    }
  }, [isError]);
  console.log(data);
  return (
    <>
      {isSuccess && data?.length > 0 && (
        <ul>
          {data.map((task) => (
            <li key={task._id}>
              <p>{task.name}</p>
              <p>{format(new Date(task.date).toLocaleString(), 'yyyy-MM-dd')}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
