const mysql = require('../mysql').pool;

exports.get = (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err) return res.status(500).send({ error: err });

        conn.query('select * from orders', (err, result, fields) => {
            if (err) return res.status(500).send({ error: err });

            const response = {
                quantity: result.length,
                records: result.map(r => {
                    return {
                        id: r.id,
                        prod_id: r.product_id,
                        quantity: r.quantity
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

        conn.query('select * from orders where id=?', [req.params.id], (err, result, fields) => {
            if (err) return res.status(500).send({ error: err });

            res.status(200).send({
                response: result
            })
        })
    })
}

exports.post = (req, res, next) => {

    const order = {
        product_id: req.body.product_id,
        quantity: req.body.quantity
    }

    mysql.getConnection((err, conn) => {

        if (err) return res.status(500).send({ error: err });

        conn.query(`INSERT INTO orders (product_id, quantity) VALUE (?,?)`,
            [order.product_id, order.quantity],
            (err, result, fields) => {
                conn.release()

                if (err) {
                    return res.status(500).send({
                        error: err,
                        response: null
                    })
                }

                res.status(201).send({
                    msg: 'Order has been placed',
                    id: result.insertId
                })
            })
    })
}

exports.patch = (req, res, next) => {
    const order = {
        quantity: req.body.quantity
    }

    mysql.getConnection((err, conn) => {
        if (err) return res.status(500).send({ error: err });

        conn.query(
            'update orders set quantity=? where id=?',
            [order.quantity, req.params.id], (err, result, fields) => {
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

        conn.query('delete from orders where id=?', [req.params.id], (err, result, fields) => {
            if (err) return res.status(500).send({ error: err });

            res.status(204).send({
                response: 'Order has been deleted'
            })
        })
    })
}