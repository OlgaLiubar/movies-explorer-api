const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');
const cookieParser = require('cookie-parser');
var helmet = require('helmet');
const limiter = require('./middlewares/limiter');

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
app.use(express.json())
app.use(cookieParser());
app.use(limiter);
app.use(router);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  await app.listen(PORT);
}

main();
