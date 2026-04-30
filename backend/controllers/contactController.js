import nodemailer from 'nodemailer';

/**
 * Configuration du transporteur SMTP pour l'envoi d'emails.
 * Utilise les variables d'environnement pour les identifiants.
 */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10) || 587,
  secure: false, // STARTTLS sera utilisé
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    // Ne rejette pas les certificats auto-signés (utile pour les serveurs locaux)
    rejectUnauthorized: false
  }
});

/**
 * Fonction pour envoyer un email de contact.
 * @param {Object} contactData - Données du formulaire de contact
 */
const sendContactEmail = async (contactData) => {
  const { name, email, service, deadline, message } = contactData;

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

/**
 * Contrôleur pour gérer l'envoi d'un message via le formulaire.
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @param {Function} next - Middleware suivant
 */
export const sendMessage = async (req, res, next) => {
  const { name, email, message } = req.body;

  // Vérifie que les champs obligatoires sont présents
  if (!name || !email || !message) {
    const err = new Error('Champs requis manquants');
    err.status = 400;
    return next(err);
  }

  try {
    await sendContactEmail(req.body);
    res.json({ message: 'Message envoyé avec succès' });
  } catch (err) {
    err.status = 500;
    err.message = 'Erreur lors de l\'envoi du message';
    next(err);
  }
};