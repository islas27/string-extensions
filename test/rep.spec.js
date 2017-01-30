/* eslint-env mocha */
const StringHelper = require('../StringHelper')
const expect = require('chai').expect

describe('#rep', () => {
  it('appends by default one time the arguments if no `repetitions` is sent', () => {
    let helper = new StringHelper('ones: ')
    let result = helper.rep('1').str()
    expect(result).to.equal('ones: 1')
  })

  it('behaves like cat() when no `repetitions` is sent', () => {
    let helper = new StringHelper()
    let result = helper.rep('1', null).rep('1', false).rep('1', undefined)
      .rep('1', true).rep('1', {}).rep('1', 0).str()
    expect(result).to.equal('11false11true1')
  })

  it('appends the indicated number of times the string sent', () => {
    let helper = new StringHelper()
    let result = helper.rep('a', 3).str()
    expect(result).to.equal('aaa')
    helper = new StringHelper()
    result = helper.rep('hello', 5).str()
    expect(result).to.equal('hellohellohellohellohello')
  })

  it('concatenates numerous and different kind of inputs, the indicated repetitions', () => {
    let helper = new StringHelper()
    let result = helper.rep('a', 'b', 'c', 3).str()
    expect(result).to.equal('abcabcabc')
    helper = new StringHelper()
    result = helper.rep('hello', [' my', ' friend'], () => '! ', 2).str()
    expect(result).to.equal('hello my friend! hello my friend! ')
  })
})
