const bcrypt = require("bcrypt");
const saltRounds = 10;
module.exports.hashpassword = async function (password) {
 
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};

//compare password function (Fixed)
module.exports.comparePassword = async function (plain, hash) {
  return await bcrypt.compare(plain, hash);
};
