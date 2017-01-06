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
      if (isType('function', arg)) this.cat(arg.apply(this))
      else if (isType('array', arg)) this.cat(...arg.flatten())
      else if (isType('undefined', arg) || isType('object', arg)) continue
      else buffer.push(arg)
    }
    return this
  }

  this.str = function () {
    return buffer.join('')
  }

  this.rep = function () {
    let args = [...arguments]
    let rep = args.pop()
    if (isType('number', rep)) {
      for (let i = 0; i < rep; i += 1) {
        this.cat(args)
      }
    } else this.cat(args.concat(rep))
    return this
  }

  this.cat([...arguments])
}
