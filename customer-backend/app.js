const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const customersRouter = require('./routes/customers');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error('Could not connect to the in-memory database', err);
  } else {
    console.log('Connected to in-memory SQLite database');
    
    db.run(`
      CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT NOT NULL,
        address TEXT
      )
    `, (err) => {
      if (err) {
        console.error('Error creating customers table', err);
      } else {
        console.log('Customers table created');
      }
    });
  }
});

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use('/customers', customersRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
