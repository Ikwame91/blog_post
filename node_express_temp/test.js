const mongoose = require("mongoose");
const BlogPost = require("./models/BlogPost");

mongoose.connect("mongodb://localhost/my_database");

BlogPost.create({
  title: "The Mythbuster's Guide to Saving Money on Energy Bills",
  body: "If you have been here a long time, you might remember when I went on ITV Tonight...",
})
  .then((blogpost) => console.log("Blog post created:", blogpost))
  .catch((error) => console.error("Error creating blog post:", error));

//   The query filter parameter determines the select criteria. Thus, to find all
//   documents in BlogPosts collection with a particular title for e.g. 'The
//   Mythbuster’s Guide to Saving Money on Energy Bills' , we do
BlogPost.find({
  title: "The Mythbuster’s Guide to Saving Money on Energy Bills",
});

// Or, to find all documents in BlogPosts collection with ‘ The ’ in the title, we
// do:
BlogPost.find({
  title: /The/,
});
