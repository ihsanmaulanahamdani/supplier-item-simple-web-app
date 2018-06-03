require('dotenv').config()
const express  = require('express')
const cors     = require('cors')
const logger   = require('morgan')
const mongoose = require('mongoose')
const port     = process.env.PORT || 3000
mongoose.connect('mongodb://suplaibarang:barangsuplai@ds135760.mlab.com:35760/suplai-barang')

const app = express()

const indexRouter    = require('./routes/index.router')
const itemRouter = require('./routes/item.router')
const supplierRouter    = require('./routes/supplier.router')

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
  console.log('success connect to database mongoose')
})

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter)
app.use('/items', itemRouter)
app.use('/suppliers', supplierRouter)

app.listen(3000, () => {
  console.log('Listening on Port 3000')
})

module.exports = app