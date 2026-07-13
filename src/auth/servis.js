const { User } = require("../Database/models");

const findByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};
 
const create = async (data) => {
  return await User.create(data);
};

module.exports = { findByEmail, create };
