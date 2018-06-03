const router = require('express').Router()
const { addSupplier, getAllSuppliers, updateSupplier, deleteSupplier } = require('../controllers/supplier.controller')
const { loginAuthentication } = require('../middlewares/auth')

router.post('/add', loginAuthentication, addSupplier)
      .get('/', loginAuthentication, getAllSuppliers)
      .put('/update/:id', loginAuthentication, updateSupplier)
      .delete('/delete/:id', loginAuthentication, deleteSupplier)

module.exports = router