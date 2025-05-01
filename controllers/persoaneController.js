const db = require('../db');

// GET: listare persoane
exports.getPersoane = (req, res) => {
  db.all('SELECT * FROM persoane', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ persoane: rows });
  });
};

// POST: adăugare persoană
exports.addPersoana = (req, res) => {
  const {
    id_pers, nume, prenume, email,
    nr_tel, cnp, data_nastere
  } = req.body;

  if (!id_pers || !nume || !prenume || !nr_tel || !cnp || !data_nastere) {
    return res.status(400).json({ error: 'Toate câmpurile obligatorii trebuie completate.' });
  }

  const sql = `
    INSERT INTO persoane (
      id_pers, nume, prenume, email,
      nr_tel, cnp, data_nastere
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [id_pers, nume, prenume, email, nr_tel, cnp, data_nastere];

  db.run(sql, values, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Persoană adăugată cu succes', id: id_pers });
  });
};
