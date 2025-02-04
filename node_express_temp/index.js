const express = require("express");
const app = express();
app.use(express.static("public"));
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
// Without body-parser, req.body would be undefined.
app.use(bodyParser.json());
const fileUpload = require("express-fileupload");
app.use(fileUpload());
const newPostController = require("./controllers/newPost");
const aboutController = require("./controllers/about");
const contactController = require("./controllers/contact");
const homeController = require("./controllers/home");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");
const validateMiddleWare = require("./middleware/validationMiddleware");
const customMiddleWare = require("./middleware/customMiddleware");

mongoose
  .connect("mongodb://localhost/my_database")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
app.set("view engine", "ejs");
app.use(customMiddleWare);
app.post("/posts/store", validateMiddleWare, storePostController);

app.get("/", homeController);

app.get("/post/:id", getPostController);

app.get("/posts/new", newPostController);

app.get("/about", aboutController);

app.get("/contact", contactController);
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
