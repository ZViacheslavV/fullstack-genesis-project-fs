'use client';

import { Toaster } from 'react-hot-toast';
import TaskReminderCardClientPage from './TasksReminderCard.client';
import css from './TasksReminderCard.module.css';

//===============================================================

function TasksReminderCard() {
  return (
    <>
      <TaskReminderCardClientPage />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default TasksReminderCard;
