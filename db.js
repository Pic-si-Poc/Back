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
    // DROP tabele în ordinea corectă (inversează dependențele)
    
   /**db.run(`DROP TABLE IF EXISTS marcaje_timp`);
    db.run(`DROP TABLE IF EXISTS date_fiziologice`);
    db.run(`DROP TABLE IF EXISTS examinare`);
    db.run(`DROP TABLE IF EXISTS test`);
    db.run(`DROP TABLE IF EXISTS persoane`);
    db.run(`DROP TABLE IF EXISTS utilizatori`);
    

    // TABEL: utilizatori
    db.run(`
      CREATE TABLE IF NOT EXISTS utilizatori (
        id_utilizator INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        parola TEXT NOT NULL
      )
    `);

    // TABEL: persoane
    db.run(`
      CREATE TABLE IF NOT EXISTS persoane (
        id_pers TEXT PRIMARY KEY,
        nume TEXT NOT NULL,
        prenume TEXT NOT NULL,
        email TEXT,
        nr_tel TEXT NOT NULL,
        cnp TEXT NOT NULL,
        data_nastere TEXT NOT NULL
      )
    `);

    // TABEL: examinare
    db.run(`
      CREATE TABLE IF NOT EXISTS examinare (
        id_exam TEXT PRIMARY KEY,
        id_examinat TEXT NOT NULL,
        nume_beneficiar TEXT,
        data_start TEXT NOT NULL,
        data_end TEXT NOT NULL,
        FOREIGN KEY (id_examinat) REFERENCES persoane(id_pers)
      )
    `);

    // TABEL: test (istoric, salvat după finalizare)
    db.run(`
      CREATE TABLE IF NOT EXISTS test (
        id_test TEXT PRIMARY KEY,
        denumire TEXT NOT NULL,
        nume_beneficiar TEXT,
        data_creare TEXT
      )
    `);

    // TABEL: marcaje_timp (modificat pentru a conține id_exam și tip)
    db.run(`
      CREATE TABLE IF NOT EXISTS marcaje_timp (
        id_marcaj INTEGER PRIMARY KEY AUTOINCREMENT,
        id_exam TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        tip TEXT NOT NULL,
        FOREIGN KEY (id_exam) REFERENCES examinare(id_exam)
      )
    `);

    // TABEL: date_fiziologice
    db.run(`
      CREATE TABLE IF NOT EXISTS date_fiziologice (
        id_data INTEGER PRIMARY KEY AUTOINCREMENT,
        id_exam TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        valoare_emg REAL,
        valoare_ecg REAL,
        valoare_umiditate REAL,
        FOREIGN KEY (id_exam) REFERENCES examinare(id_exam)
      )
    `);

    console.log("Tabelele au fost recreate complet.");*/
});

module.exports = db;
