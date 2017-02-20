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

function Loader(options) {
  options = options || {};
  this._nodeenv = options.nodeenv || process.env.NODE_ENV || 'development';
  this._path = options.path || '';
  this._name = options.name || Loader.DOT_BASE;
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

Loader.prototype.load = function() {
  var env = null;
  var content = [];
  var files = [
    path.resolve(path.join(this._path, this._name)),
    path.resolve(path.join(this._path, this._name + '.' + this._nodeenv)),
    path.resolve(path.join(this._path, this._name + '.local')),
  ];

  files.forEach(function(file) {
    try {
      var cont = fs.readFileSync(file, 'utf8');
      content.push(cont);
    } catch (e) {}
  });

  return content;
};
