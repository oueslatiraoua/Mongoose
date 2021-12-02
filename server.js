const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
mongoose.connect(
  "mongodb+srv://username:user@cluster0.xpukd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  (err) => (err ? console.log(err) : console.log("is connected"))
);
const User = require("./userModel");
/**Create and Save a Record of a Model
var joe = new User({
  name: "Joe",
  age: 23,
});

joe.save(function (err, data) {
  if (err) {
    console.log("ERROR");
  } else {
    console.log(data);
  }
});
//Create Many Records with model.create()

**/
app.post("/api/createuser", (req, res) => {
  console.log(req.body);
  User.create(req.body)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});
// Use model.find() to Search Your Database

app.get("/api/findbyName/:name", (req, res) => {
  User.find({ name: req.params.name })

    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});
//Use model.findOne() to Return a Single Matching Document from Your Database
app.get("/api/finduser/:food", (req, res) => {
  User.findOne({ favoriteFood: req.params.food })

    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});
//Use model.findById() to Search Your Database By _id
app.get("/api/findbyId/:id", (req, res) => {
  User.find(req.params.id)

    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});
//update a user
app.put("/api/findbyname/:name", (req, res) => {
  console.log(req.params.name);
  User.findByIdAndUpdate(req.params.name, req.body, { new: true })
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
});
//delete a user
app.delete("/api/delete/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
});
//Remove  users
app.delete("/api/deletename/:name", (req, res) => {
  User.remove(req.params.name)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

app.listen(8000, () => console.log("is running"));
