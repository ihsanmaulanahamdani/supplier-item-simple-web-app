const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const supplierSchema = new Schema({
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  code: String,
  name: String,
  address: String,
  phone: String
})

supplierSchema.pre('save', function (next) {
  this
    .model('User')
    .update({
        _id: this.admin
      }, {
        $push: {
          suppliers: this._id
        }
      }, {
        multi: true
      },
      next
    )
})

const Supplier = mongoose.model('Supplier', supplierSchema)

module.exports = Supplier