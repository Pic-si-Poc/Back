const db = require('../db');

// GET: toate testele (istoric)
exports.getTeste = (req, res) => {
  db.all('SELECT * FROM test', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ teste: rows });
  });
};

// POST: salvează un test
exports.addTest = (req, res) => {
  const { id_test, denumire, nume_beneficiar, data_creare } = req.body;

  if (!id_test || !denumire) {
    return res.status(400).json({ error: 'Câmpuri obligatorii lipsă.' });
  }

  const sql = `
    INSERT INTO test (
      id_test, denumire, nume_beneficiar, data_creare
    ) VALUES (?, ?, ?, ?)
  `;

  db.run(sql, [id_test, denumire, nume_beneficiar, data_creare], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Test salvat', id: id_test });
  });
};
