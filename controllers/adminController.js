const User = require("../models/UserModel");

// Path: controllers/adminController.js
// Compare this snippet from routes/admin.js:

exports.getUsers = async (req, res) => { 
  const users = await User.getUsers();
  const roles = await User.getRoles();
  res.render("admin/users", { users, title: global.config.WEB.name, roles, user: req.user });
};

exports.createUser = async (req, res) => {
  const user = await User.createUser(req.body).catch((err) => {
    if (err) throw err;
  });
  res.status(200).redirect("/admin/users");
};

exports.deleteUser = async (req, res) => {
    const user = await User.deleteUser(req.params.id).catch((err) => {
        if (err) throw err;
    });
    res.status(200).send("User deleted");
};

exports.createRole = async (req, res) => {
  const role = await User.createRole(req.body).catch((err) => {
    if (err) throw err;
  });
  res.status(200).redirect("/admin/users");
};

exports.deleteRole = async (req, res) => {
  const role = await User.deleteRole(req.params.id).catch((err) => {
    if (err) throw err;
  });
  res.status(200).send("Role deleted");
};

//TODO: Update role
