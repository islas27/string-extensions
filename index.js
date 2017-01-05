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

  this.rep = function (s, rep) {
    let repetitions = (classifier(rep) === 'number') ? rep : 1
    for (let i = 0; i < repetitions; i += 1) {
      this.cat(s)
    }
    return this
  }

  this.cat([...arguments])
}
