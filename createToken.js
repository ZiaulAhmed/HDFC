// createToken.js
const jwt = require('jsonwebtoken');
const secret = require('./src/config').jwtSecret || 'change_this_secret';

const token = jwt.sign({ userId: 'test-user', role: 'tester' }, secret, { expiresIn: '1h' });
console.log(token);
