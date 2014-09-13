/**
 * Dependencies.
 */

var envfile = require('envfile');
var path = require('path');
var clone = require('super');
var exists = require('fs').existsSync;
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
  var vars = null;
  var env = null;

  location = path.resolve(location || '.env');

  if (process.env.NODE_ENV) {
    env = location + '.' + process.env.NODE_ENV;
    if (exists(env)) location = env;
  }

  try {
    vars = envfile.parseFileSync(location);
  } catch (e) {
    vars = {};
  }

  Object.keys(vars).forEach(function(key) {
    if (hasOwnProp.call(process.env, key)) return;
    process.env[key] = vars[key];
  });

  return clone(process.env);
};
