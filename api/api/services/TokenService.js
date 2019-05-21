const jwt = require('jsonwebtoken');

module.exports = {

  // @param payload

  issue: payload => jwt.sign(payload, sails.config.custom.jwtSecret, {expiresIn: '1d'}),

  // @param token

  verify: token => jwt.verify(token, sails.config.custom.jwtSecret),

};
