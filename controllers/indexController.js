const taskModel = require('../models/taskModel');
const userModel = require('../models/UserModel');
const documentModel = require('../models/documentModel');
const categoryModel = require('../models/documentCategoryModel');
const fs = require('fs');

exports.getIndex = async (req, res) => {
    const user = req.user;
    const MyTasks = await taskModel.getMyTasks(req.user.id);
    const Documents = await documentModel.getAll();
    const Users = await userModel.getUsers();
    const Categories = await categoryModel.getAll();
    res.render('index', { title: global.config.WEB.name, MyTasks, Documents, Users, Categories, user });
}