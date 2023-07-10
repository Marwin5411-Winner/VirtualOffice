const { pool } = require("../configs/db");
const bcrypt = require('bcryptjs')

async function findUserById(id) {
  const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
  return rows[0];
}

async function checkUser(username, password) {
  const refactorData = (arr) => {
    return arr.map((item) => {
      return {
        id: item.id,
        userName: item.username,
        realName: item.realName,
        unit: item.unit,
        // rank: item.rank,
        admin: item.admin,
      };
    });
  };
  const [rows] = await pool.query(
    `SELECT * FROM users WHERE username = ?`,
    username
  );
  const match = await bcrypt.compare(password, rows[0].password);
  if (match) {
    //console.log(rows[0])
    console.log(refactorData(rows)[0]);
    return refactorData(rows)[0];
  } else {
    return 'Email or password is incorrect'
  }
}

async function createUser(user) {
  let password = await bcrypt.hash(user.password, 10);
  if (global.config.goverment) {
    const [err] = await pool.query(
      `INSERT INTO users (username, password, unit, rank, admin, tel, email, address, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.username,
        password,
        user.unit,
        user.rank,
        user.admin,
        user.tel,
        user.email,
        user.address,
        user.role,
      ]
    );
    if (err) throw err;
    return user;
  } else {
     await pool.query(
      `INSERT INTO users (username, password, admin, tel, email, address, role) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        user.username,
        password,
        user.admin,
        user.tel,
        user.email,
        user.address,
        user.role,
      ]
    ).catch((err) => { 
      if (err) throw err;
      return user;
    })
    
  }
}

async function getUsers() {
  const [rows] = await pool.query(`SELECT * FROM users`)
    .catch((err) => {
      if (err) throw err;
    });
  return rows;
}

async function getUserById(id) {
  const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, id)
    .catch((err) => {
      if (err) throw err;
  });
}

async function deleteUser(id) {
  const [err] = await pool.query(`DELETE FROM users WHERE id = ?`, id)
    .catch((err) => {
      if (err) throw err;
    });
  return;
}

async function getRoles() {
  const [rows] = await pool.query(`SELECT * FROM userRoles`)
     .catch((err) => {
      if (err) throw err;
    });
  return rows;
}

async function createRole(role) {
  const [err] = await pool.query(
    `INSERT INTO userRoles (name, permissions) VALUES (?, ?)`,
    [role.role, role.roleperms]
  ).catch((err) => {
    if (err) throw err;
    return;
  });
  return;
}

async function deleteRole(role) {
  const [err] = await pool.query(
    `DELETE FROM userRoles WHERE id = ?`,
    [role]
  ).catch((err) => {
    if (err) throw err;
    return;
  });
  return;
}

async function updateRole(role) {
  const [err] = await pool.query(
    `UPDATE userRoles SET name = ?, permissions = ? WHERE id = ?`,
    [role.role, role.roleperms, role.id]
  ).catch((err) => {
    if (err) throw err;
    return;
  });
  return;
}

module.exports = { checkUser, createUser, findUserById, getUsers, getRoles, createRole, deleteRole, updateRole, deleteUser, getUserById }
