const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const Company = require('../../models/Company')
const auth = require('../../middleware/auth')

// @type    :   GET
// @route   :   api/company
// @desc    :   Get a list of all companies
// @access  :   PRIVATE
router.get('/', auth('all'), async (req, res) => {
  try {
    const companies = await Company.find()
    res.json(companies)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @type    :   POST
// @route   :   api/company
// @desc    :   Create new company
// @access  :   PRIVATE/admin
router.post(
  '/',
  [
    auth('admin'),
    [
      // Validation
      check('name', 'Company Name is required')
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
    const { name } = req.body
    try {
      // see if company already exists
      let company = await Company.findOne({ name })
      // handle duplicate entry
      if (company) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Company already exists' }] })
      }
      // add new entry
      company = new Company({ name })
      await company.save()
      return res.json({ msg: 'Company created' })
    } catch (err) {
      console.error(err.message)
      return res.status(500).send('Server Error')
    }
  }
)

module.exports = router
