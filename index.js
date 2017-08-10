var path = require('path')
var fs = require('fs')

module.exports = function requireLocalNodeModule (module, opts) {
  opts = opts || {}

  var distance = typeof opts.distance !== 'undefined' ? opts.distance : 3
  var folder = typeof opts.folder !== 'undefined' ? opts.folder : 'node_modules'

  if (typeof module !== 'string' || !module.length) {
    throw new Error('Expecting module to be non-empty string')
  } else if (typeof folder !== 'string' || !folder.length) {
    throw new Error('Expecting folder to be non-empty string')
  } else if (typeof distance !== 'number' || distance < 1) {
    throw new Error('Expecting distance to be non-zero positive integer')
  }

  var nodeModulesPath

  for (let i = 0; i <= distance; i++) {
    nodeModulesPath = path.resolve(
      process.cwd(),
      i > 0 ? new Array(i).fill('..').join('/') : '',
      folder
    )

    if (fs.existsSync(nodeModulesPath) && fs.lstatSync(nodeModulesPath).isDirectory()) {
      break
    } else if (i === 2) {
      throw new Error('Cannot require "' + module + '", no ' + folder + ' folder found')
    }
  }

  return require(path.resolve(nodeModulesPath, module))
}
