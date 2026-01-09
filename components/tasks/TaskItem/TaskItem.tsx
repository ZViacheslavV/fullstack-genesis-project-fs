import { updateTaskStatus } from '@/lib/api/clientApi';
import { Task } from '@/types/task';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import css from './TaskItem.module.css';

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateTaskStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task'] });
    },
    onError: () => {
      toast.error('Failed to update task');
    },
  });

  const handleChange = () => {
    mutate({ id: task._id, isDone: !task.isDone });
  };

  return (
    <li className={task.isDone ? 'done-style' : ''}>
      <p className={css.taskItemDate}>{task.date}</p>
      <div className={css.taskItemText}>
        <div className={css.checkboxWrapper}>
          <input
            type="checkbox"
            checked={task.isDone}
            onChange={handleChange}
            disabled={isPending}
            className={css.taskItemCheckbox}
            id={`task-${task._id}`}
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
