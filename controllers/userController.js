const User = require("../models/UserModel");

exports.getUsers = async (req, res) => {
  const users = await User.getUsers();
  res.status(200).json(users);
};

exports.getUserById = async (req, res) => {
  const user = await User.getUserById(req.params.id);
  res.status(200).json(user);
};
