const router = require('express').Router()
const { addItem, getAllItems, deleteItem } = require('../controllers/item.controller')
const { loginAuthentication } = require('../middlewares/auth')

router.post('/add', loginAuthentication, addItem)
      .get('/', loginAuthentication, getAllItems)
      .delete('/delete/:id', loginAuthentication, deleteItem)

module.exports = router