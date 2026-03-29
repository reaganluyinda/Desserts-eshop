
const productsRouter = require('express').Router()

let products = [
    {
        id: 1, name: "Product 1"
    }
]

// productsRouter.get('/', (request, response) => {
// response.send('hello world')
// })

productsRouter.get('/', (request, response) => {
    response.json(products)
})

module.exports = productsRouter
