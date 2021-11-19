if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");

const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const bodyParser = require("body-parser");

let indexRouter = require("./routes/index");

let app = express();

// Middlewares here
app.use(express.static(path.join(__dirname, "./front/build")));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", indexRouter);

module.exports = app;
