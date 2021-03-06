const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const uuid = require('uuid/v4')
const auth = require('../../middleware/auth')
const sendEmail = require('../../utils/sendEmail')
// Models
const User = require('../../models/User')
const Company = require('../../models/Company')

// @type    :   GET
// @route   :   api/user
// @desc    :   Get an array of all users
// @access  :   PRIVATE
router.get('/', auth('all'), async (req, res) => {
  try {
    const users = await User.find()
      .populate('company', 'name _id')
      .select('-password')
    res.json(users)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server Error')
  }
})

// @type    :   GET
// @route   :   api/user/options
// @desc    :   Get an array of all users to use as OPTIONS
// @access  :   PRIVATE
router.get('/options', auth('all'), async (req, res) => {
  try {
    const users = await User.find().select(
      '-password -company -department -role -createdOn -changePasswordToken -active'
    )
    let options = []
    for (let i = 0; i < users.length; ++i) {
      options.push({
        _id: users[i]._id,
        id: users[i]._id,
        text: `${users[i].firstName} ${users[i].lastName}`,
      })
    }
    res.json(options)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server Error')
  }
})

// @type    :   GET
// @route   :   api/user/:id
// @desc    :   Get an array of all users
// @access  :   PRIVATE
router.get('/:id', auth('all'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('company', 'name _id')
      .select('-password -changePasswordToken')
    res.json(user)
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
      // store temporary password
      const tempPass = password
      // Encrypt password
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
      // Save user instance to DB
      await user.save()
      // Send email to new user
      const emailData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: user.changePasswordToken,
        template: 'newStaff',
        tempPass,
      }
      const emailRes = await sendEmail(emailData)

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
    await user.remove()
    return res.json({ msg: 'User removed' })
  } catch (err) {
    console.error(err.message)
    return err.kind === 'ObjectId'
      ? res.status(404).json({ errors: [{ msg: 'User not found' }] })
      : res.status(500).send('Server Error')
  }
})

// @type    :   PUT
// @route   :   api/user/:id
// @desc    :   Update user details
// @access  :   PRIVATE/admin
router.put(
  '/:id',
  [
    auth('admin'),
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
  ],
  async (req, res) => {
    // Handle req params to see if information is valid
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    // if no errors
    try {
      const user = await User.findById(req.params.id)
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User does not exist' }] })
      }
      // if user exists
      const { firstName, lastName, email, company, department, role } = req.body
      user.firstName = firstName
      user.lastName = lastName
      user.email = email
      user.company = company
      user.department = department
      user.role = role

      // save user
      await user.save()
      return res.json({ msg: 'User has been modified' })
    } catch (err) {
      console.error(err)
      if (err.message.includes('E11000')) {
        return res.json({ errors: [{ msg: 'Email has already been taken' }] })
      }
      return err.kind === 'ObjectId'
        ? res.status(404).json({ errors: [{ msg: 'User not found' }] })
        : res.status(500).send('Server Error')
    }
  }
)

// @type    :   PUT
// @route   :   api/user/activate/:changePasswordToken
// @desc    :   Activate newly registered account
// @access  :   PUBLIC
router.put('/activate/:changePasswordToken', async (req, res) => {
  const { currentPassword, newPassword } = req.body
  const { changePasswordToken } = req.params
  try {
    // find user who has same changePasswordToken
    const user = await User.findOne({ changePasswordToken })
    // if no user found
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
    }
    // match password in DB to password submitted
    const isMatch = await bcrypt.compare(currentPassword, user.password)
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
    }
    // if isMatched. change from currentPassword to new password
    // Encrypt password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(newPassword, salt)
    // change user to active
    user.active = true
    // delete changePasswordToken
    user.changePasswordToken = ''
    // save user to DB
    await user.save()
    return res.json({ msg: 'Account has been activated' })
  } catch (err) {
    console.error(err.message)
    return err.kind === 'ObjectId'
      ? res.status(404).json({ errors: [{ msg: 'Account not found' }] })
      : res.status(500).send('Server Error')
  }
})

// @type    :   POST
// @route   :   api/user/recover-password
// @desc    :   Recover a lost password
// @access  :   PUBLIC
router.post('/recover-password', async (req, res) => {
  const { email } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'No user exists with that email' }] })
    }
    // Create changePasswordToken
    const changePasswordToken = uuid()
    user.changePasswordToken = changePasswordToken
    user.active = false
    // send email to user with new changePasswordToken
    const emailData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: user.changePasswordToken,
      template: 'recoverPassword',
    }
    const emailRes = await sendEmail(emailData)

    if (emailRes.message.includes('Queued')) {
      // make changes to DB
      await user.save()
      return res.json({ msg: 'Password Recovery email sent', data: emailRes })
    } else {
      return res.status(400).json({ errors: [{ msg: emailRes }] })
    }
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server Error')
  }
})

// @type    :   PUT
// @route   :   api/user/recover-password/:changePasswordToken
// @desc    :   Change password
// @access  :   PUBLIC
router.put('/recover-password/:changePasswordToken', async (req, res) => {
  const { newPassword } = req.body
  const { changePasswordToken } = req.params
  try {
    const user = await User.findOne({ changePasswordToken })
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
    }
    // Encrypt password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(newPassword, salt)
    // change user to active
    user.active = true
    // delete changePasswordToken
    user.changePasswordToken = ''
    // save user to DB
    await user.save()
    return res.json({ msg: 'Password has been changed' })
  } catch (err) {
    console.error(err.message)
    return err.kind === 'ObjectId'
      ? res.status(404).json({ errors: [{ msg: 'Account not found' }] })
      : res.status(500).send('Server Error')
  }
})

module.exports = router
