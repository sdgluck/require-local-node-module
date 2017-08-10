# require-local-node-module

> Require a module from cwd's node_modules folder (for CLIs)

Require a Node module from the current working directory's nearest `node_modules` folder.
This is useful for a CLI application that, for example, has a peer dependency on a
module that should be the same version as is being used by whatever program lives 
in the CWD.

## Install

```sh
npm install --save require-local-node-module
```

```sh
yarn add require-local-node-module
```

## Import

```js
// ES2015
import requireLocal from 'require-local-node-module'
```

```sh
// CommonJS
var requireLocal = require('require-local-node-module')
```

## Usage

### `requireLocal (module[, opts])`

Require a module from the nearest `node_modules` folder.

- __module__ {String} (required) Name of the module to require
- __opts__ {Object} (optional) Options object

Returns the required module as per usual calls to `require`.

#### Options:

- distance {Number} Number of folders to climb in search for the module (default: `3`)
- folder {String} Name of the folder where the module lives (default: `'node_modules'`)

## Contributing

All pull requests and issues welcome!

If you're not sure how, check out the [great video tutorials on egghead.io](http://bit.ly/2aVzthz)!

## License

MIT © [Sam Gluck](github.com/sdgluck)
