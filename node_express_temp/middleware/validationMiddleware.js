module.exports = (req, res, next) => {
  if (req.files == null) {
    console.log("You didn't upload an image.");
    return res.redirect("/posts/new");
  }
  if (req.body == null) {
    console.log("You didn't provide any form data.");
    return res.redirect("/posts/new");
  }
  if (req.body.title == null || req.body.title.trim() === "") {
    console.log("You didn't provide a title.");
    return res.redirect("/posts/new");
  }
  // If all checks pass, proceed to the next middleware/route handler
  next();
};
