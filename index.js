module.exports = stringHelper
require('array-extensions')

function stringHelper () {
  let buffer = []
  let that = this

  function classifier (input) {
    if (Array.isArray(input)) return 'array'
    else return typeof input
  }

  this.cat = function () {
    const len = arguments.length
    for (let i = 0; i < len; i += 1) {
      let arg = arguments[i]
      let type = classifier(arg)
      if (type === 'function') this.cat(arg.apply(that))
      else if (type === 'array') this.cat(...arg.flatten())
      else if (type === 'undefined' || type === 'object') continue
      else buffer.push(arg)
    }
    return this
  }

  this.str = function () {
    return buffer.join('')
  }

  this.cat([...arguments])
  return this
}
