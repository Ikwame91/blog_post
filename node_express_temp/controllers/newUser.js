module.exports = (req, res) => {
  // const errors = req.session.validationErrors || []; // Retrieve session errors
  const errors = req.flash("validationErrors") || []; // Retrieve session errors

  const data = req.flash("data")[0] || {};
  req.session.validationErrors = null; // Clear session errors after retrieving
  res.render("register", {
    errors,
    username: data.username || "",//preserve username if entered
    password: "", // never send the password back to the browser
  }); // Pass errors to the view
};
