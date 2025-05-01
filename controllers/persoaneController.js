const db = require('../db');

// GET /api/persoane
exports.getPersoane = (req, res) => {
    const sql = 'SELECT * FROM persoane';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ persoane: rows });
    });
};

// POST /api/persoane
exports.addPersoana = (req, res) => {
    const {
        id_pers, nume, prenume, email,
        nr_tel, cnp, data_creare, data_nastere, pers_fizica
    } = req.body;

    const sql = `
        INSERT INTO persoane (
            id_pers, nume, prenume, email, nr_tel, cnp,
            data_creare, data_nastere, pers_fizica
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        id_pers, nume, prenume, email,
        nr_tel, cnp, data_creare, data_nastere, pers_fizica
    ];

    db.run(sql, values, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Persoană adăugată cu succes', id: id_pers });
    });
};
