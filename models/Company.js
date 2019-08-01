const mongoose = require('mongoose')

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
})

module.exports = Company = mongoose.model('company', CompanySchema)
