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

/* GET User Info. */
router.get("/user", async function (req, res) {
  if (req.isAuthenticated()) {
    try {
      const user = await req.user;
      console.log("user", user.username);
      res.status(200).send({ username: user.username });
    } catch (e) {
      res.status(400).send({ err: e });
    }
  } else {
    res.status(401).send("Auth required");
    console.log("auth required");
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
    console.log("auth required");
  }
});

/* POST update budget */
router.get("/changeBudget", async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const user = await req.user;
      const newBudget = {
        username: user.username,
        budget: req.body.budget,
      };
      const updateRes = await masterDB.updateBudget(newBudget);
      console.log("new budget", newBudget);
      console.log("res", updateRes);
      if (updateRes === "Success") res.status(200).send();
      else res.status(400).send();
    } catch (e) {
      res.status(400).send();
    }
  } else {
    res.status(401).send("Auth required");
    console.log("auth required");
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
      categories: [
        "Housing",
        "Transportation",
        "Consumables",
        "Living Expense",
        "Savings",
        "Debt",
      ],
    };
    const insertRes = await masterDB.createCredential(newUserData);
    console.log(newUserData);
    console.log(insertRes);
    if (insertRes === "Success") res.status(200).send();
    else res.status(401).send();
  } catch (e) {
    res.status(401).send();
  }
});

router.post("/signin", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      throw err;
    }
    if (!user) {
      console.log("no user");
      res.send("No User Exists");
    } else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log("login:", req.user);
      });
    }
  })(req, res, next);
});

//Anni
router.get("/allTransactions", async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const loginUser = await req.user;
      const files = await masterDB.getMyTransactions({ name: loginUser.id });
      res.send({ files: files, user: loginUser.firstname });
    } catch (e) {
      res.status(401).send({ err: e });
    }
  } else {
    res.status(401).send();
  }
});

router.post("/createTransaction", async (req, res) => {
  if (
    req.body.type === undefined ||
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
    // const newTransData = {
    //   name: loginUser.username,
    //   title: req.body.title,
    //   content: req.body.content,
    //   like: 0,
    // };
    masterDB.createTransaction(req.body);
    res.sendStatus(201);
  } catch (e) {
    res.status(400).send({ err: e });
  }
});

router.post("/deleteTransaction", async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const id = req.body._id;
      const transaction = await masterDB.deleteTransaction({ id: id });
      res.sendStatus(201);
    } catch (e) {
      res.status(401).send({ err: e });
    }
  } else {
    res.status(401).send();
  }
});

module.exports = router;
