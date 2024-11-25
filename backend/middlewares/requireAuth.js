const jwt = require('jsonwebtoken');
const config = require('../config');

const requireAuth = (req, res, next) => {
  const token = 'Bearer ' + req.body.token;
  console.log('Bearer token =>', token);
  if (!token) {
    return res.status(401).json({ message: 'Authentication invalid.' });
  }

  try {
    const decodedToken = jwt.verify(token.slice(7), config.jwt.secret, {
      algorithm: 'HS256',
      expiresIn: config.jwt.expiry
    });

    req.user = decodedToken;
    next();
    
  } catch (error) {
    return res.status(401).json({
      message: error.message
    });
  }
};

module.exports = requireAuth;
