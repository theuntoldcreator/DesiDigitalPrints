import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

export const initDb = () => {
  db.serialize(() => {
    // Create Templates Table — now includes htmlContent for the full template
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

    // Seed Templates if empty
    db.get('SELECT COUNT(*) as count FROM templates', (err, row) => {
      if (row.count === 0) {
        const stmt = db.prepare('INSERT INTO templates (name, description, thumbnailUrl, baseColorTheme, daisyTheme, fontFamily, htmlContent) VALUES (?, ?, ?, ?, ?, ?, ?)');

        stmt.run(
          'Royal Heritage',
          'A grand, traditional dark red and gold aesthetic with elegant timeline layouts. Perfect for classic Indian weddings.',
          'https://picsum.photos/seed/royalheritage/600/800',
          'red', 'luxury', 'Playfair Display',
          'ROYAL_HERITAGE'
        );
        stmt.run(
          'Emerald Palace',
          'Rich emerald greens with a garden-palace vibe. Features a love story section and elegant event cards.',
          'https://picsum.photos/seed/emeraldpalace/600/800',
          'emerald', 'forest', 'Cormorant Garamond',
          'EMERALD_PALACE'
        );
        stmt.run(
          'Golden Sunrise',
          'Warm amber and golden hues with a sun-kissed glow. Ideal for haldi ceremonies and daytime celebrations.',
          'https://picsum.photos/seed/goldensunrise/600/800',
          'gold', 'bumblebee', 'Great Vibes',
          'GOLDEN_SUNRISE'
        );
        stmt.run(
          'Pink Blossom',
          'Soft pastels and romantic florals. A delicate, feminine design with charming photo grids.',
          'https://picsum.photos/seed/pinkblossom/600/800',
          'pink', 'cupcake', 'Libre Baskerville',
          'PINK_BLOSSOM'
        );
        stmt.run(
          'Midnight Luxe',
          'Sleek navy and silver with starfield effects. A modern, high-end black-tie design for evening ceremonies.',
          'https://picsum.photos/seed/midnightluxe/600/800',
          'royal', 'luxury', 'Bodoni Moda',
          'MIDNIGHT_LUXE'
        );

        stmt.finalize();
        console.log('Database seeded with 5 wedding templates.');
      }
    });
  });
};
