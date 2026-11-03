const mongoose = require("mongoose");
const BlogPost = require("../models/BlogPost.js");

module.exports = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).render("notfound");
    }
    const blogpost = await BlogPost.findById(req.params.id).populate("userid");
    if (!blogpost) {
      return res.status(404).render("notfound");
    }
    res.render("post", { blogpost });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error retrieving the post");
  }
};
