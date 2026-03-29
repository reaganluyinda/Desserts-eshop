const express = require('express')
const morgan = require('morgan')
const productsRouter = require('./controllers/products')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))
app.use('/api/products', productsRouter)

module.exports = app