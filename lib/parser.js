'use strict';

/**
 * Locals
 */

var has = Object.prototype.hasOwnProperty;

/**
 * .env file parser.
 *
 * @constructor
 */

function Parser(options) {
  options = options || {};

  // env storage
  this._env = Object.create(null);

  // current env
  this._currEnv = options.currEnv || process.env;

  // enable/disable booleans
  this._allowBool = has.call(options, 'booleans')
    ? options.booleans
    : false;

  // enable/disable numbers
  this._allowNum = has.call(options, 'numbers')
    ? options.numbers
    : false;
}

/**
 * Parse a single line.
 *
 * - export (optional)
 * - key
 *   - separator
 * - single quote or double quote or no quote
 *   - value
 * - end
 * - optional comment
 */

Parser.LINE = /^(?:export\s+)?([\w\.]+)(?:\s*=\s*|:\s+?)('(?:\'|[^'])*'|"(?:\"|[^"])*"|[^#\n]+)?(?:\s*\#.*)?$/;

/**
 * Ignore whitespaces and comments.
 */

Parser.IGNORE = /^\s*(?:#.*)?$/;

/**
 * Strip quotes.
 */

Parser.QUOTES = /^(['"])(.*)(['"])$/;

/**
 * Check if bool.
 */

Parser.BOOLEAN = /^(true|false)$/i;

/**
 * Detect variables.
 */

Parser.VARIABLE = /(\\)?(\$)(\{?([A-Z0-9_]+)\}?)/ig;

/**
 * Unescape.
 */

Parser.UNESCAPE = /\\([^$])/g;

/**
 * Parse `str`.
 *
 * @public
 */

Parser.prototype.parse = function(str) {
  var lines = str.split(/\n+/);
  var line = null;
  var node = null;

  while (line = lines.shift()) {
    if (node = this._parsePair(line)) {
      this._env[node.key] = node.val;
    }
  }

  return this._env;
};

/**
 * Parse pair.
 *
 * @param {String} `str`
 * @public
 */

Parser.prototype._parsePair = function(str) {
  var match = null;

  if (Parser.IGNORE.test(str)) {
    return;
  }

  match = str.match(Parser.LINE);

  if (!match) {
    throw new Error("envc: Invalid line: " + line);
  }

  return this._parseVal({ key: match[1], str: match[2] });
};

/**
 * Parse value.
 *
 * @param {Object} node
 * @returns {Object}
 * @private
 */

Parser.prototype._parseVal = function(node) {
  node.val = node.str.replace(Parser.QUOTES, '$2');

  return this._parseBool(node)
    || this._parseNum(node)
    || this._parseStr(node);
};

/**
 * Parse boolean value.
 *
 * @param {Object} node
 * @returns {Object}
 * @private
 */

Parser.prototype._parseBool = function(node) {
  if (this._allowBool && Parser.BOOLEAN.test(node.val)) {
    node.val = node.val.toLowerCase() === 'true';
    return node;
  }
};

/**
 * Parse numeric value.
 *
 * @param {Object} node
 * @returns {Object}
 * @private
 */

Parser.prototype._parseNum = function(node) {
  var num = parseFloat(node.val);

  if (this._allowNum && !Number.isNaN(num)) {
    node.val = num;
    return node;
  }
};

/**
 * Parse string value.
 *
 * @param {Object} node
 * @returns {Object}
 * @private
 */

Parser.prototype._parseStr = function(node) {
  if (node.str[0] === "'") {
    return node;
  }

  if (node.str[0] === '"') {
    node.val = node.val.replace(Parser.UNESCAPE, '$1');
  }

  scan(node.str, Parser.VARIABLE).forEach(function(parts) {
    var replace = null;

    if (parts[1] === '\\') {
      replace = parts[2] + parts[3];
    } else if (this._env[parts[4]]) {
      replace = this._env[parts[4]];
    } else {
      replace = this._currEnv[parts[4]] || '';
    }

    node.val = node.val.replace(parts[0], replace);
  }, this);

  return node;
};

/**
 * Scan `str` with `re`.
 *
 * @param {String} str
 * @param {RegExp} re
 * @returns {Array}
 * @private
 */

function scan(str, re) {
  var match = null;
  var ret = [];

  while (match = re.exec(str)) {
    ret.push(match);
  }

  return ret;
}

/**
 * Primary export
 */

module.exports = Parser;
