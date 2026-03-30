
const productsRouter = require('express').Router()
const Product = require('../models/product')

let products = [
    {
        id: 1, name: "Product 1", description: "This is product 1", price: 10.99
       
    },
    {
         id: 2, name: "Product 2", description: "This is product 2", price: 19.99
    }
]


//fetch all products
productsRouter.get('/', async(request, response) => {
const products = await Product.find({})
    response.json(products)
})

//fetch a single product by id
productsRouter.get('/:id', async (request,response) => {
 const product = await Product.findById(request.params.id)
 if(product){
response.json(product)
 }
 else{
    response.status(404).json({ error: "Product not found" })
 }
    
})

//add a new product
productsRouter.post('/', async (request, response) =>{
    const body = request.body
    const product = new Product({
        name: body.name,
        description: body.description,
        price: body.price
    })
   const savedProduct = await product.save()
   response.status(201).json(savedProduct)
})

//delete a product by id
productsRouter.delete('/:id', (request, response) => {
    const id =Number(request.params.id)
    products = products.filter(p => p.id !== id)
    response.status(204).end()
})

//update a product by id
productsRouter.put('/:id', (request, response)=>{
    const id = Number(request.params.id)
    const body = request.body
    const productIndex = products.findIndex(p => p.id === id)
    if(productIndex === -1){
        response.status(404).json({ error: "Product not found" })
        return
    }
    const updatedProduct = {...products[productIndex], ...body}
    products[productIndex] = updatedProduct
    response.status(200).json(updatedProduct)
})

module.exports = productsRouter
