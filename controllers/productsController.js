const mysql = require('../mysql').pool

exports.get = (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err) return res.status(500).send({ error: err });

        conn.query('select * from products', (err, result, fields) => {
            if (err) return res.status(500).send({ error: err });

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

            res.status(200).send({
                response
            })
        })
    })
}

exports.getById = (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err) return res.status(500).send({ error: err });

        conn.query('select * from products where id=?', [req.params.id], (err, result, fields) => {
            if (err) return res.status(500).send({ error: err });

            res.status(200).send({
                response: result
            })
        })
    })
}

exports.post = (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    }

    mysql.getConnection((err, conn) => {

        if (err) return res.status(500).send({ error: err });

        conn.query(`INSERT INTO products (NAME, PRICE) VALUE (?,?)`,
            [product.name, product.price],
            (err, result, fields) => {
                conn.release()

                if (err) {
                    return res.status(500).send({
                        error: err,
                        response: null
                    })
                }

                res.status(201).send({
                    msg: 'Product has been created',
                    product_id: result.insertId
                })
            })
    })
}

exports.patch = (req, res, next) => {

    const product = {
        name: req.body.name,
        price: req.body.price
    }

    mysql.getConnection((err, conn) => {
        if (err) return res.status(500).send({ error: err });

        conn.query(
            'update products set name=?, price=? where id=?',
            [product.name, product.price, req.params.id], (err, result, fields) => {
                if (err) return res.status(500).send({ error: err });

                res.status(200).send({
                    response: result
                })
            })
    })
}

exports.delete = (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err) return res.status(500).send({ error: err });

        conn.query('delete from products where id=?', [req.params.id], (err, result, fields) => {
            if (err) return res.status(500).send({ error: err });

            res.status(204).send({
                response: 'Product has been deleted'
            })
        })
    })
}