[![Build Status](https://secure.travis-ci.org/vesln/envc.png)](http://travis-ci.org/vesln/envc)

# envc

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
URL_FULL="http://#{URL_HOST}/#{URL_PATH}"
```

## Installation

```js
$ npm install envc
```

## License

MIT License
