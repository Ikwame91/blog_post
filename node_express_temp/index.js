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
// Without body-parser, req.body would be undefined.
app.use(bodyParser.json());
const fileUpload = require("express-fileupload");
app.use(fileUpload());

mongoose
  .connect("mongodb://localhost/my_database")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
app.set("view engine", "ejs");

app.post("/posts/store", async (req, res) => {
  try {
    // 1. Check if an image was uploaded
    console.log(req.body);
    console.log(req.files);
    if (!req.files || !req.files.image) {
      return res.status(400).send("No image uploaded");
    }

    // 2. Get the uploaded image
    let image = req.files.image;
    let imagepath = path.resolve(__dirname, "public/img", image.name);

    //move the image to the "public/img" folder
    image.mv(imagepath, async (error) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Error uploading image");
      }

      // Add the image path to the blog post data
      let postData = { ...req.body, image: `img/${image.name}` };
      //save the blog post to the database
      await BlogPost.create(postData);
      //redirect the homepage
      res.redirect("/");
    });
  } catch (error) {
    //handle errors
    console.log(error);
    res.status(500).send("Error creating posts");
  }
  //   The route handles the creation of a new blog post.
  // It first checks if an image was uploaded.
  // If an image was uploaded, it saves the image to the public/img folder.
  // It then adds the image path to the blog post data and saves everything to the database.
  // Finally, it redirects the user to the homepage.
  // If anything goes wrong, it logs the error and sends an error response.
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

app.get("/post/:id", async (req, res) => {
  const blogpost = await BlogPost.findById(req.params.id);
  res.render("post", { blogpost });
});

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

// The body-parser middleware is used to parse incoming request bodies before they reach your route handlers.
// app.use(bodyParser.urlencoded({ extended: true }));
// Purpose: Parses form data from application/x-www-form-urlencoded requests (e.g., from HTML forms).
{
  /* <form action="/submit" method="POST">
  <input type="text" name="username" />
  <button type="submit">Submit</button>
</form>
The form sends data like:
username=JohnDoe
The middleware converts this into:
req.body = { username: "JohnDoe" };
app.use(bodyParser.json());
Purpose: Parses incoming JSON data (e.g., from API requests).
Example
fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "My Post", content: "Hello World!" })
  });
  the request body:
  { "title": "My Post", "content": "Hello World!" } */
}
