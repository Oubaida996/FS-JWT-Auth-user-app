'use strict';
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

//===== DB
const dbConnection = require('./config/database');

//==== Enviroment
dotenv.config({ path: 'config.env' });

//==== Error handling
const globalErorrHandlingMidleware = require('./middleware/globalErorrHandlingMiddleware');

// express app
const app = express();

// Middlewares
app.use(express.json()); // we parse the data within body request from string into json

app.use(globalErorrHandlingMidleware); // Global error handling middleware

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

//===Error Handling


// @desc Handle unhandled routes and send error into Error handling middleware.
app.all('*', (req, res, next) => {
  // Create error and send it to error handling midleware.
  next(new ApiError(`Cant find this rout ${req.originalUrl}`, 400));
});


// @desc  Handle errors outside express unhandle rejections.
process.on('unhandledRejection', (err) => {
  console.error(`unhandledRejection : ${err.name} | ${err.message} `);
  server.close(() => {
    console.error('Shutting down .....');
    process.exit(1); //to stop app.
  });
});