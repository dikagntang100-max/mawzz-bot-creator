export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).send("Mawzz Bot Creator aktif!");
  }

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const update = req.body;
  const message = update?.message;

  if (!message?.text) {
    return res.status(200).json({ ok: true });
  }

  const chatId = message.chat.id;
  const text = message.text.trim();

  let reply = "";

  if (text === "/start") {
    reply = `🤖 Selamat datang di Mawzz Bot Creator!

Saya membantu kamu mengelola konfigurasi bot Telegram.

Perintah:
/help - Bantuan
/createbot - Membuat konfigurasi bot
/mybots - Melihat daftar bot`;
  } else if (text === "/help") {
    reply = "📚 Bantuan Mawzz Bot Creator\n\n/createbot - Mulai membuat bot\n/mybots - Daftar bot";
  } else if (text === "/createbot") {
    reply = `🤖 Membuat bot baru

1. Buka @BotFather
2. Kirim /newbot
3. Ikuti instruksi BotFather
4. Simpan token bot kamu dengan aman.

Token baru hanya dapat diterbitkan oleh BotFather resmi.`;
  } else if (text === "/mybots") {
    reply = "📦 Fitur daftar bot akan kita hubungkan ke Supabase pada langkah berikutnya.";
  }

  if (reply) {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: reply
      })
    });
  }

  return res.status(200).json({ ok: true });
}
