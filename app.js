const express = require('express') //importing it
const app = express(); // creating a new instance

const productRoutes = require('./routes/products')
const orderRoutes = require('./routes/orders')

app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

module.exports = app
//https://www.youtube.com/watch?v=1ww5okv2DE0