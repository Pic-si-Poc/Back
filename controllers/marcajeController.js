const db = require('../db');

// GET toate marcajele pentru un test
exports.getMarcaje = (req, res) => {
  const { id_exam } = req.params;

  const sql = `SELECT timestamp, tip FROM marcaje_timp WHERE id_exam = ? ORDER BY timestamp ASC`;

  db.all(sql, [id_exam], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ marcaje: rows });
  });
};

// POST: adaugă marcaj
exports.addMarcaj = (req, res) => {
  const { id_exam, timestamp, tip } = req.body;

  if (!id_exam || !timestamp || !tip) {
    return res.status(400).json({ error: 'Date lipsă pentru marcaj.' });
  }

  const query = `
    INSERT INTO marcaje_timp (id_exam, timestamp, tip)
    VALUES (?, ?, ?)
  `;

  db.run(query, [id_exam, timestamp, tip], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Marcaj adăugat cu succes' });
  });
};
