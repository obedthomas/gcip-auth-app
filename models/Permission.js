const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PermissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
})

module.exports = Permission = mongoose.model('permission', PermissionSchema)
