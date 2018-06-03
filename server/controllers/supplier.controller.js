const mongoose  = require('mongoose')
const secretKey = process.env.SECRETKEY_JWT
const jwt       = require('jsonwebtoken')
const Supplier  = require('../models/supplier')
const User      = require('../models/user')
const Item      = require('../models/item')

module.exports = {
  addSupplier: (req, res) => {
    let { code, name, address, phone } = req.body
    let { token } = req.headers

    jwt
      .verify(token, secretKey, (errJwt, decoded) => {
        if (!errJwt) {
          let newSupplier = new Supplier({
            admin: decoded.id,
            code,
            name,
            address,
            phone
          })
      
          newSupplier
            .save()
            .then(supplier => {
              res
                .status(201)
                .json({
                  message: `Add Supplier ${supplier.name} Success`,
                  supplier
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
  getAllSuppliers: (req, res) => {
    let { token } = req.headers

    jwt
      .verify(token, secretKey, (errJwt, decoded) => {
        if (!errJwt) {
          Supplier
            .find()
            .populate('admin')
            .exec()
            .then(suppliers => {
              res
                .status(200)
                .json({
                  message: `Get All Suppliers Success`,
                  suppliers
                })
            })
            .catch(err => {
              console.log('masuk error');
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
  updateSupplier: (req, res) => {
    let { id } = req.params
    let { code, name, address, phone } = req.body
    let { token } = req.headers

    jwt
      .verify(token, secretKey, (errJwt, decoded) => {
        if (!errJwt) {
          Supplier
            .findOneAndUpdate({
              _id: id
            }, {
              code,
              name,
              address,
              phone
            })
            .then(updatedSupplier => {
              res
                .status(200)
                .json({
                  message: `Update Supplier ${updatedSupplier.name} Success`,
                  updatedSupplier
                })
            })
            .catch(err => {
              res
                .status(500)
                .json({
                  message: `Something Went Wrong!!!`,
                  err
                })
            })
        } else {
          res
            .status(500)
            .json({
              message: `Something Went Wrong!!!`,
              errJwt
            })
        }
      })
  },
  deleteSupplier: (req, res) => {
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
              let indexSupplier = user.suppliers.indexOf(id)
  
              user.suppliers.splice(indexSupplier, 1)
  
              User
                .update({
                  _id: decoded.id
                },
                  user
                )
                .then(userUpdated => {
                  Supplier
                    .findOneAndRemove({
                      _id: id
                    })
                    .then(deletedSupplier => {
                      Item
                        .deleteMany({
                          supplier: deletedSupplier.name
                        })
                        .then(deletedItem => {
                          res
                            .status(200)
                            .json({
                              message: `Delete Data Supplier ${deletedSupplier.name} Success`,
                              deletedSupplier,
                              deletedItem
                            })
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