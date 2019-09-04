const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pg = require('pg');

const router = express.Router();

require('custom-env').env();

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require('../../validation/login');


router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  pg.connect(process.env.connectionString, (err, client, done) => {
    if (err) {
      console.error('Database connection failed', err);
    } else {
      //check if email already used

      client.query('SELECT * FROM users WERE email = $1', [req.body.email],
        (error, results) => {
          if (error) {
            console.error('Error in connection ', error);
            throw error;
          } else {
            console.log('Response is ', results);
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
