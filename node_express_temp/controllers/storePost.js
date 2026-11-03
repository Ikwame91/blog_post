
const BlogPost = require('../models/BlogPost')
const path = require('path')

module.exports = (req,res)=>{
    try {
        // 1. Check if an image was uploaded
    
        if (!req.files || !req.files.image) {
          return res.status(400).send("No image uploaded");
        }
    
        // 2. Get the uploaded image
        let image = req.files.image;
        if (!/^image\//.test(image.mimetype || "")) {
          return res.status(400).send("Only image uploads are allowed");
        }
        // Never trust the uploaded name: strip any path parts ("../../index.js")
        // and add a unique prefix so uploads can't overwrite each other.
        const safeName = `${Date.now()}-${path.basename(image.name).replace(/[^\w.-]/g, "_")}`;
        let imagepath = path.resolve(__dirname, "../public/img", safeName);
    
        //move the image to the "public/img" folder
        image.mv(imagepath, async (error) => {
          if (error) {
            console.log(error);
            return res.status(500).send("Error uploading image");
          }
          // Add the image path to the blog post data
          let postData = { ...req.body, image: `/img/${safeName}` ,userid: req.session.userId};
          //save the blog post to the database
          try {
            await BlogPost.create(postData);
            res.redirect("/"); // back to the homepage
          } catch (err) {
            console.log(err);
            res.status(500).send("Error saving the post");
          }
        });
      } catch (error) {
        //handle errors
        console.log(error);
        res.status(500).send("Error creating posts");
      }
      //   The route handles the creation of a new blog post.
      // It first checks if an image was uploaded.
      // If an image was uploaded, it saves the image to the public/img folder.
      // It then adds the image path to the blog post data and saves everything to the database.
      // Finally, it redirects the user to the homepage.
      // If anything goes wrong, it logs the error and sends an error response.
}