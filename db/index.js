const { Pool } = require('pg');
require('custom-env').env();


const pool = new Pool({ connectionString: process.env.connectionString})
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}