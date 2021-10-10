const mysql = require('../mysql')

exports.get = async (req, res, next) => {
    try {
        const result = await mysql.execute('select * from products')
        const response = {
            quantity: result.length,
            records: result.map(r => {
                return {
                    id: r.id,
                    name: r.name,
                    price: r.price
                }
            })
        }

        res.status(200).send({ response })
    } catch (err) {
        return res.status(500).send({ error: err });
    }
}

exports.getById = async (req, res, next) => {
    try {
        const query = 'select * from products where id=?'
        const params = [req.params.id]
        const result = await mysql.execute(query, params)
        const response = {
            quantity: result.length,
            records: result.map(r => {
                return {
                    id: r.id,
                    name: r.name,
                    price: r.price
                }
            })
        }

        res.status(200).send({ response })
    } catch (error) {
        return res.status(500).send({ error: err });
    }
}

exports.post = async (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    }

    try {
        const query = 'INSERT INTO products (NAME, PRICE) VALUE (?,?)'
        const params = [product.name, product.price]
        const result = await mysql.execute(query, params)

        res.status(200).send({
            message: 'Product has been inserted',
            product: {
                id: result.insertId,
                name: req.body.name,
                price: req.body.price
            }
        })
    } catch (err) {
        return res.status(500).send({ error: err });
    }
}

exports.patch = async (req, res, next) => {
    try {
        const product = {
            name: req.body.name,
            price: req.body.price
        }

        const query = 'update products set name=?, price=? where id=?'
        const params = [product.name, product.price, req.params.id]
        const result = await mysql.execute(query, params)

        res.status(202).send({
            message: 'Product has been updated',
            product: {
                id: req.params.id,
                name: req.body.name,
                price: req.body.price
            }
        })
    } catch (err) {
        return res.status(500).send({ error: err });
    }
}

exports.delete = async (req, res, next) => {
    try {
        const query = 'delete from products where id=?'
        const params = [req.params.id]
        await mysql.execute(query, params)

        res.status(202).send({
            message: 'Product has been deleted'
        })
    } catch (err) {
        return res.status(500).send({ error: err });
    }
}