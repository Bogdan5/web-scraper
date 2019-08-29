const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

require('custom-env').env();

const validateLoginInput = require('../../validation/login');
const db = require('../../db');


router.post('/', (req, res, next) => {
  db.query
});