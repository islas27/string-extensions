module.exports = stringHelper
require('array-extensions')

function stringHelper () {
  let buffer = (arguments.length > 0) ? [...arguments].flatten() : []
  function classifier (input) {
    if (Array.isArray(input)) return 'array'
    else return typeof input
  }
  return {
    cat: function () {
      const len = arguments.length
      for (let i = 0; i < len; i += 1) {
        let arg = arguments[i]
        let type = classifier(arg)
        switch (type) {
          case 'function':
            buffer.push(arg.apply(this, buffer))
            break
          case 'array':
            buffer.push(...arg.flatten())
            break
          case 'undefined':
          case 'object':
            break
          default:
            buffer.push(arg)
        }
      }
      return this
    },
    str: function () {
      return buffer.join('')
    }
  }
}
