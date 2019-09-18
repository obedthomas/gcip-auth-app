const router = require('express').Router()
const ObjectId = require('mongoose').Types.ObjectId
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
    const apps = await App.find()
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
    const app = await App.findById(req.params.id).populate({
      path: 'permissions',
      populate: {
        path: 'users',
        model: 'user',
        select: 'firstName lastName',
      },
    })
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
      check('permissionName', 'Name of permission is required')
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
      const { permissionName, users } = req.body

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
      // check if permission name already exists inside current application doc
      for (const permission of app.permissions) {
        const r = await Permission.findById(permission._id)
        console.log(permissionName)
        if (r.permissionName === permissionName) {
          return res.status(400).json({
            errors: [
              {
                msg: `'${permissionName}' already exists in this application`,
              },
            ],
          })
        }
      }
      // create permission
      const permission = new Permission({
        permissionName,
        users: validatedUsers,
      })
      // save permission to db
      await permission.save()
      // add permission to app
      await app.permissions.push(permission)
      await app.save()
      return res.json({ msg: 'Permission Added' })
    } catch (err) {
      console.error(err.message)
      return err.kind === 'ObjectId'
        ? res.status(404).json({ errors: [{ msg: 'Application not found' }] })
        : res.status(500).send('Server Error')
    }
  }
)

// @type    :   PUT
// @route   :   api/application/permissions/:permissionId
// @desc    :   Edit permissions to an application
// @access  :   PRIVATE/admin
router.put(
  '/permissions/:permissionId',
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
      // if app exists
      const { name, users } = req.body
      const { permissionId } = req.params
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
      // does permission doc exist
      const permission = await Permission.findById(permissionId)
      // if no permission
      if (!permission) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Permission does not exist' }] })
      }
      // else
      permission.name = name
      permission.users = validatedUsers
      await permission.save()
      return res.json({ msg: 'Permission has been updated' })
    } catch (err) {
      console.error(err.message)
      return err.kind === 'ObjectId'
        ? res
            .status(404)
            .json({ errors: [{ msg: 'Permission does not exist' }] })
        : res.status(500).send('Server Error')
    }
  }
)

// @type    :   PUT
// @route   :   api/application/:id/2
// @desc    :   Update application
// @access  :   Private/admin
router.put(
  '/:id/2',
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

    try {
      // if no errors
      const { name, comments, permissions } = req.body
      // check if application exists
      let app = await App.findById(req.params.id)
      if (!app) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Application does not exist' }] })
      }

      // check if permissions are new or not
      let newPerms = []
      for (let i = 0; i < permissions.length; i++) {
        // check is object id is valid. new perms will NOT have a valid id
        if (!ObjectId.isValid(permissions[i]._id)) {
          let newUsers = []
          for (let y = 0; y < permissions[i].users.length; y++) {
            newUsers.push(`${permissions[i].users[y]._id}`)
          }
          const p = new Permission({
            permissionName: permissions[i].permissionName,
            users: newUsers,
          })
          // add new permission
          await p.save()
          newPerms.push(p)
        } else {
          // update existing permissions
          // search through db and update
          let currentUsers = []
          // for loop to clean up the array given by req. remove any unwanted details.
          for (let y = 0; y < permissions[i].users.length; y++) {
            currentUsers.push(`${permissions[i].users[y]._id}`)
          }
          let perm = await Permission.findByIdAndUpdate(permissions[i]._id, {
            permissionName: permissions[i].permissionName,
            users: currentUsers,
          })
        }
      }

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

// @type    :   DELETE
// @route   :   api/application/:id
// @desc    :   Delete an application and associated permissions
// @access  :   Private/admin
router.delete('/:id', auth('admin'), async (req, res) => {
  try {
    const app = await App.findById(req.params.id)
    if (!app) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Application does not exist' }] })
    }
    // if app exists
    // remove app from DB
    await app.remove()
    return res.json({ msg: 'Application has been deleted' })
  } catch (err) {
    console.error(err.message)
    return err.kind === 'ObjectId'
      ? res
          .status(404)
          .json({ errors: [{ msg: 'Application does not exist' }] })
      : res.status(500).send('Server Error')
  }
})

module.exports = router

// EXAMPLE OF UPDATING INSIDE NESTED ARRAYS
// const data = await App.findOneAndUpdate(
//   {
//     _id: id,
//     permissions: permissionId,
//   },
//   {
//     $set: { 'permissions.$.name': name, 'permissions.$.users': users },
//   },
//   {
//     select: {
//       permissions: {
//         $elemMatch: { _id: permissionId },
//       },
//     },
//   }
// )
