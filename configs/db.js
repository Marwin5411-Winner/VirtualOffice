const mysql = require('mysql2');
const pool = mysql.createPool({
    host: global.config.db.host,
    user: global.config.db.user,
    password: global.config.db.pass,
    database: global.config.db.database,
    port: global.config.db.port,
    waitForConnections: true,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0
  }).promise();



module.exports = { pool };