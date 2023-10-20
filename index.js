const express = require("express");
const app = express();

app.use(express.static("react-app/dist"));

app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/react-app/dist/index.html");
});
app.listen(3000, () => {
  console.log("online");
});
