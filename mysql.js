const mysql = require('mysql')

//Tips for mysql troubleshooting ==>  https://github.com/mysqljs/mysql

var pool = mysql.createPool({
    "user": process.env.MYSQL_USER,
    "password":  process.env.MYSQL_PWD,
    "database":  process.env.MYSQL_DB,
    "host":  process.env.MYSQL_HOST,
    "port":  process.env.MYSQL_PORT
})

exports.pool = pool;