/* eslint-env mocha */
const StringHelper = require('../StringHelper')
const expect = require('chai').expect

describe('#prefix', () => {
  it('ignores calls with no arguments', () => {
    let helper = new StringHelper('Hello')
    let result = helper.prefix().str()
    expect(result).to.equal('Hello')
  })

  it('appends correctly the decorator to cat() calls', () => {
    let helper = new StringHelper()
    let result = helper.prefix('1').cat('2').str()
    expect(result).to.equal('12')
  })

  it('affects only the posterior cat() calls', () => {
    let helper = new StringHelper('0')
    let result = helper.prefix('1').cat('2').prefix('0').cat('2').str()
    expect(result).to.equal('012012')
  })

  it('is capable of receiving functions', () => {
    const cls = (function () {
      let count = 0
      return () => ++count
    }())
    let helper = new StringHelper()
    let result = helper.prefix(cls, '.- ')
    .rep('list item ', 2).str()
    expect(result).to.equal(`1.- list item 2.- list item `)
  })

  it('is capable of receiving more complex inputs', () => {
    let helper = new StringHelper()
    let result = helper.prefix(['1', '2', () => '3', [4, 5]]).cat('6').str()
    expect(result).to.equal('123456')
  })
})
