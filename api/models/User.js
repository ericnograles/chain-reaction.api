var SystemConstants = require('../constants/SystemConstants');
var jwt = require('jsonwebtoken');

/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'User',
  attributes: {
    email: {
      type: 'STRING',
      required: true,
      unique: true
    },
    password: {
      type: 'STRING',
      required: true
    },

    toJSON: function() {
      delete this.password;
      return this;
    },

    toJWT: function() {
      delete this.password;
      return jwt.sign(this, SystemConstants.JWT_SECRET);
    }
  }
};

