const router = require('express').Router()
const auth = require('../../middleware/auth')
// Models
const Company = require('../../models/Company')
const User = require('../../models/User')
const App = require('../../models/Application')
const Permission = require('../../models/Permission')

// @type    :   GET
// @route   :   api/stats/totals
// @desc    :   Get the totals for all collections in DB
// @access  :   PRIVATE
router.get('/totals', auth('all'), async (req, res) => {
  try {
    const companyTotal = await Company.find().estimatedDocumentCount()
    const userTotal = await User.find().estimatedDocumentCount()
    const appTotal = await App.find().estimatedDocumentCount()
    const permTotal = await Permission.find().estimatedDocumentCount()
    res.json({ companyTotal, userTotal, appTotal, permTotal })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
