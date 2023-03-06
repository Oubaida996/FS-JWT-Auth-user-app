'use strict';
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

//==== Routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

//===== DB
const dbConnection = require('./config/database');

//==== Enviroment
dotenv.config({ path: 'config.env' });

//==== Error handling
const globalErorrHandlingMidleware = require('./middleware/globalErorrHandlingMiddleware');
const ApiError = require('./utils/ApiError');
// express app
const app = express();

// Middlewares
app.use(express.json()); // we parse the data within body request from string into json
if (process.env.NODE_ENV === 'development') {
  //==== Check The Mode Of Enviroments
  app.use(morgan('tiny'));
  console.log(` Mode : ${process.env.NODE_ENV} `);
}

// Mount routes
app.get('/', (req, res) => {
  res.send('Test test the server 😁');
});

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);

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
  // Create error and send it to global error handling middleware.
  next(new ApiError(`Cant find this rout ${req.originalUrl}`, 400));
});

app.use(globalErorrHandlingMidleware); // Global error handling middleware, you must use it after mount routs

// @desc  Handle errors outside express unhandle rejections.
process.on('unhandledRejection', (err) => {
  console.error(`unhandledRejection : ${err.name} | ${err.message} `);
  server.close(() => {
    console.error('Shutting down .....');
    process.exit(1); //to stop app.
  });
});
