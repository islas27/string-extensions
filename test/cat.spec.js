const StringHelper = require('../index')
const expect = require('chai').expect
const sinon = require('sinon')

describe('#cat', () => {
  it('returns the buffer', () => {
    let sh = new StringHelper()
    sh.cat('hello', 'bye', 'thisissomerandomtext').cat('!!!')
    .cat(['a', 'b', 'c'])
    .cat(function () {
      return ' AndSomeMoreText'
    })
    .cat(true)
    .cat({name: 'Guy'})
    .cat(100.10)
    .cat(undefined)
    console.log(sh.buffer)
  })
})
