const express = require('express');
const bodyParser = require("body-parser");
const pg = require('pg');
require('custom-env').env();

const app = express();

// process.env.connectionString

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));