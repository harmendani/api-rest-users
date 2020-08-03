'use-strict';
const dotenv = require('dotenv');

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// Reads from file .env and setup enviromentdotenv.config();
const envFound = dotenv.config();
if (!envFound) {
  throw new Error('⚠️  Couldn\'t find .env file  ⚠️');
}

module.exports = {
  port: parseInt(process.env.PORT),
  dataBase: process.env.DATABASE_NAME,
  secretJwt: process.env.JWT_SECRET,
};
