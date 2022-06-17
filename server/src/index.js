require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const db = require('./db');

const api = require('./api');

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const app = express();

db.connect(DB_HOST);

app.use(express.json());
app.use(cors());
app.use(express.static("build"));

app.post('/api/shifts', api.shift.post);
app.get('/api/shifts/:id', api.shift.get);
app.delete('/api/shifts', api.shift.delete);
app.get('/', (req, res) => {
  res.sendFile(path.join("index.html"));
});

app.listen({ port },
  () => {
    console.log(`Express Server running at http://localhost:${port}`);
  }
);