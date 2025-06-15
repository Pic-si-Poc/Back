const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const persoaneRoutes = require('./routes/persoane');
app.use('/api/persoane', persoaneRoutes);


const utilizatoriRoutes = require('./routes/utilizatori');
app.use('/api/utilizatori', utilizatoriRoutes);

const examinareRoutes = require('./routes/examinare');
app.use('/api/examinare', examinareRoutes);

const marcajeRoutes = require('./routes/marcaje');
app.use('/api/marcaje', marcajeRoutes);

const dateRoutes = require('./routes/date');
app.use('/api/date', dateRoutes);

const testRoutes = require('./routes/test');
app.use('/api/test', testRoutes);


// Test route
app.get('/', (req, res) => {
    res.send(' Backend-ul este activ!');
});

app.get('/api/test-db', (req, res) => {
  db.all("SELECT name FROM sqlite_master WHERE type='table'", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ tabele: rows });
    }
  });
});

app.get('/api/structura-tabele', (req, res) => {
  const tabele = ['utilizatori', 'persoane', 'test', 'examinare', 'intrebari_examen', 'marcaje'];
  const rezultat = {};

  let ramase = tabele.length;

  tabele.forEach((numeTabel) => {
    db.all(`PRAGMA table_info(${numeTabel})`, [], (err, rows) => {
      if (err) {
        rezultat[numeTabel] = { error: err.message };
      } else {
        rezultat[numeTabel] = rows;
      }

      ramase--;
      if (ramase === 0) {
        res.json(rezultat);
      }
    });
  });
});



// Pornire server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(` Server pornit la adresa http://localhost:${PORT}`);
});
