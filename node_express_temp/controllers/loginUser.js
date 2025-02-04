const User = require("../models/User");
const { comparePassword } = require("../utils/hashpassword");

module.exports = async (req, res) => {
  try {
    const { username, password } = req.body;

    //check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send("user not found");
    }

    //compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Incorrect Password");
    }
    console.log("Login Successful");
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
