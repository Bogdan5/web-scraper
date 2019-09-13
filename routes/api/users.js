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
  console.log('Register');
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  pool.connect((err, client, done) => {
    const { username, email, password } = req.body;
    if (err) {
      console.error('Database connection failed', err);
    } else {
      // check if email already used

      client.query('DELETE FROM users WHEN username=$1 OR username=$2 OR username=$3',
        ['nnn', 'pop', 'sss'], (err, res) =>{console.log('Deleted', res)});

      client.query('SELECT * FROM users WHERE username=$1 OR email = $2', [username, email],
        (error, result) => {
          if (error) {
            console.error('Error in connection selecting ', error);
            return res.status(400).send(err);
          }
          console.log('One', result.rows);
          if (result.rows.length === 0) {
            // bcrypt.genSalt(10, (errr, salt) => {
            bcrypt.hash(password, 10, (erro, hash) => {
              // console.log('Hash in register is ', salt);
              if (erro) throw erro;
              client.query('INSERT INTO users (username, email, password, date) VALUES ($1, $2, $3, $4)',
                [username, email, hash, Date.now()], async (err2, reslt) => {
                  if (error) {
                    console.error('Error in connection inserting ', err2);
                    return res.status(400).send(err2);
                  }

                  await client.query('SELECT * FROM users WHERE username=$1', [username],
                    async (error, result) => {
                      let pass = result.rows[0].password;
                      bcrypt.compare(password, pass.trim(), (err, ress) => {
                        console.log('Hash ', hash, typeof hash);
                        console.log('Pass ', pass.charAt(61), typeof pass.charAt(61));
                        console.log('Password retrieved ', result.rows[0].password, typeof result.rows[0].password);
                        console.log('Equal ', hash === result.rows[0].password.trim());
                        console.log('After compare ', ress, err);
                      });
                    });
                  // console.log('Success ', hash, typeof hash);
                  // console.log('Compare ', hash === result.rows[0].password);
                  return res.status(200).send(reslt);
                });
            });
            // });
          }
        });
    }
  });
});

router.post('/login', (req, res) => {
  console.log('Post login start');
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  const { username, password } = req.body;
  // Check validation
  if (!isValid) {
    console.log('Is not valid');
    return res.status(400).json(errors);
  }
  // Find user by email
  pool.connect((err, client, done) => {
    if (err) {
      console.error('Database connection failed', err);
    } else {
      // check if email already used


      client.query('SELECT * FROM users WHERE username=$1', [username],
        async (error, result) => {

          // testing stuff
          // bcrypt.genSalt(10, (errr, salt) => {
          //   bcrypt.hash('123456', salt, async (erro, hash) => {
          //     // if (erro) throw erro;
          //     await bcrypt.compare('123456', hash).then((isMatch) => {
          //       console.log('isMatch ', isMatch);
          //       console.log('Hash ', hash);
          //       console.log('Compare ', hash === result.rows[0].password);
          //     });
          //   });
          // });

          if (error) {
            console.error('Error in connection selecting ', error);
            return res.status(400).send(err);
          }

          console.log('Username ', username);
          if (!result.rows.length) {
            console.log('User not found');
            return res.status(404).json({ usernotfound: 'User not found' });
          }
          // Check password
          await bcrypt.compare(password, result.rows[0].password.trim()).then((isMatch) => {
            console.log('Comp');
            console.log('Password ', password, typeof password);
            console.log('Result ', result.rows[0].password.length, result.rows[0].password.trim().length);
            if (isMatch) {
              console.log('Is match', isMatch);
              // User matched
              // Create JWT Payload
              const payload = {
                id: result[0].id,
                name: result[0].username,
              };
              // Sign token
              jwt.sign(
                payload,
                process.env.secretOrKey,
                {
                  expiresIn: 3600, // 1 year in seconds
                },
                (err, token) => {
                  res.json({
                    success: true,
                    token: `Bearer ${token}`,
                  });
                },
              );
            } else {
              console.log('Is not match', isMatch);
              return res
                .status(400)
                .json({ passwordincorrect: 'Password incorrect' });
            }
          });
        });
    }
  });
});

module.exports = router;
