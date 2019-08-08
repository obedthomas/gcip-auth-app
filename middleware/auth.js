const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = role => {
  return (req, res, next) => {
    // get token from header
    const token = req.header('Authorization')
    // check if there is a token
    if (!token) {
      return res
        .status(401)
        .json({ errors: [{ msg: 'No token, authorization denied' }] })
    }
    try {
      const decoded = jwt.verify(token.substring(7), config.get('jwtSecret'))
      req.user = decoded.user
      // check active status
      if (!req.user.active)
        return res
          .status(401)
          .json({ errors: [{ msg: 'Account is inactive' }] })
      // check if role requirment is correct
      if (
        role === 'all' ||
        req.user.role.toLowerCase() === 'admin' ||
        req.user.role.toLowerCase() === role
      ) {
        next()
      } else {
        return res
          .status(401)
          .json({ errors: [{ msg: 'Insufficient privileges' }] })
      }
    } catch (err) {
      return res.status(401).json({ errors: [{ msg: 'Token is not valid' }] })
    }
  }
}
