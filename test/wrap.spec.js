/* eslint-env mocha */
const StringHelper = require('../index')
const expect = require('chai').expect

describe('#wrap', () => {
  it('ignores calls with no arguments', () => {
    let helper = new StringHelper('Hello')
    let result = helper.wrap().str()
    expect(result).to.equal('Hello')
  })

  it('ignores calls with missing arguments', () => {
    let helper = new StringHelper('Hello')
    let result = helper.wrap(' Stranger').str()
    expect(result).to.equal('Hello')
  })

  it('ignores calls with more arguments than indicated', () => {
    let helper = new StringHelper('Hello')
    let result = helper.wrap(' Stranger!', ' Who', ' Are you?').str()
    expect(result).to.equal('Hello')
  })

  it('appends correctly the decorators to cat() calls', () => {
    let helper = new StringHelper()
    let result = helper.wrap('1', '3').cat('2').str()
    expect(result).to.equal('123')
  })

  it('affects only the posterior cat() calls', () => {
    let helper = new StringHelper('0')
    let result = helper.wrap('1', '3').cat('2').wrap('2', '4').cat('').str()
    expect(result).to.equal('01232134')
  })

  it('is capable of receiving functions', () => {
    let cls = (function () {
      let count = 0
      return function () {
        return ++count
      }
    }())
    let helper = new StringHelper()
    let result = helper.cat('<ul>').wrap(['<li>', cls, '.- '], '</li>')
    .rep('list item', 2).str()
    expect(result).to.equal(`<ul><li>1.- list item</li><li>2.- list item</li>`)
  })

  it('is capable of receiving more complex inputs', () => {
    let helper = new StringHelper()
    let result = helper.wrap(['1', '2', '3'], ['5', '6', '7']).cat('4').str()
    expect(result).to.equal('1234567')
  })
})
