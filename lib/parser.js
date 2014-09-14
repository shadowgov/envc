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
  this.env = options.env || Object.create(null);

  // enable/disable booleans
  this.allowBool = has.call(options, 'booleans')
    ? options.booleans
    : false;

  // enable/disable numbers
  this.allowNum = has.call(options, 'numbers')
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
 * @api public
 */

Parser.prototype.parse = function(str) {
  var lines = str.split("\n");
  var line = null;
  var node = null;

  while (line = lines.shift()) {
    if (node = this.parsePair(line)) {
      this.env[node.key] = node.val;
    }
  }

  return this.env;
};

Parser.prototype.parsePair = function(str) {
  var match = null;

  if (Parser.IGNORE.test(str)) {
    return;
  }

  match = str.match(Parser.LINE);

  if (!match) {
    throw new Error("envc: Invalid line: " + line);
  }

  return this.parseVal({ key: match[1], str: match[2] });
};

Parser.prototype.parseVal = function(node) {
  node.val = node.str.replace(Parser.QUOTES, '$2');

  return this.parseBool(node)
    || this.parseNum(node)
    || this.parseStr(node);
};

Parser.prototype.parseBool = function(node) {
  if (this.allowBool && Parser.BOOLEAN.test(node.val)) {
    node.val = node.val.toLowerCase() === 'true';
    return node;
  }
};

Parser.prototype.parseNum = function(node) {
  var num = parseFloat(node.val);

  if (this.allowNum && !Number.isNaN(num)) {
    node.val = num;
    return node;
  }
};

Parser.prototype.parseStr = function(node) {
  if (node.str[0] === "'") {
    return node;
  }

  if (node.str[0] === '"') {
    node.val = node.val.replace(Parser.UNESCAPE, '$1');
  }

  scan(node.str, Parser.VARIABLE).forEach(function(parts) {
    var replace = parts[1] === '\\'
      ? parts[2] + parts[3]
      : this.env[parts[4]] || '';

    node.val = node.val.replace(parts[0], replace);
  }, this);

  return node;
};

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
