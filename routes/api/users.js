const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const uuid = require('uuid/v4')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../../middleware/auth')
const newUserEmail = require('../../utils/newUserEmail')
// Models
const User = require('../../models/User')
const Company = require('../../models/Company')

// @type    :   GET
// @route   :   api/user
// @desc    :   Get an array of all users
// @access  :   PRIVATE
router.get('/', auth('all'), async (req, res) => {
  try {
    const users = await User.find().select('-password')
    res.json({ users })
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server Error')
  }
})

// @type    :   POST
// @route   :   api/user/register
// @desc    :   Register a new user
// @access  :   PRIVATE/admin
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
      check('role', 'Role is required')
        .not()
        .isEmpty(),
      check('department', 'Department is required')
        .not()
        .isEmpty(),
      check('company', 'Company is required')
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
    const {
      firstName,
      lastName,
      email,
      password,
      role,
      department,
      company,
    } = req.body

    try {
      // See if user exists
      let user = await User.findOne({ email })
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] })
      }
      // See if company is valid
      const isCompany = await Company.findById(company)
      if (!isCompany)
        res.status(404).json({ errors: [{ msg: 'Company does not exist' }] })
      // Create changePasswordToken
      const changePasswordToken = uuid()
      // Create new user instance
      user = new User({
        firstName,
        lastName,
        email,
        password,
        role,
        department,
        company,
        changePasswordToken,
      })
      // Encrypt password
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
      // Save user instance to DB
      await user.save()
      // Send email to new user
      const emailRes = await newUserEmail(
        user.firstName,
        user.lastName,
        user.email,
        user.changePasswordToken
      )
      if (emailRes.message.includes('Queued')) {
        return res.json({ msg: 'User created', data: emailRes })
      } else {
        return res.status(400).json({ errors: [{ msg: emailRes }] })
      }
    } catch (err) {
      console.error(err.message)
      return res.status(500).send('Server Error')
    }
  }
)

// @type    :   DELETE
// @route   :   api/user/:id
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
