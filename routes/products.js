const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        msg: 'msg from product route'
    })
})

router.get('/:id', (req, res, next) => {
    res.status(200).send({
        msg: `msg from product route - ${req.params.id}`
    })
})

router.post('/', (req, res, next) => {
    res.status(201).send({
        'msg':'Module has been created'
    })
})

router.patch('/:id', (req, res, next) => {
    res.status(201).send({
        msg: `Patch - msg from product route - ${req.params.id}`
    })
})

router.delete('/:id', (req, res, next) => {
    res.status(204).send({
        msg: `Delete - msg from product route - ${req.params.id}`
    })
})

module.exports = router