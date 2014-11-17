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
- `nodeenv`: NODE_ENV [optional, default: `process.env.NODE_ENV`]
- `booleans`: enable boolean parsing, [optional, default: `false`]
- `numbers`: enable number parsing, [optional, default: `false`]

### Inheritance

envc will try to load:

- {name}
- {name}.{NODE_ENV}

### Interpolation

```
URL_HOST="vesln.com"
URL_PATH="index"
URL_FULL="http://${URL_HOST}/${URL_PATH}"
```

## Installation

```js
$ npm install envc
```

## License

  [MIT](license)

