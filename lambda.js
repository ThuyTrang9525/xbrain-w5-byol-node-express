// lambda.js
const serverless = require('serverless-http');
const app = require('./app'); // Import ứng dụng Express gốc

// Bọc app Express lại và export làm handler cho Lambda
module.exports.handler = serverless(app);