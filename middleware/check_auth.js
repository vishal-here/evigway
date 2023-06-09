const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if(req.method==='OPTIONS') return next() ;
  try {
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error('Authentication failed! No token found');
    }
    console.log( "print ho ja bhai")
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
     req.userData = { userId: decodedToken.userId };
    return next();
  } catch (err) {
    const error = new Error('Authentication failed!');
    return next(error);
  }
};