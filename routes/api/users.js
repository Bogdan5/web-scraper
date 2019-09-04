const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool, Client } = require('pg')

const router = express.Router();

require('custom-env').env();

const pool = new Pool({
  connectionString: process.env.connectionString,
});

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require('../../validation/login');


router.post('/', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  pool.connect((err, client, done) => {
    if (err) {
      console.error('Database connection failed', err);
    } else {
      //check if email already used
      console.log('Done', req.body.email);
      client.query('SELECT * FROM users WHERE email = $1', [req.body.email],
        (error, result) => {
          done();
          if (error) {
            console.error('Error in connection ', error);
            res.status(400).send(err);
          } else {
            console.log('Response is ', result);
            res.status(200).send(result);
          }
          pool.end();
        });

      // client.query('INSERT INTO users(username, email, password) VALUES($1 $2 $3)',
      //   [req.body.username, req.body.email, req.body.password], (error, results) => {
      //     if (error) {
      //       console.error('Error in connection ', error);
      //       throw error;
      //     } else {
      //       res.redirect('/');
      //     }
      //   });
    }
  });
});

module.exports = router;
