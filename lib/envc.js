'use strict';

/**
 * Dependencies.
 */

var Parser = require('./parser');
var Loader = require('./loader');
var extend = require('params').extend;

/**
 * Load given `.env` file and set the variables
 * to `process.env` if not defined already.
 *
 * @param {String} path to .env file, default - .env
 * @returns {Object}
 * @api public
 */

module.exports = function(options) {
  options = options || {};

  var parser = null;
  var loader = new Loader(options);
  var files = loader.load();
  var parsed = {};

  files.forEach(function(file) {
    var parser = new Parser(options);
    extend(parsed, parser.parse(file));
  });

  if (!options.readonly) {
    extend(process.env, parsed);
  }

  return parsed;
};
