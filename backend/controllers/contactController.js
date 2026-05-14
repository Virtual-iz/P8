import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/** Envoie l'email de contact via Resend. */
const sendContactEmail = async ({ name, email, service, deadline, message }) => {
  await resend.emails.send({
    from: 'Portfolio Contact <onboarding@resend.dev>',
    to: process.env.CONTACT_EMAIL,
    reply_to: email,
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
    console.error('❌ Détail erreur Resend :', err);
    const sendErr = new Error('Erreur lors de l\'envoi du message');
    sendErr.status = 500;
    next(sendErr);
  }
};
