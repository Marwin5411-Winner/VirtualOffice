const { pool } = require('../configs/db');

async function getById(id) {
    if (!id) {
        return;
    }
    const [ rows, err ] = await pool.query('SELECT * FROM documents WHERE id = ?', id).catch((err) => {
        if (err) throw err;
    });
    return rows[0];
}

async function create(title, filename, mimetype, size, path, category) {
    const [ err ] = await pool.query('INSERT INTO documents (title, filename, mimetype, size, path, category) VALUES (?, ?, ?, ?, ?, ?)',
    [title, filename, mimetype, size, path, category]).catch((err) => {
        if (err) throw err;
    })
    return;
}

async function getAll() {
    const [ rows, err ] = await pool.query('SELECT * FROM documents').catch((err) => {
        if (err) throw err;
    })
    return rows;
}

async function deleteById(id) {
    if (!id) {
        return;
    }
    const [ err ] = await pool.query('DELETE FROM documents WHERE id = ?', id).catch((err) => {
        if (err) throw err;
    })
    return;
}

async function updateById(id, title, filename, mimetype, size, path, category) {
    if (!id) {
        return;
    }
    const [ err ] = await pool.query('UPDATE documents SET title = ?, filename = ?, mimetype = ?, size = ?, path = ?, category = ? WHERE id = ?',
    [title, filename, mimetype, size, path, category, id]).catch((err) => {
        if (err) throw err;
    })
    return;
}

module.exports = { getById, create, getAll, deleteById, updateById }
