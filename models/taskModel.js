const { pool } = require('../configs/db');
const { getRoles, getUsers, getUserById } = require('./UserModel');


exports.addTask = async (task) => {
    const [err] = await pool.query(
        'INSERT INTO tasks (name, content, created_user, status, assigned_user) VALUES (?, ?, ?, ?, ?)',
        [task.name, task.desc, task.user_id, task.status, task.assign_user]
    ).catch((err) => {
        if (err) throw err;
    });
    return;
}

exports.getTasks = async () => {
    //get all tasks and join with users table
    const [rows] = await pool.query(`SELECT tasks.*, 
       assigned_user.username AS assigned_user_name, 
       assigned_user.email AS assigned_user_email,
       created_user.username AS created_user_name,
       created_user.email AS created_user_email
FROM tasks
LEFT JOIN users AS assigned_user ON tasks.assigned_user = assigned_user.id
LEFT JOIN users AS created_user ON tasks.created_user = created_user.id`)
        .catch((err) => {
            if (err) throw err;
        });
    return rows;
}

exports.getTask = async (id) => {
    const [rows] = await pool.query(`SELECT * FROM tasks WHERE id = ?`, [id])
        .catch((err) => {
            if (err) throw err;
        });
    return rows[0];
}

exports.deleteTask = async (id) => {
    const [err] = await pool.query(`DELETE FROM tasks WHERE id = ?`, [id])
        .catch((err) => {
            if (err) throw err;
        });
    return;
}

exports.updateTask = async (id, task) => {
    const [err] = await pool.query(`UPDATE tasks SET name = ?, content = ?, status = ? WHERE id = ?`,
        [task.name, task.content, task.status, id])
        .catch((err) => {
            if (err) throw err;
        });
    return;
}

exports.getMyTasks = async (id) => {
    const [rows] = await pool.query(`SELECT * FROM tasks WHERE assigned_user = ?`, [id])
        .catch((err) => {
            if (err) throw err;
        });
    return rows;
}
