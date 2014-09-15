var assert = require('assert');
var envc = require('../');

test('default location', function() {
  var env = envc();
  assert(env.ENVC);
});

test('custom location', function() {
  var env = envc({ path: 'test/fixtures', name: 'envc-one' });
  assert(env.ENVC_ONE);
});

test('prefer files with .env.{NODE_ENV} over .env', function() {
  var env = envc({ path: 'test/fixtures', name: 'ignored' });
  assert.equal(env.ENVC_SOURCE, 'test');
});

test('do not throw when the file cannot be found', function() {
  assert.doesNotThrow(function() {
    envc({ path: 'invalid/path' });
  });
});

test('inheritance', function() {
  var env = envc({ path: 'test/fixtures', name: 'inheritance' });
  assert.equal(env.A, 1);
  assert.equal(env.B, 3);
});
