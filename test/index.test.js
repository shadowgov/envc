var assert = require('assert');
var envc = require('../');

test('default location', function() {
  var env = envc();
  assert(env.ENVC);
});

test('custom location', function() {
  var env = envc('test/fixtures/envc-one');
  assert(env.ENVC_ONE);
});

test('do not write env variables that already exist', function() {
  var path = process.env.PATH;
  var env = envc('test/fixtures/path');
  assert.equal(env.PATH, path);
});

test('prefer files with .env.{NODE_ENV} over .env', function() {
  var env = envc('test/fixtures/ignored');
  assert.equal(env.ENVC_SOURCE, 'test');
});

test('do not throw when the file cannot be found', function() {
  assert.doesNotThrow(function() {
    envc('invalid/path/.env');
  });
});
