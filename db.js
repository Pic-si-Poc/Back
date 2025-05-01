const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

const dbPath = path.resolve(__dirname, process.env.DB_FILE);

// Creează/Deschide baza de date
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error(' Eroare conectare baza de date:', err.message);
    } else {
        console.log('Conexiune reușită la baza de date!');
    }
});

// Creare automată a tabelelor
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS utilizatori (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            parola TEXT NOT NULL,
            data_creare TEXT,
            activ INTEGER,
            drepturi_admin INTEGER
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS persoane (
            id_pers TEXT PRIMARY KEY,
            nume TEXT NOT NULL,
            prenume TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            nr_tel TEXT,
            cnp TEXT,
            data_creare TEXT,
            data_nastere TEXT,
            pers_fizica INTEGER
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS test (
            id_test TEXT PRIMARY KEY,
            denumire TEXT NOT NULL,
            id_beneficiar TEXT,
            standard INTEGER,
            data_creare TEXT,
            FOREIGN KEY (id_beneficiar) REFERENCES persoane(id_pers)
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS examinare (
            id_exam TEXT PRIMARY KEY,
            id_examinat TEXT,
            id_beneficiar TEXT,
            id_test TEXT,
            data_start TEXT,
            data_end TEXT,
            FOREIGN KEY (id_examinat) REFERENCES persoane(id_pers),
            FOREIGN KEY (id_beneficiar) REFERENCES persoane(id_pers),
            FOREIGN KEY (id_test) REFERENCES test(id_test)
        )
    `);

    db.run(`DROP TABLE IF EXISTS intrebari_examen`);
db.run(`
    CREATE TABLE IF NOT EXISTS intrebari_examen (
        id_intr_exam TEXT PRIMARY KEY,
        id_exam TEXT NOT NULL,
        id_intrebare TEXT NOT NULL,
        start_citire TEXT,
        raspuns INTEGER,
        timp_raspuns TEXT,
        adevarat INTEGER,
        FOREIGN KEY (id_exam) REFERENCES examinare(id_exam)
    )
`);


    db.run(`
        CREATE TABLE IF NOT EXISTS marcaje (
            id_marcaj INTEGER PRIMARY KEY AUTOINCREMENT,
            id_intr_exam TEXT NOT NULL,
            timestamp TEXT NOT NULL,
            FOREIGN KEY (id_intr_exam) REFERENCES intrebari_examen(id_intr_exam)
        )
    `);

    console.log('Tabele verificate / create cu succes.');
});

module.exports = db;
