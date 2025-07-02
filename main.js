const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN';
const CHAT_ID = 'YOUR_CHAT_ID';
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

app.use(bodyParser.json());

app.post('/', async (req, res) => {
  const alertMessage = req.body.message || '🚨 알림이 도착했습니다';
  try {
    await axios.post(TELEGRAM_API, {
      chat_id: CHAT_ID,
      text: alertMessage,
    });
    res.status(200).send('Message sent');
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send('Error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});