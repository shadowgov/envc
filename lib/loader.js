'use strict';

/**
 * Dependencies.
 */

var path = require('path');
var fs = require('fs');

/**
 * Primary export
 */

module.exports = Loader;

/**
 * Loader.
 *
 * @param {String} current node environment
 * @constructor
 */

function Loader(env) {
  this.env = env;
}

/**
 * Base name.
 */

Loader.DOT_BASE = '.env';

/**
 * Read .env files.
 *
 * @param {String} location
 * @returns {Array}
 * @public
 */

Loader.prototype.load = function(location) {
  var env = null;
  var file = null;

  location = path.resolve(location || Loader.DOT_BASE);

  if (this.env) {
    env = location + '.' + this.env;
    if (fs.existsSync(env)) location = env;
  }

  try {
    file = fs.readFileSync(location, 'utf8');
  } catch (e) {}

  return file;
};
