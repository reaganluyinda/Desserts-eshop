
const productsRouter = require('express').Router()

let products = [
    {
        id: 1, name: "Product 1", description: "This is product 1", price: 10.99
       
    },
    {
         id: 2, name: "Product 2", description: "This is product 2", price: 19.99
    }
]


//fetch all products
productsRouter.get('/', (request, response) => {
    response.json(products)
})

//fetch a single product by id
productsRouter.get('/:id', (request,response) => {
 const id = Number(request.params.id)
 const product = products.find(p => p.id === id)
    if(!product){
        response.status(404).json({ error: "Product not found" })
        return
    }
    response.json(product)
})

//add a new product
productsRouter.post('/', (request, response) =>{
    const body = request.body
    const newProduct = {
        id: products.length + 1,
        name: body.name,
        description: body.description,
        price: body.price
    }
    products = products.concat(newProduct)
    response.status(201).json(newProduct)
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
