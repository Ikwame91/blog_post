const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      "Database connected: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectDb;

// mongoose
//   .connect(
//     "mongodb+srv://kwame:0503@kwamescluster.djjkb.mongodb.net/blog_database?retryWrites=true&w=majority&appName=KwamesCluster"

//     // "mongodb+srv://kwame:0503@kwamescluster.djjkb.mongodb.net/blog_database?retryWrites=true&w=majority&appName=KwamesCluster"
//   )
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection error:", err));