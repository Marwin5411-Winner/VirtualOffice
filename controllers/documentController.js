const Document = require('../models/documentModel');
const fs = require('fs');
const Category = require('../models/documentCategoryModel');

const getDocumentById = async (req, res) => {
    //i need to get the id from params and then get the document from the database
    let data = await Document.getById(req.params.id);
    if (data) {
        res.status(200).render('document/view', { title : global.config.WEB.name, document: data, user: req.user});
    } else {
        res.status(404).send('Not Found');
    }
}

const getDocumentList = async (req, res) => {
    let data = await Document.getAll();
    data.category = await Category.getAll();
    console.log(data.category);
    if (data) {
        res.status(200).render('document/list', { title : global.config.WEB.name, documents: data, user: req.user});
    } else {
        res.status(404).send('Not Found');
    }
}

const uploadDocument = async (req,res) => {
    let { filename, mimetype, size, path } = req.file;
    // Use the path variable to access the path of the uploaded file
    console.log('File uploaded:', filename);
    console.log('File size:', size);
    console.log('File type:', mimetype);
    console.log('File path:', path);
    Document.create(req.body.title, filename, mimetype, size, path, req.body.category).catch((err) => {
        if (err) throw err;
    });

    // ... rest of the code
}

const deleteDocument = async (req, res) => {
    //i need to get the id from params and then get the document from the database and delete the file from the server
    let data = await Document.getById(req.params.id);
    if (data) {
        Document.deleteById(req.params.id).catch((err) => {
            if (err) throw err;
        });
        // Delete the file from the server using fs.unlink function
        fs.unlink(data.path, (err) => {
            if (err) throw err;
            console.log('File deleted:', data.path);
        });
        res.status(200).send('Deleted');
    } else {
        res.status(404).send('Not Found');
    }
}

const updateDocument = async (req, res) => {
    //i need to get the id from params and then get the document from the database and delete the file from the server
    let data = await Document.getById(req.params.id);
    if (data) {
        Document.updateById(req.params.id, req.body.title, data.filename, data.mimetype, data.size, data.path, data.category).catch((err) => {
            if (err) throw err;
        });
        res.status(200).send('Updated');
    } else {
        res.status(404).send('Not Found');
    }
}

const deleteCategory = async (req, res) => {
    //i need to get the id from params and then get the document from the database and delete the file from the server
    let data = await Category.getById(req.params.id);
    if (data) {
        Category.deleteById(req.params.id).catch((err) => {
            if (err) throw err;
        });
        res.status(200).send('Deleted');
    } else {
        res.status(404).send('Not Found');
    }
}

const createCategory = async (req, res) => {
    //create a new category
    Category.create(req.body.name).catch((err) => {
        if (err) throw err;
    });
    res.status(200);
}



module.exports = { getDocumentById, getDocumentList, uploadDocument, deleteDocument, updateDocument, deleteCategory, createCategory }