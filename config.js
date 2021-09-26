// require('dotenv').config();

// const {
//   NODE_ENV = 'production',
//   JWT_SECRET = 'JWT_SECRET',
//   MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb',
//   // PORT = 3000,
//   PORT = 3005,
// } = process.env;

// module.exports = {
//   PORT,
//   NODE_ENV,
//   JWT_SECRET,
//   MONGO_URL,
// };

require('dotenv').config();

const {
  NODE_ENV,
  JWT_SECRET,
  MONGO_URL,
  PORT,
} = process.env;

const config = {
  PORT: NODE_ENV === 'production' && PORT ? PORT : 3005,
  JWT_SECRET: NODE_ENV === 'production' && JWT_SECRET ? JWT_SECRET : 'JWT_SECRET_DEV',
  MONGO_URL: NODE_ENV === 'production' && MONGO_URL ? MONGO_URL : 'mongodb://localhost:27017/bitfilmsdb'
};

module.exports = config;