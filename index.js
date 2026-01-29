const express = require("express");

const path = require("path");
const app = express();

// Serving Static Files with Express
app.use(express.static("public"));

app.listen(3000, () => {
  console.log("app is listening on port 3000");
});

app.get("/", (req, res) => {
  res.json({
    name: "Greg Johnson",
  });
});
app.get("/contact", (req, res) => {
  res.sendFile(path.resolve(__dirname, "contact.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.resolve(__dirname, "about.html"));
});

//we can also define the type of response the server serves.
//to server html file with express
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});
// path.resolve(__dirname,'index.html') helps us get the full absolute path which
// otherwise changes based on different Operating Systems. For example, on
// Mac and Linux, we refer to a directory using /directory, but on Windows, we
// refer to it using \directory. The path module ensures that things run smoothly
// regardless if the OS is Windows, Mac or Linux
