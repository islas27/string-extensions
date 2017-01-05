/* eslint-env mocha */
const StringHelper = require('../index')
const expect = require('chai').expect

describe('#rep', () => {
  it('appends by default one time the string if no `repetitions` is sent', () => {
    let helper = new StringHelper('ones: ')
    let result = helper.rep('1').str()
    expect(result).to.equal('ones: 1')
  })

  it('convertes to a number 1 the `rep` argument if not a number', () => {
    let helper = new StringHelper()
    let result = helper.rep('1', null).rep('1', false).rep('1', undefined)
      .rep('1', true).rep('1', {}).rep('1', 0).str()
    expect(result).to.equal('11111')
  })

  it('appends the indicated number of times the string sent', () => {
    let helper = new StringHelper()
    let result = helper.rep('a', 3).str()
    expect(result).to.equal('aaa')
    helper = new StringHelper()
    result = helper.rep('hello', 5).str()
    expect(result).to.equal('hellohellohellohellohello')
  })
})
