import { Toaster } from 'react-hot-toast';
import { AddTaskForm, TasksReminderCard } from './components';

const Home = () => (
  <>
    <div>
      <h1>GreetingBlock</h1>
      <h1>StatusBlock</h1>
      <h1>BabyToday</h1>
      <h1>MomTipCard</h1>
    </div>
    <div>
      <AddTaskForm />
      <TasksReminderCard />
      <Toaster position="top-right" reverseOrder={false} />
      <h1>FillingCheck</h1>
    </div>
  </>
);

export default Home;
