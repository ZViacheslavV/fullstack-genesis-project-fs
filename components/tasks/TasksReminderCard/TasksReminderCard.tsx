import { Toaster } from 'react-hot-toast';
import TaskReminderCardClientPage from './TasksReminderCard.client';
import css from './TasksReminderCard.module.css';
import CreateTaskWidget from '../CreateTaskWidget/CreateTaskWidget';

//===============================================================

function TasksReminderCard() {
  return (
    <>
      <div className={css.taskCard}>
        <div className={css.taskCardHeader}>
          <h3 className={css.taskCardTitle}>Важливі завдання</h3>
          <CreateTaskWidget />
        </div>
        <TaskReminderCardClientPage />
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </>
  );
}

export default TasksReminderCard;
