import cron from 'node-cron';
import Task from '../models/Task.js';
import User from '../models/User.js';
import { sendTaskReminderEmail } from '../services/emailService.js';

// Run every minute (for testing purposes)
export const initCronJobs = () => {
  cron.schedule('* * * * *', async () => {
    console.log('Running task reminder cron job...');
    
    try {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);

      // Find tasks due within the next 24 hours that are not Done and haven't had a reminder sent
      const tasks = await Task.find({
        status: { $ne: 'Done' },
        completed: false,
        dueDate: { $gte: now, $lte: tomorrow },
        reminderSent: false
      });

      for (const task of tasks) {
        const user = await User.findById(task.user);
        if (user && user.email) {
          await sendTaskReminderEmail(user.email, task);
          
          // Mark reminder as sent
          task.reminderSent = true;
          await task.save();
        }
      }
    } catch (error) {
      console.error('Error in task cron job:', error);
    }
  });

  console.log('Cron jobs initialized.');
};
