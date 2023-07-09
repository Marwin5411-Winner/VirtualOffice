const taskModel = require('../models/taskModel');

exports.getTasks = async (req, res) => {
    const tasks = await taskModel.getTasks();
    const MyTasks = await taskModel.getMyTasks(req.user.id);
    const error = req.query.error ? req.query.error : null;
    res.render('task/index', { tasks , title: global.config.WEB.name , MyTasks, error, user: req.user});
}

exports.getTask = async (req, res) => {
    const task = await taskModel.getTask(req.params.id);
    res.render('task/task', { task, title: global.config.WEB.nam, user: req.user });
}


exports.addTask = async (req, res) => {
    //Get user id from jwt
    if (req.body.assign_user == '' || req.body.status == '') {
        res.status(400).redirect('/tasks?error=Please fill all fields');
        return;
    }
    console.log(req.body);
    req.body.assign_user = parseInt(req.body.assign_user);
    req.body.user_id = req.user.id;
    taskModel.addTask(req.body);
    res.status(200).redirect('/tasks');
}

exports.deleteTask = async (req, res) => {
    const task = await taskModel.deleteTask(req.params.id).catch((err) => {
        if (err) throw err;
    });
    res.status(200).json('Delete Succesfully');
}

exports.updateTask = async (req, res) => {
    const task = await taskModel.updateTask(req.params.id, req.body).catch((err) => {
        if (err) throw err;
    });
    res.status(200).json('Update Succesfully');
}