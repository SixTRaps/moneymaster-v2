let express = require("express");
let router = express.Router();

const masterDB = require("../db/masterDB.js");
const bcrypt = require("bcrypt");
const passport = require("passport");

const initializePassport = require("../passport-config");

initializePassport(
  passport,
  (username) => masterDB.findUser({ username: username }),
  (id) => masterDB.findUser({ id: id })
);

// Xuejia Yang
/* GET User Info. */
router.get("/user", async function (req, res) {
  if (req.isAuthenticated()) {
    try {
      const user = await req.user;
      res.status(200).send({ username: user.username });
    } catch (e) {
      res.status(400).send({ err: e });
    }
  } else {
    res.status(401).send("Auth required");
  }
});

/* GET balance and budget */
router.get("/getBalanceAndBudget", async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const user = await req.user;
      const data = await masterDB.getBalanceAndBudget({
        username: user.username,
      });
      if (data) res.status(200).send(JSON.stringify(data));
      else res.status(404).send();
    } catch (e) {
      res.status(400).send({ error: e });
    }
  } else {
    res.status(401).send("Auth required");
  }
});

/* POST update budget */
router.post("/startOver", async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const user = await req.user;
      const newBudget = {
        username: user.username,
        budget: req.body.budget,
      };
      const updateRes = await masterDB.updateBudget(newBudget);
      if (updateRes === "Success") res.status(200).send();
      else res.status(400).send();
    } catch (e) {
      res.status(400).send();
    }
  } else {
    res.status(401).send("Auth required");
  }
});

/* POST user registration */
router.post("/signup", async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const newUserData = {
      id: Date.now().toString(),
      username: req.body.username,
      password: hash,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    };
    const insertRes = await masterDB.createCredential(newUserData);
    if (insertRes === "Success") res.status(200).send();
    else if (insertRes === "username alreay exists") res.status(409).send();
    else res.status(401).send();
  } catch (e) {
    res.status(401).send();
  }
});

/* POST user logout */
router.post("/signin", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      throw err;
    }
    if (!user) {
      res.status(404).send("No User Exists");
    } else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.status(200).send("Successfully Authenticated");
      });
    }
  })(req, res, next);
});

/* User Log-Out Request. */
router.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

//Anni
router.get("/allTransactions", async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const loginUser = await req.user;
      const files = await masterDB.getMyTransactions({
        username: loginUser.username,
      });
      res.status(200).send(files);
    } catch (e) {
      res.status(401).send({ err: e });
    }
  } else {
    res.status(401).send();
  }
});

router.post("/createTransaction", async (req, res) => {
  if (
    req.body.category === undefined ||
    req.body.merchant === undefined ||
    req.body.amount === undefined ||
    req.body.date === undefined ||
    req.body.note === undefined
  ) {
    return res.sendStatus(400);
  }
  try {
    const loginUser = await req.user;
    const newTransData = {
      id: Date.now().toString(),
      username: loginUser.username,
      category: req.body.category,
      merchant: req.body.merchant,
      amount: req.body.amount,
      date: req.body.date,
      note: req.body.note,
    };
    masterDB.createTransaction(newTransData);
    res.sendStatus(201);
  } catch (e) {
    res.status(400).send({ err: e });
  }
});

router.post("/deleteTransaction", async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const loginUser = await req.user;
      const id = req.body.id;
      const info = {
        id: req.body.id,
        username: loginUser.username,
      };
      const transaction = await masterDB.deleteTransaction(info);
      res.sendStatus(201);
    } catch (e) {
      res.status(401).send({ err: e });
    }
  } else {
    res.status(401).send();
  }
});

module.exports = router;
