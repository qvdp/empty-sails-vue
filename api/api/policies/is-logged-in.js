/**
 * is-logged-in
 *
 * A simple policy that allows any request from an authenticated user.
 *
 */

module.exports = async function (req, res, next) {

  var token;

  //Check if authorization header is present
  if(req.headers && req.headers.authorization) {

    //authorization header is present
    var parts = req.headers.authorization.split(' ');
    if(parts.length === 2) {

      var scheme = parts[0];
      var credentials = parts[1];

      if(/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return res.forbidden();
    }
  } else {
    //authorization header is not present
    return res.unauthorized();
  }

  var decoded = TokenService.verify(token);

  User.findOne({id: decoded.id}).exec((error, user) => {
    if (error) return res.serverError(error)
    if (user) {
      req.token = decoded;
      next();
    }
  });
};
