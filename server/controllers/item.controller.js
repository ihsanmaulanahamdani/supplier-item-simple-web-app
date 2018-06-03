const mongoose  = require('mongoose')
const secretKey = process.env.SECRETKEY_JWT
const jwt       = require('jsonwebtoken')
const Item      = require('../models/item')
const User      = require('../models/user')

module.exports = {
  addItem: (req, res) => {
    let { code, name, type, quantity, unit, supplier } = req.body
    let { token } = req.headers

    jwt
      .verify(token, secretKey, (errJwt, decoded) => {
        if (!errJwt) {
          let newItem = new Item({
            admin: decoded.id,
            code,
            name,
            type,
            quantity,
            unit,
            supplier
          })
      
          newItem
            .save()
            .then(item => {
              res
                .status(201)
                .json({
                  message: `Add Item ${item.name} Success`,
                  item
                })
            })
            .catch(err => {
              res
                .status(500)
                .json({
                  message: 'Something Went Wrong!!!',
                  err
                })
            })
        } else {
          res
            .status(500)
            .json({
              message: 'Something Went Wrong!!!',
              errJwt
            })
        }
      })
  },
  getAllItems: (req, res) => {
    let { token } = req.headers

    jwt
      .verify(token, secretKey, (errJwt, decoded) => {
        if (!errJwt) {
          Item
            .find()
            .populate('admin')
            .exec()
            .then(items => {
              res
                .status(200)
                .json({
                  message: `Get All Items Success`,
                  items
                })
            })
            .catch(err => {
              res
                .status(500)
                .json({
                  message: 'Something Went Wrong!!!',
                  err
                })
            })
        } else {
          res
            .status(500)
            .json({
              message: 'Something Went Wrong!!!',
              errJwt
            })
        } 
      })
  },
  deleteItem: (req, res) => {
    let { id } = req.params
    let { token } = req.headers

    jwt
      .verify(token, secretKey, (errJwt, decoded) => {
        if (!errJwt) {
          User
            .findOne({
              _id: decoded.id
            })
            .then(user => {
              let indexItem = user.items.indexOf(id)
  
              user.items.splice(indexItem, 1)
  
              User
                .update({
                  _id: decoded.id
                },
                  user
                )
                .then(userUpdated => {
                  Item
                    .findOneAndRemove({
                      _id: id
                    })
                    .then(deletedItem => {
                      res
                        .status(200)
                        .json({
                          message: `Delete Item ${deletedItem.name} Success`,
                          deletedItem
                        })
                    })
                })
            })
            .catch(err => {
              res
                .status(500)
                .json({
                  message: 'Something Went Wrong!!!',
                  err
                })
            })
        } else {
          res
            .status(500)
            .json({
              message: 'Something Went Wrong!!!',
              errJwt
            })
        }
      })
  }
}