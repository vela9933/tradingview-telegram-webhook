export default async function handler(req, res) {
  const TELEGRAM_TOKEN = '7267473734:AAFsLXcefbUWshzZUqBWgJ2LHxLw-Vfnehw';
  const CHAT_ID = '7621674494';

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  try {
    const body = await req.json?.() ?? req.body; // Vercel에서 json() 또는 body 중 하나 대응
    const message = body.message || '메시지가 없습니다.';

    const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      })
    });

    const result = await telegramResponse.json();
    return res.status(200).json({ ok: true, telegramResponse: result });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}
