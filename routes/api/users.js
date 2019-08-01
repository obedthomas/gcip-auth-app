const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../../models/User')
const auth = require('../../middleware/auth')

// @type    :   POST
// @route   :   api/users/register
// @desc    :   Register a new user
// @access  :   Private
router.post(
  '/register',
  [
    auth('admin'),
    [
      // Validation
      check('firstName', 'First name is required')
        .not()
        .isEmpty(),
      check('lastName', 'Last name is required')
        .not()
        .isEmpty(),
      check('role', 'Role must be assigned')
        .not()
        .isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check(
        'password',
        'Please enter a password with 6 or more characters'
      ).isLength({ min: 6 }),
    ],
  ],
  async (req, res) => {
    // Handle req params to see if information is valid
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    // if no errors
    const { firstName, lastName, email, password, role } = req.body

    try {
      // See if user exists
      let user = await User.findOne({ email })
      console.log(role)
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] })
      }
      // Create new user instance
      user = new User({
        firstName,
        lastName,
        email,
        password,
        role,
      })
      // Encrypt password
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
      // Save user instance to DB
      await user.save()
      // Return JWT to automatically log user in.
      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      }
      // create JWT
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: config.get('tokenExpiryTime'),
        },
        (err, token) => {
          if (err) {
            throw err
          } else {
            return res.json({ token })
          }
        }
      )
    } catch (err) {
      console.error(err.message)
      return res.status(500).send('Server Error')
    }
  }
)

// @type    :   DELETE
// @route   :   api/users/:id
// @desc    :   Delete a user
// @access  :   PRIVATE/admin
router.delete('/:id', auth('admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ msg: 'User not found' })
    user.remove()
    return res.json({ msg: 'User removed' })
  } catch (err) {
    console.error(err.message)
    return err.kind === 'ObjectId'
      ? res.status(404).json({ msg: 'User not found' })
      : res.status(500).send('Server Error')
  }
})

module.exports = router
