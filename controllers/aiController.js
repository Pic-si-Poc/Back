const db = require('../db');

const saveAiSample = (req, res) => {
  const {
    id_exam,
    start_time,
    end_time,
    label,
    ecg_data,
    emg_data,
    temp_data,
    humidity_data
  } = req.body;

  if (!id_exam || !start_time || !end_time || !label || !ecg_data || !emg_data || !temp_data || !humidity_data) {
    return res.status(400).json({ error: 'Date incomplete primite.' });
  }

  const insert = `
    INSERT INTO ai_samples (
      id_exam, start_time, end_time, label,
      ecg_data, emg_data, temp_data, humidity_data
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(insert, [
    id_exam,
    start_time,
    end_time,
    label,
    JSON.stringify(ecg_data),
    JSON.stringify(emg_data),
    JSON.stringify(temp_data),
    JSON.stringify(humidity_data)
  ], function(err) {
    if (err) {
      console.error('Eroare inserare ai_sample:', err);
      return res.status(500).json({ error: 'Eroare la salvarea datelor AI.' });
    }
    res.status(200).json({ message: 'Secțiune AI salvată cu succes.' });
  });
};

module.exports = {
  saveAiSample
};
