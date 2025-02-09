const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: String,
  body: String,
  userid:{
    type: mongoose.Schema.Types.ObjectId, //objectID value is supposed to be a valid mongodb 
    ref:"User",
    required:true
  },
  image: String,
  datePosted: {
    type: Date,
    default: Date.now(),
  },
});

const BlogPost = mongoose.model("BlogPost", BlogPostSchema);
module.exports = BlogPost;
