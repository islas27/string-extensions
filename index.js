module.exports = stringHelper

function stringHelper () {
  let buffer = []
  let classifier = function (input) {
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
            buffer.push(...arg)
            break
          case 'undefined':
          case 'object':
            break
          default:
            buffer.push(arg)
        }
      }
      console.log(buffer)
      return this
    }
  }
}
