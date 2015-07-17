'use strict';

/**
 * Dependencies.
 */

var Parser = require('./parser');
var Loader = require('./loader');
var params = require('params');

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
    params.extend(parsed, parser.parse(file));
  });

  if (options.overwrite) {
    var parser = new Parser(options);
    var getKeys = params.include.apply(null, Object.keys(parsed))
    var values = getKeys(process.env)
    var res = {}

    for (var key in values) {
      var node = parser._parseVal({ key: key, str: values[key] })
      res[node.key] = node.val
    }

    params.extend(parsed, res)
  }

  if (!options.readonly) {
    params.extend(process.env, parsed);
  }

  return parsed;
};
