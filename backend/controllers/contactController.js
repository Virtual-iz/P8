import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10) || 587,
  secure: false,
  family: 4,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

/** Envoie l'email de contact via SMTP. */
const sendContactEmail = async ({ name, email, service, deadline, message }) => {
  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL,
    replyTo: email,
    subject: `Nouveau message de ${name} — ${service || 'prestation non précisée'}`,
    text: `
      Nom : ${name}
      Email : ${email}
      Prestation : ${service || 'non précisée'}
      Délai : ${deadline || 'non précisé'}

      Message :
      ${message}
    `.trim(),
  });
};

/** Contrôleur POST /api/contact — valide les champs et envoie l'email. */
export const sendMessage = async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    const err = new Error('Champs requis manquants');
    err.status = 400;
    return next(err);
  }

  try {
    await sendContactEmail(req.body);
    res.json({ message: 'Message envoyé avec succès' });
  } catch (err) {
    console.error('❌ Détail erreur SMTP :', err);
    const sendErr = new Error('Erreur lors de l\'envoi du message');
    sendErr.status = 500;
    next(sendErr);
  }
};
