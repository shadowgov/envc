'use strict';

/**
 * Dependencies.
 */

var Parser = require('./parser');
var Loader = require('./loader');
var hasOwnProp = Object.prototype.hasOwnProperty;

/**
 * Load given `.env` file and set the variables
 * to `process.env` if not defined already.
 *
 * @param {String} path to .env file, default - .env
 * @returns {Object}
 * @api public
 */

module.exports = function(location) {
  var vars = {};
  var parser = null;
  var loader = new Loader(process.env.NODE_ENV);
  var file = loader.load(location);

  if (file) {
    parser = new Parser();
    vars = parser.parse(file);
  }

  Object.keys(vars).forEach(function(key) {
    process.env[key] = vars[key];
  });

  return process.env;
};
