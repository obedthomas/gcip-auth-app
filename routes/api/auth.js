const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../../models/User')
const auth = require('../../middleware/auth')
const jwt = require('jsonwebtoken')
const config = require('config')

// @type    :   GET
// @route   :   api/auth
// @desc    :   Get user details
// @access  :   Private
router.get('/', auth('all'), async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @type    :   POST
// @route   :   api/auth
// @desc    :   Authenticate user and get token
// @access  :   Public
router.post(
  '/',
  [
    // Validation
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    // handle req params to see if information is valid
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body
    try {
      // see if user exists
      let user = await User.findOne({ email })
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] })
      }
      // match email and password to DB - use bcrypt to compare
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
      }

      // return JWT to auto log user in
      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      }
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: config.get('tokenExpiryTime') },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

module.exports = router
