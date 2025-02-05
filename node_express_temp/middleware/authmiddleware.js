const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    //check if user id is in the section
    if (!req.session.userId) {
      return res.redirect("/");
    }
    //find the user by the UserId
    const user = await User.findById(req.session.userId);
    //If user is not found , redirect to the homepage
    if (!user) {
      return res.redirect("/");
    }
    //store user info in req.user for later use, allows other middleware or routes to acces
    //  the authenticated user without querying the database again
    req.user = user;

    //if everything is fine, proceed to the next middleware/route
    next();
  } catch (error) {
    console.log("error in auth middleware", error);
    res.status(500).send("Internal server error");
  }
};
