const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
const helmet = require("helmet");
const xss = require("xss");
const html = xss('<a href="#" onclick="alert(/xss/)">click me</a>');
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const db = require("./config/db");
const route = require("./routes");

//Use Rate-limit
app.use(limiter);
//Use Helmet
app.use(helmet());
//Use XSS
console.log(html);
//Use CORS
app.use(cors());
//Read Json
app.use(express.json());
//Config env
dotenv.config();
//Show HTTP log
app.use(morgan("combined"));
//DB connect
db.connect();
//Routes
route(app);
//Run app
app.listen(process.env.PORT, () => {
  console.log(`Server app listening on port ${process.env.PORT}`);
});
