import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

export const initDb = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Create Templates Table
      db.run(`
        CREATE TABLE IF NOT EXISTS templates (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          description TEXT,
          thumbnailUrl TEXT,
          baseColorTheme TEXT,
          daisyTheme TEXT,
          fontFamily TEXT,
          htmlContent TEXT
        )
      `);

      // Create User Websites Table
      db.run(`
        CREATE TABLE IF NOT EXISTS websites (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          templateId INTEGER,
          coupleNames TEXT,
          eventDate TEXT,
          venue TEXT,
          imageQuery TEXT,
          colorTheme TEXT,
          configJson TEXT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (templateId) REFERENCES templates (id)
        )
      `);

      // Create Occasions Table
      db.run(`
        CREATE TABLE IF NOT EXISTS occasions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT UNIQUE
        )
      `);

      // Create Occasion Images Table
      db.run(`
        CREATE TABLE IF NOT EXISTS occasion_images (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          occasion_id INTEGER,
          image_url TEXT,
          name TEXT,
          FOREIGN KEY (occasion_id) REFERENCES occasions (id) ON DELETE CASCADE
        )
      `);

      // Seed Logic
      db.get('SELECT COUNT(*) as count FROM templates', (err, row) => {
        if (row && row.count === 0) {
          const stmt = db.prepare('INSERT INTO templates (name, description, thumbnailUrl, baseColorTheme, daisyTheme, fontFamily, htmlContent) VALUES (?, ?, ?, ?, ?, ?, ?)');
          stmt.run('Royal Heritage', 'Classic red & gold.', 'https://picsum.photos/seed/royal/600/800', 'red', 'luxury', 'Playfair Display', 'ROYAL_HERITAGE');
          stmt.run('Emerald Palace', 'Rich forest greens.', 'https://picsum.photos/seed/emerald/600/800', 'emerald', 'forest', 'Cormorant Garamond', 'EMERALD_PALACE');
          stmt.run('Golden Sunrise', 'Warm amber glow.', 'https://picsum.photos/seed/gold/600/800', 'gold', 'bumblebee', 'Great Vibes', 'GOLDEN_SUNRISE');
          stmt.finalize();
        }

        db.get('SELECT COUNT(*) as count FROM occasions', (err, row) => {
          if (row && row.count === 0) {
            const occasions = ['Wedding', 'Birthday', 'Anniversary'];
            const stmt = db.prepare('INSERT INTO occasions (name) VALUES (?)');
            occasions.forEach(name => stmt.run(name));
            stmt.finalize(() => resolve());
          } else {
            resolve();
          }
        });
      });
    });
  });
};
