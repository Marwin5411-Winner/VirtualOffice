const { pool } = require('../configs/db');

async function getAll() {
    const [rows] = await pool.query(`SELECT * FROM directory`)
        .catch((err) => {
            if (err) throw err;
        }
    );
    return rows;
}

async function getDirectoryById(id) {
    const [rows] = await pool.query(`SELECT * FROM directory WHERE id = ?`, id)
        .catch((err) => {
            if (err) throw err;
        }
    );
    return rows[0];
}

async function deleteDirectory(id) {
    const [err] = await pool.query(`DELETE FROM directory WHERE id = ?`, id)
        .catch((err) => {
            if (err) throw err;
        }
    );
    return;
}

async function createDirectory(directory) {
    const [err] = await pool.query(
        `INSERT INTO directory (name, home, phone, email, company, website, address, type, status, created_user, note) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [directory.name, directory.home, directory.phone, directory.email, directory.company, directory.website, directory.address, directory.type, directory.status, directory.created_user, directory.note]
    ).catch((err) => {
        if (err) throw err;
        return;
    });
    return;
}

async function updateDirectory(id, directory) {
    const [err] = await pool.query(`UPDATE directory SET name = ?, home = ?, phone = ?, email = ?, company = ?, website = ?, address = ?, type = ?, status = ?, note = ? WHERE id = ?`,
        [directory.name, directory.home, directory.phone, directory.email, directory.company, directory.website, directory.address, directory.type, directory.status, directory.note, id])
        .catch((err) => {
            if (err) throw err;
        });
    return;
}

module.exports = { getAll, getDirectoryById, deleteDirectory, createDirectory, updateDirectory};