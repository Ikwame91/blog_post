const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.pre("save",async function (next) {
  try {
    //only re-hash if password is modified or new
    if(!this.isModified("password")){
      return next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next()
  } catch (error) {
    next(error)
  }
  
})

const User = mongoose.model("User", UserSchema);
module.exports = User;
