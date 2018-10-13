require('dotenv').config()

module.exports = {
    database: {
        url:'mongodb://huy:web123@ds223253.mlab.com:23253/webforum',
        host: process.env.DB_HOST || 'localhost',
        name: process.env.DB_NAME || 'name',
        dialect: process.env.DB_DIALECT || 'mongo',
        user: process.env.DB_USER || 'huy',
        password: process.env.DB_PASSWORD || 'web123',
        
    },
    server: {
        port: process.env.PORT || 8000,
        app: process.env.APP || 'dev',
    },
    jsonwt: {
        secret: 'MyNameJeff',
        expiresIn: '1d',
        issuer: 'Web Forum'
    },
}
