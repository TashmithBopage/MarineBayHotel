const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
require('dotenv').config({ override: true });

const app = express();

// Allow requests from local development and deployed frontend hosts.
app.use(cors({
  origin: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

const hasPlaceholderCredentials = process.env.RESEND_API_KEY?.includes('your-resend-api-key');

const resendClient = process.env.RESEND_API_KEY && !hasPlaceholderCredentials
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

if (!resendClient) {
  console.warn('Email service is not configured. Set RESEND_API_KEY in backend/.env with your real Resend API key.');
} else {
  console.log('Resend email service is configured.');
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

  if (!resendClient) {
    return res.status(503).json({
      success: false,
      error: 'Email service is not configured. Please try again later.',
    });
  }

  try {
    const { data, error } = await resendClient.emails.send({
      from: 'Marine Bay Hotel <onboarding@resend.dev>',
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

    if (error) {
      console.error('Contact email could not be sent:', error.message);
      return res.status(502).json({
        success: false,
        error: 'We could not send your message right now. Please try again later.',
      });
    }

    console.log(`Contact email accepted by Resend: ${data.id}`);
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