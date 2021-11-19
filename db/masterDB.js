const MongoClient = require("mongodb").MongoClient;

function masterDB() {
  const masterDB = {};
  const url = "mongodb://localhost:27017";
  const DB_NAME = "masterDB";
  console.log("connecting to the db");

  masterDB.getFiles = async (query = {}) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const filesCol = db.collection("files");
      const files = await filesCol.find(query).toArray();
      return files;
    } finally {
      client.close();
    }
  };

  masterDB.createFile = async (file) => {
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
      return files;
    } finally {
      client.close();
    }
  };

  masterDB.getMyOwnFiles = async (query) => {
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

  masterDB.deleteMyOwnFiles = async (id) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const now = await db.collection("files").deleteOne({ id: id.id });
      return now;
    } finally {
      client.close();
    }
  };

  masterDB.editMyOwnFiles = async (id, content) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const post = await db.collection("files").updateOne({
        id: id,
        $set: { content: content },
      });
      return post;
    } finally {
      client.close();
    }
  };

  masterDB.findFile = async (query) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const files = db.collection("files");
      const result = await files.findOne(query);
      return result;
    } finally {
      client.close();
    }
  };

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

  return masterDB;
}

module.exports = masterDB();
