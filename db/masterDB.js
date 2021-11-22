const MongoClient = require("mongodb").MongoClient;

function masterDB() {
  const masterDB = {};
  const url = "mongodb://localhost:27017";
  const DB_NAME = "masterDB";
  console.log("connecting to the db");

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

  masterDB.createCredential = async (credential) => {
    let client;
    console.log("create credential!");
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const credentials = db.collection("credentials");
      const currentUser = await credentials.findOne({
        username: credential.username,
      });
      // if username not found, return
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

  masterDB.createTransaction = async (file) => {
    let client;
    console.log("new transaction created!");
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
      console.log("created", files);
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
      console.log("balance updated", new_balance);
      return files;
    } finally {
      client.close();
    }
  };

  masterDB.deleteTransaction = async (file) => {
    let client;
    console.log("transaction deleted!");
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
      console.log("balance updated", new_balance);
      return del;
    } finally {
      client.close();
    }
  };

  masterDB.getBalanceAndBudget = async (query) => {
    let client;
    console.log("getting balance and budget!");
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

  masterDB.updateBudget = async (query) => {
    let client;
    console.log("updating budget");
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const lookup = await db
        .collection("budgetBalance")
        .findOne({ username: query.username });
      if (lookup) {
        await db
          .collection("budgetBalance")
          .updateOne(
            { username: query.username },
            { $set: { budget: query.budget } }
          );
      } else {
        const data = {
          username: query.username,
          budget: query.budget,
          balance: query.budget,
        };
        await db.collection("budgetBalance").insertOne(data);
        console.log("inserted", data);
      }
      return "Success";
    } finally {
      client.close();
    }
  };

  return masterDB;
}

module.exports = masterDB();
