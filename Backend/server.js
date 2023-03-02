'use strict';
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

//===== DB
const dbConnection = require('./config/database');

//==== Enviroment
dotenv.config({ path: 'config.env' });

// express app
const app = express();

// Middlewares
app.use(express.json()); // we parse the data within body request from string into json

if (process.env.NODE_ENV === 'development') {
  //==== Check The Mode Of Enviroments
  app.use(morgan('tiny'));
  console.log(` Mode : ${process.env.NODE_ENV} `);
}

app.get('/', (req, res) => {
  res.send('Test test the server 😁');
});

// ==== Connection with server
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port  ${PORT}`);
  //==== Connect the DB
  dbConnection();
});
