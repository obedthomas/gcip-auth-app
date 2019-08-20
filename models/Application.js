const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  permissions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'permission',
    },
  ],
  comments: {
    type: String,
  },
})

module.exports = Application = mongoose.model('application', ApplicationSchema)
