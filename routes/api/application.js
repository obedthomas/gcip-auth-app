const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
// Models
const User = require('../../models/User')
const App = require('../../models/Application')
const Permission = require('../../models/Permission')

// @type    :   GET
// @route   :   api/application
// @desc    :   Get a list of all applications
// @access  :   PRIVATE
router.get('/', auth('all'), async (req, res) => {
  try {
    const apps = await App.find().select('-permissions')
    return res.json(apps)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @type    :   GET
// @route   :   api/application/:id
// @desc    :   Get details for single application
// @access  :   PRIVATE/admin
router.get('/:id', auth('admin'), async (req, res) => {
  try {
    const app = await App.findById(req.params.id)
    return res.json(app)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @type    :   POST
// @route   :   api/application
// @desc    :   Add an application to DB
// @access  :   PRIVATE/admin
router.post(
  '/',
  [
    auth('admin'),
    [
      // Validation
      check('name', 'Name of application is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    // Handle req params to see if information is valid
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      // if no errors
      const { name, comments } = req.body
      // check if application already exists
      let app = await App.findOne({ name })
      if (app) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Application already exists' }] })
      }
      // if app dosnt exist
      // create new App instance
      app = new App({ name, comments })
      // save App
      await app.save()
      // return
      return res.json({ msg: 'Application has been added' })
    } catch (err) {
      console.error(err.message)
      return res.status(500).send('Server Error')
    }
  }
)

// @type    :   PUT
// @route   :   api/application/:id
// @desc    :   Edit name and comments of application
// @access  :   PRIVATE/admin
router.put(
  '/:id',
  [
    auth('admin'),
    [
      // Validation
      check('name', 'Name of application is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    // Handle req params to see if information is valid
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      // if no errors
      const { name, comments } = req.body
      // check if application exists
      let app = await App.findById(req.params.id)
      if (!app) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Application does not exist' }] })
      }
      // if app exists
      // check if name already exists
      const isMatch = await App.findOne({ name })
      if (isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Application name already taken' }] })
      }
      // if name does not exist
      app.name = name
      app.comments = comments
      // save new app
      await app.save()
      // return
      return res.json({ msg: 'Application has been edited' })
    } catch (err) {
      console.error(err.message)
      return err.kind === 'ObjectId'
        ? res.status(404).json({ errors: [{ msg: 'Application not found' }] })
        : res.status(500).send('Server Error')
    }
  }
)

// @type    :   POST
// @route   :   api/application/:id/permissions
// @desc    :   Add permissions to an application
// @access  :   PRIVATE/admin
router.post(
  '/:id/permissions',
  [
    auth('admin'),
    [
      // Validation
      check('name', 'Name of permission is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    // Handle req params to see if information is valid
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    // if no errors
    try {
      // check if application exists
      let app = await App.findById(req.params.id)
      if (!app) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Application does not exist' }] })
      }
      // if app exists
      const { name, users } = req.body

      // validate all user ids
      let userErrors = []
      let validatedUsers = []
      for (const user of users) {
        const r = await User.findById(user)
        r
          ? validatedUsers.push(r._id)
          : userErrors.push({ msg: 'User not found', id: user })
      }
      // check if any users were not found
      if (userErrors.length > 0) {
        return res.status(400).json({ errors: userErrors })
      }
      // if all users are valid
      // create permission
      const permission = new Permission({
        name,
        users: validatedUsers,
      })
      // save permission to db
      await permission.save()
      // add permission to app
      await app.permissions.push(permission)
      await app.save()
      return res.json({ msg: 'Permissions Added' })
    } catch (err) {
      console.error(err.message)
      return err.kind === 'ObjectId'
        ? res.status(404).json({ errors: [{ msg: 'Application not found' }] })
        : res.status(500).send('Server Error')
    }
  }
)

// @type    :   PUT
// @route   :   api/application/:id/permissions/:permissionId
// @desc    :   Edit permissions to an application
// @access  :   PRIVATE/admin
router.put(
  '/:id/permissions/:permissionId',
  [
    auth('admin'),
    [
      // Validation
      check('name', 'Name of permission is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    // Handle req params to see if information is valid
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    // if no errors
    try {
      const app = await App.findById(req.params.id)
      // if no app
      if (!app) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Application does not exist' }] })
      }
      // if app exists
      const { name, users } = req.body
      const { id, permissionId } = req.params
      const data = await App.findOneAndUpdate(
        {
          _id: id,
          'permissions._id': permissionId,
        },
        {
          $set: { 'permissions.$.name': name, 'permissions.$.users': users },
        },
        {
          select: {
            permissions: {
              $elemMatch: { _id: permissionId },
            },
          },
        }
      )
      if (!data.toString().includes('Cast to ObjectId failed')) {
        return res.json({ msg: 'Permission has been updated' })
      }
    } catch (err) {
      console.error(err.message)
      return err.kind === 'ObjectId'
        ? res.status(404).json({ errors: [{ msg: 'Incorrect ID' }] })
        : res.status(500).send('Server Error')
    }
  }
)

module.exports = router
