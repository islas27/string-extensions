module.exports = stringHelper
require('array-extensions')

const isArr = inp => Array.isArray(inp)
const isType = (type, inp) => typeof inp === type
const isFunc = inp => isType('function', inp)
const isNum = inp => isType('number', inp)
const isIgnored = inp => isType('undefined', inp) || isType('object', inp)
const wrp = (pf, arg, sf) => pf.concat([...arg].concat(sf))

function stringHelper () {
  let aux = []
  let buffer = []
  let prefixes = []
  let suffixes = []
  let decorators = false
  let that = this

  function ccat () {
    const len = arguments.length
    let args = arguments
    for (let i = 0; i < len; i += 1) {
      let arg = args[i]
      if (isFunc(arg)) ccat(arg.apply(that))
      else if (isArr(arg)) ccat(...arg.flatten())
      else if (isIgnored(arg)) continue
      else aux.push(arg)
    }
  }

  this.cat = function () {
    let args = (decorators) ? wrp(prefixes, arguments, suffixes) : arguments
    aux = []
    ccat([...args])
    buffer.push(...aux)
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

  this.wrap = function (prefix, suffix) {
    if ([...arguments].length !== 2) return this
    decorators = true
    prefixes.unshift(prefix)
    suffixes.push(suffix)
    return this
  }

  this.cat([...arguments])
}
