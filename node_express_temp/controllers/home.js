const BlogPost = require("../models/BlogPost");

module.exports = async (req, res) => {
  try {
    let query = {}; //default: no filter , fetch all posts
    if (req.query.search) {
      query.title = new RegExp(req.query.search, "i"); // case- insensitive search
    }
    const blogposts = await BlogPost.find(query).populate('userid');
    console.log(req.session);
    
    res.render("index", { blogposts });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error retrieving Blog Posts");
  }
};
