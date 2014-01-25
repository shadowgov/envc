var env = require('../');
var assert = require('assert');

t('default location', function() {
  env();
  assert(process.env.ENVC);
});

t('custom location', function() {
  env('test/fixtures/1-envc-one');
  assert(process.env.ENVC_ONE);
});

t('do not write env variables that already exist', function() {
  var path = process.env.PATH;
  env('test/fixtures/2-path');
  assert(process.env.PATH === path);
});

t('prefer files with .env.{NODE_ENV} over .env', function() {
  env('test/fixtures/3-ignored');
  assert(process.env.ENVC_SOURCE === 'test');
});
