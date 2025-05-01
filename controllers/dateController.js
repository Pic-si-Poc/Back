const db = require('../db');

// GET: toate valorile
exports.getDate = (req, res) => {
  db.all('SELECT * FROM date_fiziologice', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ date: rows });
  });
};

// POST: adaugă un set de date
exports.addDate = (req, res) => {
  const { id_exam, timestamp, valoare_emg, valoare_ecg, valoare_umiditate } = req.body;

  if (!id_exam || !timestamp) {
    return res.status(400).json({ error: 'id_exam și timestamp sunt obligatorii.' });
  }

  const sql = `
    INSERT INTO date_fiziologice (
      id_exam, timestamp, valoare_emg, valoare_ecg, valoare_umiditate
    ) VALUES (?, ?, ?, ?, ?)
  `;

  db.run(sql, [
    id_exam, timestamp, valoare_emg, valoare_ecg, valoare_umiditate
  ], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Valori înregistrate', id: this.lastID });
  });
};
