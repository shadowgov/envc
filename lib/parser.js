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

Parser.UNESCAPE = /\\([^$])/g;

/**
 * Parse `str`.
 *
 * @api public
 */

Parser.prototype.parse = function(str, env) {
  var lines = str.split("\n");
  env = env || Object.create(null);

  lines.forEach(function(line) {
    if (Parser.IGNORE.test(line)) return;
    var match = this.extract(line);
    env[match.key] = this.parseVal(match.val, env);
  }, this);

  return env;
};

Parser.prototype.extract = function(str) {
  var match = str.match(Parser.LINE);
  // TODO(vesln): custom error
  if (!match) throw new Error("Invalid line: " + str);
  return { key: match[1], val: match[2] };
};

Parser.prototype.parseVal = function(str, env) {
  // parse string
  var val = str.replace(Parser.QUOTES, '$2');

  // check if the value is boolean
  if (this.allowBool && Parser.BOOLEAN.test(val)) {
    return val.toLowerCase() === 'true';
  }

  // check if the value is a number.
  var num = parseFloat(val);
  if (this.allowNum && !Number.isNaN(num)) {
    return num;
  }

  // single quotes? No interpolation!
  if (str[0] === "'") return val;

  // unescape
  if (str[0] === '"') {
    val = val.replace(Parser.UNESCAPE, '$1');
  }

  scan(str, Parser.VARIABLE).forEach(function(parts) {
    var replace = null;

    // escaped - ignore
    if (parts[1] === '\\') {
      replace = parts[2] + parts[3];
    } else {
      replace = env[parts[4]] || '';
    }

    val = val.replace(parts[0], replace);
  });

  return val;
};

function scan(str, re) {
  var match = null;
  var ret = [];
  while (match = re.exec(str)) ret.push(match);
  return ret;
}

/**
 * Primary export
 */

module.exports = Parser;
