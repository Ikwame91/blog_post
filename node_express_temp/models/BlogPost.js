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
    default: Date.now, // function, so each post gets its own time
  },
});

const BlogPost = mongoose.model("BlogPost", BlogPostSchema);
module.exports = BlogPost;


//test for graph