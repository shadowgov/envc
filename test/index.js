var envc = require('../');
var assert = require('assert');

test('default location', function() {
  var env = envc();
  assert(env.ENVC);
});

test('custom location', function() {
  var env = envc('test/fixtures/1-envc-one');
  assert(env.ENVC_ONE);
});

test('do not write env variables that already exist', function() {
  var path = process.env.PATH;
  var env = envc('test/fixtures/2-path');
  assert.equal(env.PATH, path);
});

test('prefer files with .env.{NODE_ENV} over .env', function() {
  var env = envc('test/fixtures/3-ignored');
  assert.equal(env.ENVC_SOURCE, 'test');
});

test('do not throw when the file cannot be found', function() {
  assert.doesNotThrow(function() {
    envc('invalid/path/.env');
  });
});
