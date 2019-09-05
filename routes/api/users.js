const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool, Client } = require('pg');

const router = express.Router();

require('custom-env').env();

const pool = new Pool({
  connectionString: process.env.connectionString,
});

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


router.post('/', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    console.log('Not valid');
    return res.status(400).json(errors);
  }

  pool.connect((err, client, done) => {
    const { username, email, password } = req.body;
    if (err) {
      console.error('Database connection failed', err);
    } else {
      // check if email already used

      console.log('Done', email);
      client.query('SELECT * FROM users WHERE username=$1 OR email = $2', [username, email],
        (error, result) => {
          if (error) {
            console.error('Error in connection selecting ', error);
            return res.status(400).send(err);
          }

          console.log('Response is ', result.rows);
          if (!result.rows.length) {
            bcrypt.genSalt(10, (errr, salt) => {
              bcrypt.hash(password, salt, (erro, hash) => {
                if (erro) throw erro;
                client.query('INSERT INTO users (username, email, password, date) VALUES ($1, $2, $3, $4)',
                  [username, email, hash, Date.now()], (err2, reslt) => {
                    done();
                    if (error) {
                      console.error('Error in connection inserting ', err2);
                      return res.status(400).send(err2);
                    }
                    return res.status(200).send(reslt);
                  });
              });
            });
          }
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
