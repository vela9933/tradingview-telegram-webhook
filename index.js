const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const TELEGRAM_TOKEN = '7267473734:AAFsLXcefbUWshzZUqBWgJ2LHxLw-Vfnehw';
  const CHAT_ID = '7621674494';

  // POST 요청만 허용
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const body = req.body;
  const message = body.message || '메시지가 없습니다.';

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      })
    });

    const result = await response.json();
    res.status(200).json({ ok: true, telegramResponse: result });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
};
