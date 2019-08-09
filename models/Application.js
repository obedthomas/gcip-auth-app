const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  permissions: [
    {
      name: {
        type: String,
        required: true,
        unique: true,
      },
      users: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
      ],
    },
  ],
  comments: {
    type: String,
  },
})

module.exports = Application = mongoose.model('application', ApplicationSchema)
