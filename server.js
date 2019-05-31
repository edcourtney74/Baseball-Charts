const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const PORT = process.env.PORT || 3001;

const app = express();

const SELECT_ALL_STATS_QUERY = 'SELECT * FROM stats ORDER BY team, week';

let connection = '';

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'fantasy_stats',
    port: '8889'
  });
}

connection.connect();

app.use(cors());

app.get('/api/stats', (req, res) => {
  connection.query(SELECT_ALL_STATS_QUERY, (err, results) => {
    if (err) {
      return res.send(err)
    }
    else {
      return res.json({
        results
      })
    }
  });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
});