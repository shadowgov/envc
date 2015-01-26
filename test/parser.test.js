var assert = require('assert');
var fs = require('fs');
var path = require('path');
var Parser = require('../lib/parser');

var parse = function(name, options) {
  var filepath = path.join(__dirname, 'fixtures', name);
  var parser = new Parser(options);
  return parser.parse(fs.readFileSync(filepath, 'utf8'));
};

test('numbers', function() {
  var env = parse('numbers', { numbers: true });

  assert.strictEqual(env.A, 1);
  assert.strictEqual(env.B, 2.2);
  assert.strictEqual(env.C, 3);
  assert.strictEqual(env.D, 4);
});

test('numbers when disabled', function() {
  var env = parse('numbers', { numbers: false });

  assert.strictEqual(env.A, '1');
  assert.strictEqual(env.B, '2.2');
});

test('booleans', function() {
  var env = parse('bool', { booleans: true });

  assert.strictEqual(env.A, true);
  assert.strictEqual(env.B, false);
  assert.strictEqual(env.C, true);
  assert.strictEqual(env.D, false);
});

test('booleans when disabled', function() {
  var env = parse('bool', { booleans: false });

  assert.strictEqual(env.A, 'true');
  assert.strictEqual(env.B, 'false');
});

test('comments', function() {
  var env = parse('comments');

  assert.strictEqual(env.A, 'This is great ');
});

test('empty lines', function() {
  var env = parse('empty-lines');

  assert.strictEqual(env.A, 'ok');
  assert.strictEqual(env.B, 'ok');
});

test('unquoted', function() {
  var env = parse('unquoted');

  assert.strictEqual(env.A, 'Great day');
});

test('spaces around separator', function() {
  var env = parse('spaces-separator');

  assert.strictEqual(env.A, 'ok');
  assert.strictEqual(env.B, 'ok');
});

test('double quotes', function() {
  var env = parse('double-quotes');

  assert.strictEqual(env.A, 'ok');
});

test('single quotes', function() {
  var env = parse('single-quotes');

  assert.strictEqual(env.A, 'ok');
});

test('exports', function() {
  var env = parse('exports');

  assert.strictEqual(env.A, 'ok');
});

test('. in the name', function() {
  var env = parse('dot-name');

  assert.strictEqual(env['A.OK'], 'ok');
});

test('interpolation', function() {
  var env = parse('variables');

  assert.strictEqual(env.A, 'ok$ok');
  assert.strictEqual(env.B, 'ok${ok}');
  assert.strictEqual(env.D, 'It is great');
  assert.strictEqual(env.E, 'It is great');
  assert.strictEqual(env.F, 'It "is" great');
});

test('unescape', function() {
  var env = parse('unescape');

  assert.strictEqual(env.A, 'It "is" "great"');
});
