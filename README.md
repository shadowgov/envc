[![Build Status](https://secure.travis-ci.org/vesln/envc.png)](http://travis-ci.org/vesln/envc)

# envc

> Loads environment variables from .env files.

Inspired by [dotenv](https://github.com/bkeepers/dotenv) by Brandon Keepers.

## Usage

### Default behavior

.env file:

```
NODE_PORT=4000
```

index.js:

```js
require('envc')();

console.log(process.env.NODE_PORT);
```

### Custom path

```js
require('envc')('/foo/bar/.env');
```

### NODE_ENV specific files

.env
```
LOADED_FROM=env
```

.env.test

```
LOADED_FROM=test
```

index.js:

```js
require('envc')();
console.log(process.env.LOADED_FROM); // => test
```

Run it:

```bash
$ NODE_ENV=test node index
```

## Installation

```js
$ npm install envc
```

## License

MIT License
