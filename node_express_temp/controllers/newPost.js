module.exports = (req, res) => {
  if (req.session.userId) {
    //show the create page and set the createpost = true;
    return res.render("create", { createPost: true });
  }
  res.redirect("/auth/login");
};
//We check if the session contains a user id .
// if it does, then show the create post page. if
// it doesn't redirect back to the login page
