module.exports = function unauthorized() {

  var req = this.req;
  var res = this.res;

  sails.log.warn('Ran custom response: Unauthorized');

  return res.status(401).json({
    error: 'User is not authorized, it is probably due to a bad combo of identifiants'
  });

  // Or log them out (if necessary) and then redirect to the login page.
  if (req.session.userId) {
    delete req.session.userId;
  }

};
