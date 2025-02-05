module.exports = (req, res) => {
  if (req.session.userId) {
   return res.render("create");
  }
  res.redirect("/auth/login");
};
//We check if the session contains a user id .
// if it does, then show the create post page. if
// it doesn't redirect back to the login page
