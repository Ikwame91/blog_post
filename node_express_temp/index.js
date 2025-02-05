const express = require("express");
const app = express();
app.use(express.static("public"));
const mongoose = require("mongoose");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
// Without body-parser, req.body would be undefined.
require("dotenv").config();
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
const newUserController = require("./controllers/newUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");
const authmiddleware = require("./middleware/authmiddleware");
const logoutUserController = require("./controllers/logout");
const redirectIfAuthenticated = require("./middleware/redirectedIfAuthenticated");
mongoose
  .connect("mongodb://localhost/my_database")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
app.set("view engine", "ejs");

app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false, // prevents unnecessary session data being saved.
    saveUninitialized: false, // ensures sessions are not saved for unauthenticated users.
  })
);
const PORT = process.env.PORT || 4000;

app.use("*", (req, res, next) => {
  res.locals.loggedIn = req.session.userId;
  next();
});
//using res.locals avoids potential global variable pollution
app.post(
  "/posts/store",
  authmiddleware, //checks if the user is logged in
  validateMiddleWare, // validate the request data
  storePostController //stores the data
);

app.get("/", homeController);

app.get("/post/:id", getPostController);

app.get("/posts/new", newPostController);

app.get("/about", aboutController);

app.get("/contact", contactController);

app.get("/auth/register", redirectIfAuthenticated, newUserController);

app.get("/auth/login", redirectIfAuthenticated, loginController);

app.post(
  "/users/register",
  redirectIfAuthenticated,
  customMiddleWare,
  storeUserController
);

app.post("/users/login", redirectIfAuthenticated, loginUserController);

app.get("/auth/logout", logoutUserController);

app.use((req, res) => {
  res.status(404).render("notfound");
});

app.listen(PORT, (req, res) => {
  console.log(`app is running on port ${PORT}`);
});

// Sessions are how we keep the user logged into our web app by keeping their
// information in the browser. Each time a user makes a request, information of
// that user is sent back to the server. The server thus knows which user is
// making that request and if they are logged in or out. The information kept on
// the user ’ s browser is called cookies.

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
