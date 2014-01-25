/**
 * Dependencies.
 */

var envfile = require('envfile');
var resolve = require('path').resolve;
var hasOwnProp = Object.prototype.hasOwnProperty;

/**
 * Load given `.env` file and set the variables
 * to `process.env` if not defined already.
 *
 * @param {String} path to .env file [default: .env]
 * @api public
 */

module.exports = function(path) {
  path = resolve(path || '.env');
  var vars = envfile.parseFileSync(path);

  Object.keys(vars).forEach(function(key) {
    if (hasOwnProp.call(process.env, key)) return;
    process.env[key] = vars[key];
  });
};
