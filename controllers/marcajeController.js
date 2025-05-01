const db = require('../db');

// GET: toate marcajele
exports.getMarcaje = (req, res) => {
  db.all('SELECT * FROM marcaje_timp', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ marcaje: rows });
  });
};

// POST: adaugă marcaj
exports.addMarcaj = (req, res) => {
  const { id_intr_exam, timestamp } = req.body;

  if (!id_intr_exam || !timestamp) {
    return res.status(400).json({ error: 'Câmpuri obligatorii lipsă.' });
  }

  const sql = `
    INSERT INTO marcaje_timp (id_intr_exam, timestamp)
    VALUES (?, ?)
  `;

  db.run(sql, [id_intr_exam, timestamp], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Marcaj adăugat', id: this.lastID });
  });
};
