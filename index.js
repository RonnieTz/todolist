const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://ronistzolis:adslgr@cluster0.pwpagi7.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to database");
  });

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
