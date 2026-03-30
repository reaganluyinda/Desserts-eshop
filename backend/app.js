const express = require('express')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const morgan = require('morgan')
const productsRouter = require('./controllers/products')
const app = express()

logger.info('Connecting to MongoDb:', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, {family: 4})
.then(() => {
    logger.info('Connected to MongoDB')
})
.catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message)
})

app.use(express.json())
app.use(middleware.requestLogger)
app.use(morgan('dev'))


app.use('/api/products', productsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app