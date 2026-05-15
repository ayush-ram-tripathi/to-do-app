import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Create a transporter using SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendTaskReminderEmail = async (userEmail, task) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('EMAIL_USER or EMAIL_PASS not set in .env. Skipping email reminder for:', task.title);
    return;
  }

  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Todo App" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `Reminder: Task "${task.title}" is due soon!`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #6b21a8;">Task Reminder</h2>
          <p>Hello,</p>
          <p>This is a reminder that your task <strong>"${task.title}"</strong> is due soon.</p>
          ${task.description ? `<p><strong>Description:</strong> ${task.description}</p>` : ''}
          ${task.dueDate ? `<p><strong>Due Date:</strong> ${new Date(task.dueDate).toLocaleDateString()}</p>` : ''}
          <br/>
          <p>Please log in to your Todo App to manage it.</p>
          <p>Best,<br>Your Todo App Team</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Reminder email sent to ${userEmail}: ${info.messageId}`);
  } catch (error) {
    console.error('Error sending reminder email:', error);
  }
};
