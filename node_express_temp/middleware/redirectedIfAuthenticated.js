module.exports = (req, res, next) => {
  if (req.session.userId) {
    return res.redirect("/"); // already logged in: send them home
  }
  next();
};
