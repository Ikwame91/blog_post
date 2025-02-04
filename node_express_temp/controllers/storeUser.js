const User = require("../models/User");
const path = require("path");
const hashpassword = require("../utils/hashpassword");

module.exports = async (req, res) => {
  try {
    const hashedPassword = await hashpassword(req.body.password);
    await User.create({
      username: req.body.username,
      password: hashedPassword,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/auth/register");
  }
};
