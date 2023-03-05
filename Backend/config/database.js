'use strict';
const mongoose = require('mongoose');

const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URI, { dbName: process.env.DB_NAME })
    .then((conn) => {
      console.log('Database connected :' + conn.connection.host);
    }); 
};

module.exports = dbConnection;
