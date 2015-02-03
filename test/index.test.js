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
