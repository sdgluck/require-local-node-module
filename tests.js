var fs = require('fs')
var requireLocal = require('./')

describe('require-local-node-module', () => {
  test('throws with bad module name', () => {
    expect(() => requireLocal()).toThrowError(/expecting module/i)
    expect(() => requireLocal('')).toThrowError(/expecting module/i)
  })

  test('throws with bad distance', () => {
    expect(() => requireLocal('module', {distance: ''})).toThrowError(/expecting distance/i)
    expect(() => requireLocal('module', {distance: -1})).toThrowError(/expecting distance/i)
  })

  test('throws without node_modules folder', (done) => {
    fs.rename('./mock_node_modules', './.mock_node_modules', () => {
      expect(() => {
        requireLocal('spongebob', {folder: 'mock_node_modules'})
      }).toThrowError(/cannot require/i)
      fs.renameSync('./.mock_node_modules', './mock_node_modules')
      done()
    })
  })

  test('gets local module', () => {
    var spongebob = requireLocal('spongebob', {folder: 'mock_node_modules'})
    expect(spongebob).toEqual('squarepants')
  })
})
