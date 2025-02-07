module.exports = (req, res) => {
  // const errors = req.session.validationErrors || []; // Retrieve session errors
  const errors = req.flash("validationErrors") || []; // Retrieve session errors

  const data = req.flash("data")[0] || {};
  req.session.validationErrors = null; // Clear session errors after retrieving
  res.render("register", {
    errors,
    username: data.username || "",//preserve username if entered
    password: data.password || "",//preserve passswprd if entered
  }); // Pass errors to the view
};
