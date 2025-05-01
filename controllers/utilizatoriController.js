const db = require('../db');

// GET toți utilizatorii
exports.getUtilizatori = (req, res) => {
  db.all('SELECT * FROM utilizatori', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ utilizatori: rows });
  });
};

// POST adaugă un utilizator nou
exports.addUtilizator = (req, res) => {
  const { email, parola } = req.body;

  if (!email || !parola) {
    return res.status(400).json({ error: 'Email și parola sunt obligatorii.' });
  }

  const sql = `INSERT INTO utilizatori (email, parola) VALUES (?, ?)`;
  db.run(sql, [email, parola], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Utilizator adăugat cu succes', id: this.lastID });
  });
};
