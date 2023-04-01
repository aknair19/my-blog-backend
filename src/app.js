//load credentials we use fs
const fs = require("fs");
const admin = require("firebase-admin");
const routes = require("./articles/articles.routes");
const express = require("express");
const cors = require("cors");

const credentials = require("../credentials.json");
// JSON.parse(fs.readFileSync(credentials));

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const app = express();

app.use(cors());

app.use(express.json());

//middleware protecting endpoint using auth-token
app.use(async (req, res, next) => {
  const { authtoken } = req.headers;

  if (authtoken) {
    try {
      req.user = await admin.auth().verifyIdToken(authtoken);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  req.user = req.user || {};
  next();
});

app.use("/api/articles", routes);

module.exports = app;
