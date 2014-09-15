'use strict';

/**
 * Dependencies.
 */

var Parser = require('./parser');
var Loader = require('./loader');

/**
 * Load given `.env` file and set the variables
 * to `process.env` if not defined already.
 *
 * @param {String} path to .env file, default - .env
 * @returns {Object}
 * @api public
 */

module.exports = function(options) {
  var parser = null;
  var loader = new Loader(options);
  var files = loader.load();

  files.forEach(function(file) {
    var parser = new Parser(options);
    var vars = parser.parse(file);

    Object.keys(vars).forEach(function(key) {
      process.env[key] = vars[key];
    });
  });

  return process.env;
};
