const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController')

router.get('/', productsController.get)

router.get('/:id', productsController.getById)

router.post('/', productsController.post)

router.patch('/:id', productsController.patch)

router.delete('/:id', productsController.delete)

module.exports = router