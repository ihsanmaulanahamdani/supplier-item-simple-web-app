const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  supplier: String,
  code: String,
  name: String,
  type: String,
  quantity: Number,
  unit: String
})

itemSchema.pre('save', function (next) {
  this
    .model('User')
    .update({
        _id: this.admin
      }, {
        $push: {
          items: this._id
        }
      }, {
        multi: true
      },
      next
    )
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item