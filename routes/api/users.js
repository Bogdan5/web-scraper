const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('custom-env').env();

const validateLoginInput = require("../../validation/login");

