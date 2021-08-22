const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const limiter = require('./middlewares/limiter');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleErrors = require('./errors/handleErrors');

const { PORT = 3000 } = process.env;
const app = express();

// const corsWhiteList = [
//   'https://olgaliubar.students.nomoredomains.monster',
//   'http://olgaliubar.students.nomoredomains.monster',
// ];

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (corsWhiteList.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     }
//   },
//   credentials: true,
// };

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(limiter);
app.use(router);
app.use(errorLogger);
app.use(requestLogger);

app.use(errors());
app.use(handleErrors);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/moviesdb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  await app.listen(PORT);
}

main();
