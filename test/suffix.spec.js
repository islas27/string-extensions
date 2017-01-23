/* eslint-env mocha */
const StringHelper = require('../index')
const expect = require('chai').expect

describe('#suffix', () => {
  it('ignores calls with no arguments', () => {
    let helper = new StringHelper('Hello')
    let result = helper.suffix().str()
    expect(result).to.equal('Hello')
  })

  it('appends correctly the decorator to cat() calls', () => {
    let helper = new StringHelper()
    let result = helper.suffix('2').cat('1').str()
    expect(result).to.equal('12')
  })

  it('affects only the posterior cat() calls', () => {
    let helper = new StringHelper('0')
    let result = helper.suffix('2').cat('1').suffix('3').cat('1').str()
    expect(result).to.equal('012123')
  })

  it('is capable of receiving functions', () => {
    const cls = (function () {
      let count = 0
      return () => ++count
    }())
    let helper = new StringHelper()
    let result = helper.suffix('list item ').rep(cls, '.- ', 2).str()
    expect(result).to.equal(`1.- list item 2.- list item `)
  })

  it('is capable of receiving more complex inputs', () => {
    let helper = new StringHelper()
    let result = helper.suffix(['2', '3', () => '4', [5, 6]]).cat('1').str()
    expect(result).to.equal('123456')
  })
})
