
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
        let imagepath = path.resolve(__dirname, "../public/img", image.name);
    
        //move the image to the "public/img" folder
        image.mv(imagepath, async (error) => {
          if (error) {
            console.log(error);
            return res.status(500).send("Error uploading image");
          }
    
          // Add the image path to the blog post data
          let postData = { ...req.body, image: `/img/${image.name}` };
          //save the blog post to the database
          await BlogPost.create(postData);
          //redirect the homepage
          res.redirect("/");
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