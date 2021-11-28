const MongoClient = require("mongodb").MongoClient;

function masterDB() {
  const masterDB = {};
  const url = process.env.MONGO_URL || "mongodb://localhost:27017";
  const DB_NAME = "masterDB";

  /* Function used to find if a username exists or not. */
  masterDB.findUser = async (query) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const credentials = db.collection("credentials");
      const result = await credentials.findOne(query);
      return result;
    } finally {
      client.close();
    }
  };

  /* Function used to retrieve user's password. */
  masterDB.getPassword = async (query) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const credentials = db.collection("credentials");
      const pwd = await credentials.findOne(query);
      return pwd;
    } finally {
      client.close();
    }
  };

  /* Function used to create new account. */
  masterDB.createCredential = async (credential) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const credentials = db.collection("credentials");
      const currentUser = await credentials.findOne({
        username: credential.username,
      });
      if (currentUser != null) {
        return "username alreay exists";
      }
      await credentials.insertOne({
        id: credential.id,
        username: credential.username,
        password: credential.password,
        firstname: credential.firstname,
        lastname: credential.lastname,
      });
      return "Success";
    } finally {
      client.close();
    }
  };

  /* Function used to retrieve all transactions. */
  masterDB.getMyTransactions = async (query) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const files = db.collection("files");
      const result = await files.find(query).sort({ date: -1 }).toArray();
      return result;
    } finally {
      client.close();
    }
  };

  /* Function used to create new transaction. */
  masterDB.createTransaction = async (file) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const filesCol = db.collection("files");
      const files = await filesCol.insertOne({
        id: file.id,
        username: file.username,
        category: file.category,
        merchant: file.merchant,
        amount: file.amount,
        date: file.date,
        note: file.note,
      });
      const userBudget = await db
        .collection("budgetBalance")
        .findOne({ username: file.username });
      const new_balance =
        parseFloat(userBudget.balance) + parseFloat(-file.amount);
      await db
        .collection("budgetBalance")
        .updateOne(
          { username: file.username },
          { $set: { balance: new_balance } }
        );
      return files;
    } finally {
      client.close();
    }
  };

  /* Function used to delete transaction. */
  masterDB.deleteTransaction = async (file) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const trans = await db.collection("files").findOne({ id: file.id });
      const del = await db.collection("files").deleteOne({ id: file.id });
      const userBudget = await db
        .collection("budgetBalance")
        .findOne({ username: file.username });
      const new_balance =
        parseFloat(userBudget.balance) + parseFloat(trans.amount);
      await db
        .collection("budgetBalance")
        .updateOne(
          { username: file.username },
          { $set: { balance: new_balance } }
        );
      return del;
    } finally {
      client.close();
    }
  };

  /* Function used to retrieve user's current balance and budget values. */
  masterDB.getBalanceAndBudget = async (query) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const data = await db.collection("budgetBalance").findOne(query);
      return data;
    } finally {
      client.close();
    }
  };

  /* Function used to update budget value. */
  masterDB.updateBudget = async (query) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      await db
        .collection("budgetBalance")
        .deleteOne({ username: query.username });
      await db.collection("files").deleteMany({ username: query.username });
      const data = {
        username: query.username,
        budget: query.budget,
        balance: query.budget,
      };
      await db.collection("budgetBalance").insertOne(data);
      return "Success";
    } finally {
      client.close();
    }
  };

  return masterDB;
}

module.exports = masterDB();
