const express = require('express');
const db = require('./db');

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.redirect('/login.html');
});

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ erreur: 'id invalide' });
  }

  try {
    const { rows } = await db.query('SELECT id, nom FROM users WHERE id = $1', [parseInt(id, 10)]);
    if (rows.length === 0) {
      return res.status(404).json({ erreur: 'introuvable' });
    }
    return res.json(rows[0]);
  } catch (err) {
    return res.status(500).json({ erreur: 'erreur serveur' });
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body || {};
  if (email === 'a@test.fr' && password === 'secret') {
    return res.status(200).json({ message: 'ok' });
  }
  return res.status(401).json({ erreur: 'non autorisé' });
});

module.exports = app;
