const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const limiter = require('./middlewares/limiter');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleErrors = require('./errors/handleErrors');

const { PORT, MONGO_URL } = require('./config');

const app = express();

// const corsWhiteList = [
//   'https://olgaliubar.nomoredomains.club',
//   'http://olgaliubar.nomoredomains.club',
// ];

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (corsWhiteList.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     }
//   },
//   credentials: true,
// };

const allowedCors = [
  "localhost:3000",
  "https://olgaliubar.nomoredomains.club",
  "http://https://olgaliubar.nomoredomains.club",
];

// app.use(cors(corsOptions));

app.use(requestLogger);
app.use(limiter);

app.use((req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  // проверяем, что источник запроса есть среди разрешённых
  const { methodHttp } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  const requestHeaders = req.headers["access-control-request-headers"];
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
  }
  if (methodHttp === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    res.header("Access-Control-Allow-Headers", requestHeaders);
    return res.end();
  }
  return next();
});

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(router);
app.use(errorLogger);

app.use(errors());
app.use(handleErrors);

async function main() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  await app.listen(PORT);
}

main();
