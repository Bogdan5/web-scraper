const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

require('custom-env').env();

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require('../../validation/login');
const db = require('../../db');


router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  db.query('SELECT email FROM users WHERE ')
  db.query()
});