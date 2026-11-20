async function envoyer(email, message) {
  throw new Error('SMTP non configuré');
}

module.exports = { envoyer };
