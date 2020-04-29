const { createProxyMiddleware } = require('http-proxy-middleware');


//this is used to avoid any CORS issue
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
        })
    );
};