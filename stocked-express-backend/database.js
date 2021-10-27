const { createPool } = require('mysql')

const pool = createPool({
    host: "localhost",
    user: "stocked_user",
    password: "verysecretpass",
    connectionLimit: 10
})

pool.query(`select * from stocked.users`, (err, res) => {
    return console.log(res)
})