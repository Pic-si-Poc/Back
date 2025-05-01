const db = require('../db');

// GET: toate întrebările din examinări
exports.getIntrebari = (req, res) => {
  db.all('SELECT * FROM intrebari_examen', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ intrebari: rows });
  });
};

// POST: adaugă întrebare în examen
exports.addIntrebare = (req, res) => {
  const {
    id_intr_exam, id_exam, text_intrebare,
    tip, start_citire, timp_raspuns, raspuns_sincer
  } = req.body;

  if (!id_intr_exam || !id_exam || !text_intrebare || !tip || raspuns_sincer === undefined) {
    return res.status(400).json({ error: 'Câmpuri obligatorii lipsă.' });
  }

  const sql = `
    INSERT INTO intrebari_examen (
      id_intr_exam, id_exam, text_intrebare, tip,
      start_citire, timp_raspuns, raspuns_sincer
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(sql, [
    id_intr_exam, id_exam, text_intrebare, tip,
    start_citire, timp_raspuns, raspuns_sincer
  ], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Întrebare adăugată cu succes', id: id_intr_exam });
  });
};
