const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
    user: process.env.PGUSERNAME,
    password: process.env.PGPASSWORD,
    host: process.env.HOST,
    database: 'todoapp',
    ssl: true
})

module.exports = pool