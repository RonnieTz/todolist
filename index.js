const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.static("react-app/dist"));
app.use(cors({ origin: "*" }));

app.get("/api", (req, res) => {
  res.json({ message: "api works!" });
});

app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/react-app/dist/index.html");
});
app.listen(3000, () => {
  console.log("online");
});
