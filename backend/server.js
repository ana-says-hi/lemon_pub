const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const { Pool } = require('pg');

const app = express();
const port = 5433;

app.use(cors());
app.use(bodyParser.json());

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'lemon_basket',
//   password: 'pass',
//   port: 5432,
// });

app.get('/api/peeps', async (req, res) => {
  try {
    // const result = await pool.query('SELECT * FROM peeps');
    res.json([]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
