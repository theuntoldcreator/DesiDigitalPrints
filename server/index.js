import express from 'express';
import cors from 'cors';
import { db, initDb } from './db.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Initialize SQLite tables and seed templates
initDb();

// Get all predefined templates
app.get('/api/templates', (req, res) => {
  db.all('SELECT * FROM templates', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Save a user's customized website
app.post('/api/websites', (req, res) => {
  const { templateId, coupleNames, eventDate, venue, imageQuery, colorTheme, configJson } = req.body;
  const insertSql = `
    INSERT INTO websites (templateId, coupleNames, eventDate, venue, imageQuery, colorTheme, configJson) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.run(insertSql, [templateId, coupleNames, eventDate, venue, imageQuery, colorTheme, configJson], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID, message: 'Website saved successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});
