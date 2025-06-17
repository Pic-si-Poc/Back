const db = require('../db');
const bcrypt = require('bcrypt');

// REGISTER
exports.register = async (req, res) => {
  const { email, parola } = req.body;

  if (!email || !parola) {
    return res.status(400).json({ error: 'Email și parola sunt necesare' });
  }

  try {
    const hashedPassword = await bcrypt.hash(parola, 10);
    const sql = `INSERT INTO utilizatori (email, parola) VALUES (?, ?)`;
    db.run(sql, [email, hashedPassword], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Cont creat cu succes!' });
    });
  } catch (err) {
    res.status(500).json({ error: 'Eroare la hashare parolă' });
  }
};

// LOGIN
exports.login = (req, res) => {
  const { email, parola } = req.body;

  if (!email || !parola) {
    return res.status(400).json({ error: 'Email și parola sunt necesare' });
  }

  const sql = `SELECT * FROM utilizatori WHERE email = ?`;
  db.get(sql, [email], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(404).json({ error: 'Utilizatorul nu există' });

    bcrypt.compare(parola, user.parola, (err, result) => {
      if (err) return res.status(500).json({ error: 'Eroare la comparare parolă' });
      if (!result) return res.status(401).json({ error: 'Parolă incorectă' });

      // Salvăm sesiunea
      req.session.user = { id: user.id_utilizator, email: user.email };
      res.json({ message: 'Autentificat cu succes', user: req.session.user });
    });
  });
};
