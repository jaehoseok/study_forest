const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: "http://211.37.147.101:8000",
            // target: 'http://3.37.98.10:8080/',
            changeOrigin: true,
        })
    );
};