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

// 'this' is the application being removed.
ApplicationSchema.pre('remove', async function(next) {
  const Permission = mongoose.model('permission')
  await Permission.deleteMany({ _id: { $in: this.permissions } })
  next()
})

module.exports = Application = mongoose.model('application', ApplicationSchema)
