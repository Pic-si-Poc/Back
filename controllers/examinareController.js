const { v4: uuidv4 } = require('uuid');
const db = require('../db');

// GET: toate examinările
const getExam = (req, res) => {
  db.all('SELECT * FROM examinare', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ examinari: rows });
  });
};

// POST: adaugă o examinare
const addExam = (req, res) => {
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

// POST: startExaminare – generează ID și dată automat
const startExaminare = (req, res) => {
  const { id_examinat, nume_beneficiar } = req.body;
  const id_exam = uuidv4();
  const data_start = new Date().toISOString();

  const query = `
    INSERT INTO examinare (id_exam, id_examinat, nume_beneficiar, data_start, data_end)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(query, [id_exam, id_examinat, nume_beneficiar, data_start, data_start], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id_exam });
  });
};

module.exports = {
  getExam,
  addExam,
  startExaminare,
};
