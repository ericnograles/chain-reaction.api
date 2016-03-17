var jwt = require('jsonwebtoken');
var SystemConstants = require('../constants/SystemConstants');

/**
 * Verifies a jwt against the local database
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
module.exports = isAuthenticated;


function isAuthenticated(req, res, next) {
  if (req.headers.authorization) {
    var token = req.headers.authorization.replace('Bearer ','');
    jwt.verify(token, SystemConstants.JWT_SECRET, function(err, decoded) {
      Token.findOne({value: token})
        .populate('owner')
        .then(function(existingToken) {
          if (!existingToken) {
            return res.forbidden({error: 'You are not permitted to perform this action'});
          } else {
            req.user = existingToken.owner.toJSON();
            return next();
          }
        })
        .catch(function(err) {
          return res.forbidden({error: 'You are not permitted to perform this action'});
        })
    });
  } else {
    return res.forbidden({error: 'You are not permitted to perform this action'});
  }
};
