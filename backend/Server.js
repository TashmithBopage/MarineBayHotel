const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config({ override: true });

const app = express();

// Allow requests from the React dev server and production build
app.use(cors({
  origin: (origin, callback) => {
    const isLocalOrigin = !origin || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
    callback(null, isLocalOrigin);
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

const hasPlaceholderCredentials = [process.env.SMTP_USER, process.env.SMTP_PASS, process.env.SMTP_FROM]
  .some((value) => value?.includes('your-gmail-') || value?.includes('your-16-character'));

const mailTransporter = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && !hasPlaceholderCredentials
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  : null;

if (!mailTransporter) {
  console.warn(hasPlaceholderCredentials
    ? 'Email service is not configured. Replace the example SMTP values in backend/.env with your real Gmail address and App Password.'
    : 'Email service is not configured. Create backend/.env using backend/.env.example.');
} else {
  mailTransporter.verify()
    .then(() => console.log('SMTP email service is ready.'))
    .catch((error) => console.error('SMTP configuration error:', error.message));
}

// ─── Health Check ──────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'Marine Bay Hotel backend is running' });
});

// ─── Contact Form Submission ───────────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Name, email and message are required.' });
  }

  if (!mailTransporter) {
    return res.status(503).json({
      success: false,
      error: 'Email service is not configured. Please try again later.',
    });
  }

  try {
    const deliveryInfo = await mailTransporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: 'mesithb@gmail.com',
      replyTo: email,
      subject: `New Marine Bay Hotel inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || 'Not provided'}`,
        '',
        message,
      ].join('\n'),
    });
    console.log(`Contact email accepted by SMTP: ${deliveryInfo.messageId}`);
  } catch (mailError) {
    console.error('Contact email could not be sent:', mailError.message);
    return res.status(502).json({
      success: false,
      error: 'We could not send your message right now. Please try again later.',
    });
  }

  return res.json({
    success: true,
    message: `Thank you, ${name}! Your inquiry has been received. Our concierge will contact you shortly.`,
  });
});

// ─── Room Booking Submission ───────────────────────────────────────────────────
app.post('/api/book', (req, res) => {
  const { roomName, price, date, mealPlans, guestName, guestEmail, guestPhone } = req.body;

  if (!roomName || !guestName || !guestEmail) {
    return res.status(400).json({ success: false, error: 'Room, guest name and email are required.' });
  }

  // Log the booking (replace with DB/email integration as needed)
  console.log('─── New Room Booking ──────────────────────────');
  console.log(`Room       : ${roomName} (${price})`);
  console.log(`Date       : ${date || 'Not specified'}`);
  console.log(`Meal Plans : ${mealPlans || 'Room Only'}`);
  console.log(`Guest Name : ${guestName}`);
  console.log(`Guest Email: ${guestEmail}`);
  console.log(`Guest Phone: ${guestPhone || 'Not provided'}`);
  console.log('───────────────────────────────────────────────');

  const confirmationNumber = 'MBH-' + Date.now().toString().slice(-6).toUpperCase();

  return res.json({
    success: true,
    confirmationNumber,
    message: `Booking confirmed! Confirmation #${confirmationNumber}. We look forward to welcoming you to Marine Bay Hotel.`,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Marine Bay Hotel backend running on port ${PORT}`));
