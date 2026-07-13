const { User } = require("../Database/models/index.js");

const createUser = async (data) => {
  return await User.create(data);
};

const findAllUser = async () => {
  return await User.findAll();
};

const deleteUser = async (id) => {
  return await User.destroy({ where: { id } });
};

const findUserById = async (id) => {
  return await User.findByPk(id);
};

const updateUser = async (id, data) => {
  await User.update(data, { where: { id } });
  return await User.findByPk(id);
};

module.exports = { createUser, findAllUser, deleteUser, findUserById, updateUser };
