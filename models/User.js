const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  changePasswordToken: {
    type: String,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'company',
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
})

// not using arrow function because 'this' will refer to the current company
// 'this' is the user being removed.
UserSchema.pre('remove', async function(next) {
  const Permission = mongoose.model('permission')
  const permissions = await Permission.find({ users: this._id })
  for (const perm of permissions) {
    await perm.users.pull({ _id: this._id })
    await perm.save()
  }
  next()
})

module.exports = User = mongoose.model('user', UserSchema)
