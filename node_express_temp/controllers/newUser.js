module.exports = (req, res) => {
    const errors = req.session.validationErrors || []; // Retrieve session errors
    req.session.validationErrors = null; // Clear session errors after retrieving
    res.render("register", { errors }); // Pass errors to the view
  };
  