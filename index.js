module.exports = stringHelper
require('array-extensions')

const classifier = input => Array.isArray(input) ? 'array' : typeof input
const isType = (type, input) => classifier(input) === type

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
    let cond = args.pop()
    if (isType('boolean', cond) && cond) this.cat(args)
    return this
  }

  this.cat([...arguments])
}
