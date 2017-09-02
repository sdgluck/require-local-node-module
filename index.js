var path = require('path')
var fs = require('fs')

module.exports = function requireLocalNodeModule (pkg, opts) {
  opts = opts || {}

  var distance = typeof opts.distance !== 'undefined' ? opts.distance : 3
  var folder = typeof opts.folder !== 'undefined' ? opts.folder : 'node_modules'

  if (typeof pkg !== 'string' || !pkg.length) {
    throw new Error('Expecting module to be non-empty string')
  } else if (typeof folder !== 'string' || !folder.length) {
    throw new Error('Expecting folder to be non-empty string')
  } else if (typeof distance !== 'number' || distance < 1) {
    throw new Error('Expecting distance to be non-zero positive integer')
  }

  var nodeModulesPath

  for (var i = 0; i < distance; i++) {
    nodeModulesPath = path.resolve(
      process.cwd(),
      new Array(i).fill('..').join('/'),
      folder
    )

    if (fs.existsSync(nodeModulesPath) && fs.lstatSync(nodeModulesPath).isDirectory()) {
      break
    } else if (i === distance - 1) {
      throw new Error('Cannot require "' + pkg + '", no ' + folder + ' folder found')
    }
  }

  return require(path.resolve(nodeModulesPath, pkg))
}
