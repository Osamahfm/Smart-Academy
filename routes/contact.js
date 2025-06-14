const express = require('express');
const router = express.Router();

router.post('/contact', async (req, res) => {
  console.log('contact triggered');

  try {
    const { name, email, subject, message } = req.body;

    console.log('New Contact Message:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Subject:', subject);
    console.log('Message:', message);

   if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please fill in all required fields.' });
    }

    return res.status(200).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Error in /contact:', err);
    return res.status(500).json({ error: 'An error occurred while sending the message. Please try again later.' });
  }
});

module.exports = router;
