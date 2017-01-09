module.exports = stringHelper
require('array-extensions')

const isArr = inp => Array.isArray(inp)
const isType = (type, inp) => typeof inp === type
const isFunc = inp => isType('function', inp)
const isNum = inp => isType('number', inp)
const isIgnored = inp => isType('undefined', inp) || isType('object', inp)

function stringHelper () {
  let buffer = []

  this.cat = function () {
    const len = arguments.length
    for (let i = 0; i < len; i += 1) {
      let arg = arguments[i]
      if (isFunc(arg)) this.cat(arg.apply(this))
      else if (isArr(arg)) this.cat(...arg.flatten())
      else if (isIgnored(arg)) continue
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
    if (isNum(rep)) {
      for (let i = 0; i < rep; i += 1) {
        this.cat(args)
      }
    } else this.cat(args.concat(rep))
    return this
  }

  this.cat([...arguments])
}
