var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var SystemConstants = require('../constants/SystemConstants');

/**
 * UserController
 *
 * @description :: Server-side logic for managing Users.  Obviously, all logic here should be separated to their own service layer and Controllers should be dumb.  But I'm taking a shortcut for demo purposes  :)
 */

module.exports = {
  login: login,
  create: create
};

function create(req, res) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hashedPassword) {
      if (err) {
        return res.json(500, err);
      }
      req.body.password = hashedPassword;
      var newUser;
      User.create(req.body)
        .then(function(user) {
          newUser = user;
          return Token.create({
            value: user.toJWT(),
            owner: user.id
          });
        })
        .then(function(token) {
          return res.json({access_token: token.value, profile: newUser.toJSON()});
        })
        .catch(function(err) {
          return res.json(500, err);
        });

    });
  });
}

function login(req, res) {
  User.findOne({email: req.body.email})
    .then(function(user) {
      bcrypt.compare(req.body.password, user.password, function(err, response) {
        if (!response) {
          return res.json(401, {error: 'Unauthorized'});
        } else {
          Token.create({
            value: user.toJWT(),
            owner: user.id
          })
            .then(function(token) {
              return res.json({access_token: token.value, profile: user.toJSON()});
            });
        }
      });
    })
    .catch(function(err) {
      return res.json(500, err);
    })
}
