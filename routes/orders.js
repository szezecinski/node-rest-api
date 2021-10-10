const express = require('express')
const router = express.Router()

const ordersController = require('../controllers/ordersController')

router.get('/', ordersController.get)

router.get('/:id', ordersController.getById)

router.post('/', ordersController.post)

router.patch('/:id', ordersController.patch)

router.delete('/:id', ordersController.delete)

module.exports = router