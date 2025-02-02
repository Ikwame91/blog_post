const express = require("express");
const app = express();
const path = require("path");
app.use(express.static("public"));

app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("contact");
});
app.get("/contact", (req, res) => {
  res.render("about");
});
app.listen(4000, (req, res) => {
  "app is listening on port 4000";
});
