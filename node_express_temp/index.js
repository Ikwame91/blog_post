const express = require("express");
const app = express();
const path = require("path");
app.use(express.static("public"));
const mongoose = require("mongoose");
const BlogPost = require("./models/BlogPost");

const multer = require("multer");
const upload = multer();
const bodyParser = require("body-parser");
const { error } = require("console");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/my_database");
app.set("view engine", "ejs");

app.post("/posts/store", upload.none(), async (req, res) => {
  console.log(req.body);
  await BlogPost.create(req.body)
    .then(() => res.redirect("/"))
    .catch((error) => {
      console.log(error);
      res.status(500).send("error creating post");
    });
});

app.get("/", async (req, res) => {
  try {
    let query = {}; //default: no filter , fetch all posts
    if (req.query.search) {
      query.title = new RegExp(req.query.search, "i"); // case- insensitive search
    }
    const blogposts = await BlogPost.find(query);
    res.render("index", { blogposts });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error retrieving Blog Posts");
  }
});

app.get('/post/:id', async(req,res)=>{
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post',{blogpost})
})

app.get("/posts/new", (req, res) => {
  res.render("create");
});
app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});
app.listen(4000, (req, res) => {
  console.log("app is running on port 4000s");
});
