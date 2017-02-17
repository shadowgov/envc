var assert = require('assert');
var envc = require('../');

test('default location', function() {
  envc();
  assert(process.env.ENVC);
});

test('updated keys', function() {
  var keys = Object.keys(envc());
  assert.deepEqual(keys, ['ENVC']);
});

test('custom location', function() {
  envc({ path: 'test/fixtures', name: 'envc-one' });
  assert(process.env.ENVC_ONE);
});

test('prefer files with .env.{NODE_ENV} over .env', function() {
  envc({ path: 'test/fixtures', name: 'ignored' });
  assert.equal(process.env.ENVC_SOURCE, 'test');
});

test('prefer files with .env.local over .env.{NODE_ENV}', function() {
  envc({ path: 'test/fixtures', name: 'local' });
  assert.equal(process.env.ENVC_SOURCE, 'local');
});

test('do not throw when the file cannot be found', function() {
  assert.doesNotThrow(function() {
    envc({ path: 'invalid/path' });
  });
});

test('inheritance', function() {
  envc({ path: 'test/fixtures', name: 'inheritance' });
  assert.equal(process.env.A, 1);
  assert.equal(process.env.B, 3);
});

test('read only', function() {
  var parsed = envc({
    path: 'test/fixtures',
    name: 'readonly',
    readonly: true
  });

  assert.notEqual(process.env.SECRET, '42');
  assert.equal(parsed.SECRET, '42');
});

test('overwrite', function() {
  process.env.OVERWRITE_A = 'foo';
  process.env.OVERWRITE_B = '42'
  process.env.OVERWRITE_C = 'true'

  var parsed = envc({
    path: 'test/fixtures',
    name: 'overwrite',
    overwrite: true,
    booleans: true,
    numbers: true
  });

  assert.equal(parsed.OVERWRITE_A, 'foo');
  assert.equal(parsed.OVERWRITE_B, 42);
  assert.equal(parsed.OVERWRITE_C, true);

  var parsed = envc({
    path: 'test/fixtures',
    name: 'overwrite',
    overwrite: false, // default
    booleans: true,
    numbers: true
  });

  assert.equal(parsed.OVERWRITE_A, 'a');
  assert.equal(parsed.OVERWRITE_B, 84);
  assert.equal(parsed.OVERWRITE_C, false);

  delete process.env.OVERWRITE_A;
  delete process.env.OVERWRITE_B;
  delete process.env.OVERWRITE_C;
});
