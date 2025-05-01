const db = require('../db');

// GET: toate examinările
exports.getExam = (req, res) => {
  db.all('SELECT * FROM examinare', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ examinari: rows });
  });
};

// POST: adaugă o examinare
exports.addExam = (req, res) => {
  const { id_exam, id_examinat, nume_beneficiar, data_start, data_end } = req.body;

  if (!id_exam || !id_examinat || !data_start || !data_end) {
    return res.status(400).json({ error: 'Câmpuri obligatorii lipsă.' });
  }

  const sql = `
    INSERT INTO examinare (id_exam, id_examinat, nume_beneficiar, data_start, data_end)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(sql, [id_exam, id_examinat, nume_beneficiar, data_start, data_end], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Examinare adăugată cu succes', id: id_exam });
  });
};
