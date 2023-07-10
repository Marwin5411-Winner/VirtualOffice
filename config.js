module.exports = {
    JWTtoken: 'vitual_office',
    hashToken: 'cJNDDEVJGm',
    db: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        pass: process.env.DB_PASS || 'root',
        database: process.env.DB_NAME || 'v_office',
        port: process.env.DB_PORT || 3306,
    },
    WEB: {
        name: 'Virtual Office',
    },
    PORT: process.env.PORT || 3000,
};