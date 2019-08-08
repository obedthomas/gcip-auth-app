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
      name: {
        type: String,
        required: true,
      },
      users: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
      ],
      read: { type: Boolean, required: true },
      write: { type: Boolean, required: true },
    },
  ],
  comments: {
    type: String,
  },
})

module.exports = Application = mongoose.model('application', ApplicationSchema)
