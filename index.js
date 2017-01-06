module.exports = stringHelper
require('array-extensions')

const classifier = input => Array.isArray(input) ? 'array' : typeof input

function stringHelper () {
  let buffer = []

  this.cat = function () {
    const len = arguments.length
    for (let i = 0; i < len; i += 1) {
      let arg = arguments[i]
      let type = classifier(arg)
      if (type === 'function') this.cat(arg.apply(this))
      else if (type === 'array') this.cat(...arg.flatten())
      else if (type === 'undefined' || type === 'object') continue
      else buffer.push(arg)
    }
    return this
  }

  this.str = function () {
    return buffer.join('')
  }

  this.catIf = function () {
    let args = [...arguments]
    if (args.pop() === true) this.cat(args)
    return this
  }

  this.cat([...arguments])
}
