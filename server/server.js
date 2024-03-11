const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const { db } = require('./db');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);


app.listen((process.env.SERVER_PORT || 5000), () => {
  console.log(`Server listening on port: ${(process.env.SERVER_PORT || 5000)}`);
});