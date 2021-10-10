const mysql = require('mysql')

//Tips for mysql troubleshooting ==>  https://github.com/mysqljs/mysql

var pool = mysql.createPool({
    "connectionLimit": process.env.MYSQL_LIMIT,
    "user": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PWD,
    "database": process.env.MYSQL_DB,
    "host": process.env.MYSQL_HOST,
    "port": process.env.MYSQL_PORT
})

exports.execute = (query, params = []) => {
    return new Promise((resolve, reject) => {
        pool.query(query, params, (err, result, fields) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

exports.pool = pool;