const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { Pool, Client } = require('pg');
require('custom-env').env();

const pool = new Pool({
  connectionString: process.env.connectionString,
});

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secretOrKey;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      pool.connect((err, client) => {
        client.query('SELECT id FROM users WHERE id=$1', [jwt_payload.id],
          (error, result) => {
            if (error) {
              console.error('Error in connection selecting ', error);
              return done(null, false);
            }
            console.log('Done ', result);
            return done(null, result);
          });
      });
    }),
  );
};
