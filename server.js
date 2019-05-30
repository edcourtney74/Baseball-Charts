const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_STATS_QUERY = 'SELECT * FROM stats ORDER BY team, week';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'fantasy_stats',
  port: '8889'
});

connection.connect();

app.use(cors());

app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/stats', (req, res) => {
  connection.query(SELECT_ALL_STATS_QUERY, (err, results) => {
    if (err) {
      return res.send(err)
    }
    else {
      return res.json({
        data: results
      })
    }
  });
});

app.listen(3001, () => {
  console.log("Listening on 3001")
});