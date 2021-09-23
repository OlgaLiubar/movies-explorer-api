require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const { errors } = require("celebrate");
const limiter = require("./middlewares/limiter");
const cors = require("./middlewares/cors");
const router = require("./routes");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const handleErrors = require("./errors/handleErrors");

const { PORT, MONGO_URL } = require("./config");

const app = express();

app.use(requestLogger);
app.use(limiter);

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use(cors);
app.use(router);
// app.use(cors);
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
