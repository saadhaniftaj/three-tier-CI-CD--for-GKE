const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 8080;

app.get('/api/data', async (req, res) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'mysql-service',
      user: 'root',
      password: process.env.DB_PASSWORD || 'my-secret-pw',
      database: 'myapp'
    });
    const [rows] = await connection.execute('SELECT * FROM items');
    res.json(rows);
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
