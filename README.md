# envc [![Build Status](http://img.shields.io/travis/vesln/envc.svg)](https://travis-ci.org/vesln/envc) [![NPM version](http://img.shields.io/npm/v/envc.svg)](https://www.npmjs.org/package/envc) [![NPM downloads](http://img.shields.io/npm/dm/envc.svg)](https://www.npmjs.org/package/envc) [![LICENSE](http://img.shields.io/npm/l/envc.svg)](LICENSE)

> Loads environment variables from .env files.

Inspired by [dotenv](https://github.com/bkeepers/dotenv) by Brandon Keepers.

## Usage

```js
// `options` are optional
var env = require('envc')(options);
```

### Options:

- `path`: Path to the .env file [optional, default: cwd]
- `name`: Name of the .env file [optional, default: '.env']
- `nodeenv`: `NODE_ENV` [optional, default: `process.env.NODE_ENV`]
- `booleans`: enable boolean parsing, [optional, default: `false`]
- `numbers`: enable number parsing, [optional, default: `false`]
- `readonly`: load and parse .env file only (i.e. does not modify `process.env`), [optional, default: `false`]
- `overwrite`: allow `process.env` to overwrite file values [optional, default: `false`]

### Inheritance

envc will try to load:

- {name}
- {name}.{NODE_ENV}
- {name}.local

### Interpolation

```
URL_HOST="vesln.com"
URL_PATH="index"
URL_FULL="http://${URL_HOST}/${URL_PATH}"
DOCKER_SERVICE=$(boot2docker ip):11211 # works on node 0.12+
```

## Installation

```sh
npm install envc
```

## License

  [MIT](license)
