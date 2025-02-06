const bcrypt = require("bcrypt");

//compare password function (Fixed)
module.exports.comparePassword = async function (plain, hash) {
  return await bcrypt.compare(plain, hash);
};
