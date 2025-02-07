const User = require("../models/User");

module.exports = async (req, res) => {
  try {
    await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    res.redirect("/");
  } catch (error) {
    if (error.code ===11000){
      //this is a duplicate key error (index violation)
      // req.session.validationErrors = ['username already taken'];
      req.flash  (["Validation Errors",'username already taken'])
      req.flash('data',req.body)//preserves form data           save user input
      return res.redirect('/auth/register')
    }
    // Check if it's a validation error from Mongoose
   else if (error.name === "ValidationError") {
      // Extract error messages
      const validationErrors = Object.keys(error.errors).map(
        (key) => error.errors[key].message
      );

      // Store errors in session
      console.log("Validation errors:", validationErrors);
      // req.session.validationErrors = validationErrors;
      req.flash ("validationErrors",validationErrors);
      req.flash("data",req.body)//preserves form data store user input
      return res.redirect("/auth/register");
    } else {
      // Some other unexpected error
      console.log("Unexpected error:", error);
      req.flash("validationErrors", ["Something went wrong."]);
      return res.redirect("/auth/register");
    }
  }
};


// Why is This Useful in Your Project?
// ✅ Ensures users only see error messages once and not after fixing their mistakes.
// ✅ Prevents old validation errors from appearing on new pages.
// ✅ Makes handling success messages easy (e.g., "Account created successfully!").

