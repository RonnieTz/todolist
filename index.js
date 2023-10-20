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

const ItemSchema = mongoose.Schema({ name: String, checked: Boolean });
const Item = mongoose.model("Item", ItemSchema);

app.use(express.static("react-app/dist"));
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/api/get-items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post("/api/save-item", async (req, res) => {
  const { name } = req.body;
  const item = new Item({ name, checked: false });
  await item.save();
  const response = await Item.find();
  res.json(response);
});

app.delete("/api/delete-item", async (req, res) => {
  const { id } = req.query;
  await Item.findOneAndDelete({ _id: id });
  const items = await Item.find();
  res.json(items);
});
app.patch("/api/check-item", async (req, res) => {
  const { id, checked } = req.query;
  await Item.findOneAndUpdate(
    { _id: id },
    { checked: checked === "true" ? true : false }
  );
  const items = await Item.find();
  res.json(items);
});

app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/react-app/dist/index.html");
});
app.listen(3000, () => {
  console.log("online");
});
