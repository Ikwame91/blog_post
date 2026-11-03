const BlogPost = require("../models/BlogPost");

module.exports = async (req, res) => {
  try {
    let query = {}; //default: no filter , fetch all posts
    if (req.query.search) {
      // Escape regex characters so input like "(" can't crash or slow the query.
      const escaped = String(req.query.search).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      query.title = new RegExp(escaped, "i"); // case-insensitive search
    }
    const blogposts = await BlogPost.find(query).populate('userid');
    
    res.render("index", { blogposts });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error retrieving Blog Posts");
  }
};
