const User = require("../models/User");

module.exports = async (req, res) => {
  try {
    await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    res.redirect("/");
  } catch (error) {
    // Check if it's a validation error from Mongoose
    if (error.name === "ValidationError") {
      // Extract error messages
      const validationErrors = Object.keys(error.errors).map(
        (key) => error.errors[key].message
      );

      // Store errors in session
      req.session.validationErrors = validationErrors;
      return res.redirect("/auth/register");
    } else {
      // Some other unexpected error
      console.log(error);
      return res.redirect("/auth/register");
    }
  }
};
