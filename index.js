const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 2000;
const schemaData = mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: String,
  },
  { timestamps: true }
);

const shaftModel = mongoose.model("shaft", schemaData);

// connect to DB----------------------------------------------------------------
mongoose
  .connect("mongodb+srv://admin:admin@cluster0.z4tya.mongodb.net/")
  .then(() => {
    console.log("Connect to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
// CREATE DATA
// ​http://localhost:2000/add
/*
name,
email,
mobile
*/

app.post("/create", async (req, res) => {
  console.log(req.body);
  const data = new shaftModel(req.body);

  await data.save();

  res.send({ success: true, message: "data save successfully" });
});
//   READ
// ​http://localhost:2000/

app.get("/", async (req, res) => {
  const data = await shaftModel.find({});
  res.json({ success: true, data: data });
});

// UPDATE DATA
// ​http://localhost:2000/update/id
/*
    {
    id:"",
    name: "",
    email: "",
    mobile: ""
    }
*/
app.put("/update", async (req, res) => {
  const { _id, ...rest } = req.body;
  console.log(req.body);

  const data = await shaftModel.updateOne({ _id: _id }, rest);

  res.send({ success: true, message: "data updated successfully", data: data });
});

// DELETE DATA
// ​http://localhost:2000/delete/:id

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const data = await shaftModel.deleteOne({ _id: id });
  console.log(!data.ok, "123");

  res.send({ success: true, message: "data deleted successfully" });
});
// run the server
app.listen(PORT, () => {
  console.log("Server is running");
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------
