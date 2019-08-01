const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = role => {
  return (req, res, next) => {
    // get token from header
    const token = req.header('Authorization')
    // check if there is a token
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' })
    }
    try {
      const decoded = jwt.verify(token.substring(7), config.get('jwtSecret'))
      req.user = decoded.user
      // check if role requirment is correct
      if (
        role === 'all' ||
        req.user.role === 'admin' ||
        req.user.role === role
      ) {
        next()
      } else {
        res.status(401).json({ msg: 'Insufficient Privileges' })
      }
    } catch (err) {
      res.status(401).json({ msg: 'Token is not valid' })
    }
  }
}
