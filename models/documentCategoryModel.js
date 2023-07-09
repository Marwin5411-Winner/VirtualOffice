const { pool } = require('../configs/db');
// const { logger } = require('../config/winston');

const table = 'documentsCategory';

exports.create = async function (name) {
    if (!name) {
        return;
    }
    const [ err ] = await pool.query(
        'INSERT INTO documentsCategory (name) VALUES (?)', name).catch((err) => {
        if (err) throw err;
    })
    return;
}

exports.updateById = async function (id, name) {
    const [ err ] = await pool.query(
        `UPDATE documentsCategory SET name = ? WHERE id = ?`,
        [name, id]
    ).catch((err) => {
        if (err) throw err;
    })
    return;
}

exports.deleteById = async function (id) {
    const [ err ] = await pool.query(
        `DELETE FROM documentsCategory WHERE id = ?`,
        id
    ).catch((err) => {
        if (err) throw err;
    })
    return;
}

exports.getAll = async function () {
    const [ rows, err ] = await pool.query(
        `SELECT * FROM ${table}`
    ).catch((err) => {
        if (err) throw err;
    });
    return rows;
}

exports.getById = async function (id) {
    const [ rows, err ] = await pool.query(
        `SELECT * FROM ${table} WHERE id = ?`,
        id
    ).catch((err) => {
        if (err) throw err;
    });
    return rows[0];
}