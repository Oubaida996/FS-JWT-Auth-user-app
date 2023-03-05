'use strict';
const mongoose = require('mongoose');

const dbConnection = () => {
  // https://www.mongodb.com/community/forums/t/deprecationwarning-mongoose-the-strictquery/209637
  mongoose.set('strictQuery', false);
  mongoose
    .connect(process.env.DB_URI, { dbName: process.env.DB_NAME })
    .then((conn) => {
      console.log('Database connected :' + conn.connection.host);
    });
};

module.exports = dbConnection;
