import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ALLOWED_SERVICES  = ['web', 'photo', 'video', 'design'];
const ALLOWED_DEADLINES = ['unknown', '1week', '2weeks', '1month', 'more'];

/** Envoie l'email de contact via Resend. */
const sendContactEmail = async ({ name, email, service, deadline, message }) => {
  await resend.emails.send({
    from: 'Portfolio Contact <contact@virtual-iz.fr>',
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
  const name    = req.body.name?.trim();
  const email   = req.body.email?.trim();
  const message = req.body.message?.trim();
  const service  = req.body.service  || '';
  const deadline = req.body.deadline || '';

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Champs requis manquants' });
  }

  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ message: 'Adresse email invalide' });
  }

  if (name.length > 100 || email.length > 254 || message.length > 2000) {
    return res.status(400).json({ message: 'Un ou plusieurs champs dépassent la longueur autorisée' });
  }

  if (service  && !ALLOWED_SERVICES.includes(service)) {
    return res.status(400).json({ message: 'Prestation invalide' });
  }

  if (deadline && !ALLOWED_DEADLINES.includes(deadline)) {
    return res.status(400).json({ message: 'Délai invalide' });
  }

  try {
    await sendContactEmail({ name, email, service, deadline, message });
    res.json({ message: 'Message envoyé avec succès' });
  } catch (err) {
    console.error('❌ Détail erreur Resend :', err);
    const sendErr = new Error("Erreur lors de l'envoi du message");
    sendErr.status = 500;
    next(sendErr);
  }
};
