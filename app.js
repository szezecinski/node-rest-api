const express = require('express') //importing it
const app = express(); // creating a new instance
const morgan = require('morgan')
const bodyParser = require('body-parser')

const productRoutes = require('./routes/products')
const orderRoutes = require('./routes/orders')

app.use(morgan('dev')) //logging requests
app.use(bodyParser.urlencoded({extended:false})) //only simple data. wtf?
app.use(bodyParser.json()) //accepting only json requests

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*') //from all servers
    res.header('Access-Control-Allow-Header', 
    'Origin, x-requested-With, Content-Type, Accept, Authorization')

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods',
        'PUT, POST, PATCH, DELETE, GET')
        
        return res.status(200).send({})
    }

    next()
})

app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

app.use((req, res, next) => {
    const er = new Error('Not Found')
    er.status = 404
    next(er)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        error: {
            msg : error.message
        }
    })
})

module.exports = app
