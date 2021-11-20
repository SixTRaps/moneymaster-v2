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
      const result = await files.find(query).toArray();
      return result;
    } finally {
      client.close();
    }
  };

  masterDB.createTransaction = async (file) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const filesCol = db.collection("files");
      const files = await filesCol.insertOne({
        id: file.id,
        name: file.name,
        title: file.title,
        content: file.content,
        time: new Date(),
        like: 0,
      });
      const user = await db.collection("credentials").findOne({
        _id: ObjectId(file.id),
      });
      const new_balance = user.balance + parseFloat(-file.amount);
      await db
        .collection("credentials")
        .updateOne(
          { _id: ObjectId(file.id) },
          { $set: { balance: new_balance } }
        );
      return files;
    } finally {
      client.close();
    }
  };

  masterDB.deleteTransaction = async (file) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const now = await db.collection("files").deleteOne({ id: file.id });
      const user = await db.collection("credentials").findOne({
        _id: ObjectId(file.user.id),
      });
      const new_balance = user.balance + parseFloat(file.amount);
      await db
        .collection("credentials")
        .updateOne(
          { _id: ObjectId(file.user.id) },
          { $set: { balance: new_balance } }
        );
      return now;
    } finally {
      client.close();
    }
  };

  return masterDB;
}

module.exports = masterDB();
