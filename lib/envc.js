'use strict';

/**
 * Dependencies.
 */

var path = require('path');
var clone = require('super');
var fs = require('fs');
var exists = require('fs').existsSync;
var Parser = require('./parser');
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
  var env = null;
  var file = null;
  var parser = null;

  location = path.resolve(location || '.env');

  if (process.env.NODE_ENV) {
    env = location + '.' + process.env.NODE_ENV;
    if (exists(env)) location = env;
  }

  try {
    file = fs.readFileSync(location, 'utf8');
  } catch (e) {}

  if (file) {
    parser = new Parser();
    vars = parser.parse(file);
  }

  Object.keys(vars).forEach(function(key) {
    process.env[key] = vars[key];
  });

  return process.env;
};
