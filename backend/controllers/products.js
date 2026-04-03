
const productsRouter = require('express').Router()
const Product = require('../models/product')
const { error } = require('../utils/logger')


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
    response.status(404).json({ error: error.message })
  }

})

//add a new product
productsRouter.post('/', async (request, response, next) => {
  const body = request.body

  if(!body.name || !body.price){
    return response.status(400).json({ error: 'Name and price are required' })
  }
  try{
    const product = new Product({
      name: body.name,
      description: body.description,
      price: body.price
    })
    const savedProduct = await product.save()
    response.status(201).json(savedProduct)
  }
  catch(error){
    next(error)
  }

})

//delete a product by id
productsRouter.delete('/:id', async (request, response) => {
  const product = await Product.findByIdAndDelete(request.params.id)

  if(!product){
    return response.status(404).json({ error: 'Product not found' })
  }
  else{
    response.status(204).end()
  }
})

//update a product by id
productsRouter.put('/:id', async (request, response) => {
  const body = request.body

  if(!body.name || !body.price){
    return response.status(400).json({ error: 'Name and price are required' })
  }

  const updatedProduct = await Product.findByIdAndUpdate(request.params.id, {
    name: body.name,
    description: body.description,
    price: body.price
  }, { new: true, runValidators: true, context: 'query' })

  response.status(200).json(updatedProduct)
})

module.exports = productsRouter
