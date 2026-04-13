import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { db, initDb } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
// Serve uploads folder as static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Initialize SQLite tables and seed data
initDb();

// --- Template Routes ---
app.get('/api/templates', (req, res) => {
  db.all('SELECT * FROM templates', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/websites', (req, res) => {
  const { templateId, coupleNames, eventDate, venue, imageQuery, colorTheme, configJson } = req.body;
  const insertSql = `
    INSERT INTO websites (templateId, coupleNames, eventDate, venue, imageQuery, colorTheme, configJson) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.run(insertSql, [templateId, coupleNames, eventDate, venue, imageQuery, colorTheme, configJson], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, message: 'Website saved successfully' });
  });
});

// --- Occasion Routes ---
app.get('/api/occasions', (req, res) => {
  db.all('SELECT * FROM occasions', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/occasions/:id/images', (req, res) => {
  db.all('SELECT * FROM occasion_images WHERE occasion_id = ?', [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// --- Image Upload Setup ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

app.post('/api/occasions/:id/images', upload.single('image'), (req, res) => {
  const { name } = req.body;
  const occasionId = req.params.id;
  const imageUrl = `/uploads/${req.file.filename}`;

  db.run('INSERT INTO occasion_images (occasion_id, image_url, name) VALUES (?, ?, ?)', [occasionId, imageUrl, name], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, imageUrl, name });
  });
});

app.delete('/api/occasions/images/:id', (req, res) => {
  db.run('DELETE FROM occasion_images WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Image deleted' });
  });
});

app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});
