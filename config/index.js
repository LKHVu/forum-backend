module.exports = {
    database: 'mongodb://huy:web123@ds223253.mlab.com:23253/webforum',
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
