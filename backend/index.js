import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import sqlite3 from 'better-sqlite3';

dotenv.config();

const app = express();
const db = new sqlite3(path.join(process.cwd(), 'database.db'));

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS hiscores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(50) NOT NULL,
    floor_reached INTEGER NOT NULL,
    cards_earned INTEGER NOT NULL,
    animals_freed INTEGER NOT NULL,
    coins_earned INTEGER NOT NULL,
    dmg_dealt INTEGER NOT NULL,
    dmg_taken INTEGER NOT NULL,
    combats_lost INTEGER NOT NULL,
    left_clicks INTEGER NOT NULL
  )
`
).run();

app.use(express.json());

app.use((req, _, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.get('/hiscores', (req, res) => {
  const ipp = 25;

  const orderBy = req.query.orderBy || 'floor_reached';
  const page = req.query.page || 1;
  const offset = (page - 1) * 25;
  const hiscores = db.prepare(`SELECT * FROM hiscores ORDER BY ${orderBy} DESC LIMIT ${ipp + 1} OFFSET ${offset}`).all();
  const hasPreviousPage = page > 1;
  const hasNextPage = hiscores.length > ipp;

  res.json({ ipp, page, hasPreviousPage, hasNextPage, items: hiscores.slice(0, ipp) });
});

app.post('/hiscores', (req, res) => {
  const { name, floorReached, cardsEarned, animalsFreed, coinsEarned, dmgDealt, dmgTaken, combatsLost, leftClicks } = req.body;

  db.prepare(
    `
    INSERT INTO hiscores (name, floor_reached, cards_earned, animals_freed, coins_earned, dmg_dealt, dmg_taken, combats_lost, left_clicks)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `
  ).run(name, floorReached, cardsEarned, animalsFreed, coinsEarned, dmgDealt, dmgTaken, combatsLost, leftClicks);
  res.sendStatus(200);
});

app.listen(5000, () => {
  console.log('Server is running on port ' + 5000);
});
