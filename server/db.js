const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
    user: "default",
    password: "pnsOV7dD3GgA",
    host: "ep-sweet-tooth-660152-pooler.us-east-1.postgres.vercel-storage.com",
    database: 'verceldb',
    ssl: true
})
// const pool = new Pool({
//     user: process.env.PGUSERNAME,
//     password: process.env.PGPASSWORD,
//     host: process.env.HOST,
//     database: 'todoapp',
//     ssl: true
// })

module.exports = pool