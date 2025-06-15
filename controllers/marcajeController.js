const db = require('../db');

// POST: Adaugă un marcaj de timp
exports.addMarcaj = (req, res) => {
  const { id_intr_exam, timestamp } = req.body;

  if (!id_intr_exam || !timestamp) {
    return res.status(400).json({ error: 'Date lipsă pentru marcaj.' });
  }

  const query = `
    INSERT INTO marcaje_timp (id_intr_exam, timestamp)
    VALUES (?, ?)
  `;

  db.run(query, [id_intr_exam, timestamp], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Marcaj adăugat cu succes' });
  });
};
