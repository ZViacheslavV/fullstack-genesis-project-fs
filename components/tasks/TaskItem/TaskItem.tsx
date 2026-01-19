import { updateTaskStatus } from '@/lib/api/clientApi';
import { Task } from '@/types/task';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import css from './TaskItem.module.css';
import { format } from 'date-fns';
import Toast from '@/components/common/Toast/Toast';

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateTaskStatus,

    onMutate: async (newStatus) => {
      await queryClient.cancelQueries({ queryKey: ['task'] });
      const previousTasks = queryClient.getQueryData<Task[]>(['task']);
      queryClient.setQueryData<Task[]>(['task'], (old) => {
        if (!old) return [];
        return old.map((t) =>
          t._id === newStatus.id ? { ...t, isDone: newStatus.isDone } : t
        );
      });
      return { previousTasks };
    },

    onError: (err, newStatus, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['task'], context.previousTasks);
      }
      toast.custom(
        () => (
          <Toast
            type="error"
            message="Не вдалося оновити статус завдання. Спробуйте ще раз."
          />
        ),
        { duration: 5000 }
      );
    },
  });
  const handleChange = () => {
    mutate({ id: task._id, isDone: !task.isDone });
  };
  const formattedDate = task.date ? format(new Date(task.date), 'dd.MM') : '';

  return (
    <li className={task.isDone ? 'done-style' : ''}>
      <p className={css.taskItemDate}>{formattedDate}</p>
      <div className={css.taskItemText}>
        <div className={css.checkboxWrapper}>
          <input
            type="checkbox"
            checked={task.isDone}
            onChange={handleChange}
            className={css.taskItemCheckbox}
            id={`task-${task._id}`}
            aria-label={`Позначити завдання "${task.name}" як виконане`}
          />
          <svg className={css.checkMarkIcon} aria-hidden="true">
            <use href="/icons.svg#icon-checkbox" />
          </svg>
        </div>
        <p className={task.isDone ? css.textDone : ''}>{task.name}</p>
      </div>
    </li>
  );
}
