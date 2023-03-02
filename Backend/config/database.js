'use strict';
const mongoose = require('mongoose');

const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URI, { dbName: process.env.DB_NAME })
    .then((conn) => {
      console.log('Database connected :' + conn.connection.host);
    })
    .catch((err) => {
      console.log(`Faild to connect with database : ${err}`);
      process.exit(1);
    });
};

module.exports = dbConnection;
