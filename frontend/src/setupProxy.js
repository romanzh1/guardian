const { createProxyMiddleware } = require('http-proxy-middleware');

const apiTarget = process.env.REACT_APP_API_TARGET;

// eslint-disable-next-line
console.log('API target: ', apiTarget);

if (!apiTarget) {
  throw new Error('Empty API target, check .env file');
}

module.exports = app => {
  app.use(
    ['http://localhost:8080/api', '/passport'],
    createProxyMiddleware({
      target: apiTarget,
      secure: false,
      changeOrigin: true,
    }),
  );
};
