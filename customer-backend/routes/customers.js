const express = require('express');
const router = express.Router();

// Create a new customer
router.post('/', (req, res) => {
  const { firstName, lastName, phone, email, address } = req.body;
  const db = req.db;
  const query = `INSERT INTO customers (firstName, lastName, phone, email, address) VALUES (?, ?, ?, ?, ?)`;

  db.run(query, [firstName, lastName, phone, email, address], function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: 'Customer created', id: this.lastID });
  });
});

// Get customers with pagination
router.get('/', (req, res) => {
  const db = req.db;
  const limit = parseInt(req.query.limit) || 5;
  const offset = parseInt(req.query.offset) || 0;

  db.get(`SELECT COUNT(*) as total FROM customers`, [], (err, result) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    const totalCustomers = result.total;

    db.all(`SELECT * FROM customers LIMIT ? OFFSET ?`, [limit, offset], (err, rows) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.json({
        customers: rows,
        totalCustomers,
        totalPages: Math.ceil(totalCustomers / limit),
        currentPage: offset / limit + 1,
      });
    });
  });
});

// Update a customer by ID
router.put('/:id', (req, res) => {
  const { firstName, lastName, phone, email, address } = req.body;
  const db = req.db;
  const query = `UPDATE customers SET firstName = ?, lastName = ?, phone = ?, email = ?, address = ? WHERE id = ?`;

  db.run(query, [firstName, lastName, phone, email, address, req.params.id], function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: 'Customer updated' });
  });
});

// Delete a customer by ID
router.delete('/:id', (req, res) => {
  const db = req.db;
  db.run(`DELETE FROM customers WHERE id = ?`, req.params.id, function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: 'Customer deleted' });
  });
});

module.exports = router;
