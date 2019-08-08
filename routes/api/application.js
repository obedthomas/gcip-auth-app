const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
// Models
const User = require('../../models/User')
const App = require('../../models/Application')

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

module.exports = router
