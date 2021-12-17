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
const methodOverride = require("method-override");

let indexRouter = require("./routes/index");

let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "front/build")));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

app.use("/api", indexRouter);

// Currently your website fails if I hit refresh anywhere other than root path
// It's because express is trying to match undefined path and gets a 404
// You can catch and reroute 404s back to react with something like this
// Put this as the very last route, and it will be matched last
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "front/build/index.html")
})

module.exports = app;
