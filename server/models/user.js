const bcrypt   = require('bcryptjs')
const mongoose = require('mongoose')
const Schema   = mongoose.Schema

let userSchema = new Schema({
  username: {
    type: String,
    required: [ true, 'please input your name' ]
  },
  password: {
    type: String
  },
  role: String,
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }],
  suppliers: [{
    type: Schema.Types.ObjectId,
    ref: 'Supplier'
  }]
}, {
  timestamps: true
})

userSchema.pre('save', function (next) {
  let user = this

  bcrypt.genSalt(10, function (errSalt, salt) {
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (!err) {
        user.password = hash
        next()
      } else {
        next(err)
      }
    })
  })
})

userSchema.methods.compareHash = (password, hash, callback) => {
  bcrypt.compare(password, hash, (err, result) => {
    if (!err) {
      callback(null, result)
    } else {
      callback(err, null)
    }
  })
}

const User =mongoose.model('User', userSchema)

module.exports = User