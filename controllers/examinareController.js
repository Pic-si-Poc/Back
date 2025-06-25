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

// GET: rezultate test cu detalii despre persoană
const getRezultate = (req, res) => {
  const sql = `
    SELECT e.id_exam, p.nume, p.prenume, e.nume_beneficiar, e.data_start AS dataTestare
    FROM examinare e
    JOIN persoane p ON e.id_examinat = p.id_pers
    ORDER BY e.data_start DESC
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Eroare la preluarea rezultatelor:', err.message); // important!
      return res.status(500).json({ error: 'Eroare server la preluare rezultate.' });
    }
    res.json({ rezultate: rows });
  });
};

// GET: statistici pentru pagină
const getStatistici = (req, res) => {
  const sql = `
    SELECT e.id_exam, p.nume, e.nume_beneficiar AS beneficiar, date(e.data_start) AS data,
           SUM(CASE WHEN m.tip = 'Sincer' THEN 1 ELSE 0 END) AS sincer,
           SUM(CASE WHEN m.tip = 'Nesincer' THEN 1 ELSE 0 END) AS nesincer,
           SUM(CASE WHEN m.tip = 'Control' THEN 1 ELSE 0 END) AS control
    FROM examinare e
    JOIN persoane p ON p.id_pers = e.id_examinat
    LEFT JOIN marcaje_timp m ON m.id_exam = e.id_exam
    GROUP BY e.id_exam
    ORDER BY e.data_start DESC
  `;

  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ statistici: rows });
  });
};

// DELETE: șterge o examinare + datele asociate
const deleteExaminare = (req, res) => {
  const { id_exam } = req.params;

  if (!id_exam) return res.status(400).json({ error: 'ID test lipsă.' });

  db.serialize(() => {
    db.run('DELETE FROM date_fiziologice WHERE id_exam = ?', [id_exam], function (err) {
      if (err) return res.status(500).json({ error: 'Eroare la ștergerea datelor fiziologice.' });
    });

    db.run('DELETE FROM marcaje_timp WHERE id_exam = ?', [id_exam], function (err) {
      if (err) return res.status(500).json({ error: 'Eroare la ștergerea marcajelor.' });
    });

    db.run('DELETE FROM examinare WHERE id_exam = ?', [id_exam], function (err) {
      if (err) return res.status(500).json({ error: 'Eroare la ștergerea examinării.' });
      res.json({ message: 'Testul a fost șters cu tot cu date asociate.' });
    });
  });
};


module.exports = {
  getExam,
  addExam,
  startExaminare,
  getRezultate,
  getStatistici,
  deleteExaminare,
};

