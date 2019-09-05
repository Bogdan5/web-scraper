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


router.post('/register', (req, res) => {
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
    }
  });
});

router.post('/login', (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email, password } = req.body;
  // Find user by email
  pool.connect((err, client, done) => {
    const { username, email, password } = req.body;
    if (err) {
      console.error('Database connection failed', err);
    } else {
      // check if email already used

      console.log('Done', email);
      client.query('SELECT email FROM users WHERE email=$1', [email],
        (error, result) => {
          if (error) {
            console.error('Error in connection selecting ', error);
            return res.status(400).send(err);
          }

          console.log('Response is ', result.rows);
          if (!result.rows.length) {
            return res.status(404).json({ emailnotfound: 'Email not found' });
          }
        });
    }
  });

  // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name
          };
  // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: 'Password incorrect' });
        }
      });
    });
});

module.exports = router;
