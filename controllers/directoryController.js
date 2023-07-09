const directoryModel = require('../models/directoryModel');
const userModel = require('../models/UserModel');

exports.getDirectories = async (req, res) => {
    const directory = await directoryModel.getAll();
    const user = req.user;
    const error = req.query.error ? req.query.error : null;
    res.render('directory/index', { title: global.config.WEB.name, directory, user, error });
}

exports.getDirectoryById = async (req, res) => {
    const error = req.query.error ? req.query.error : null;
    const directory = await directoryModel.getDirectoryById(req.params.id);
    res.render('directory/view', { directory, title: global.config.WEB.name, user: req.user, error });
}

exports.addDirectory = async (req, res) => {
    //Get user id from jwt
    req.body.created_user = req.user.id;
    directoryModel.createDirectory(req.body);
    res.status(200).redirect('/directory');
}

exports.deleteDirectory = async (req, res) => {
    const directory = await directoryModel.deleteDirectory(req.params.id).catch((err) => {
        if (err) throw err;
    });
    res.status(200).json('Delete Succesfully');
}

exports.updateDirectory = async (req, res) => {
    const directory = await directoryModel.updateDirectory(req.params.id, req.body).catch((err) => {
        if (err) throw err;
    });
    res.status(200).json('Update Succesfully');
}