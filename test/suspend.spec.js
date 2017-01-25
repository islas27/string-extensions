/* eslint-env mocha */
let StringHelper = require('../index')
const expect = require('chai').expect

describe('#suspend', () => {
  it('suspends correctly when decorators are applied', () => {
    let helper = new StringHelper()
    let result = helper.cat('a').wrap([], 'c').cat('b').suspend().cat('d').str()
    expect(result).to.equal('abcd')
  })

  it('won\'t affect further if it is already applied and called again', () => {
    let helper = new StringHelper('a')
    let result = helper.wrap([], 'c').cat('b').suspend().suspend().cat('d').str()
    expect(result).to.equal('abcd')
  })

  it('won\'t change behavior when applied on a helper with no decorators enabled', () => {
    let helper = new StringHelper('a')
    let result = helper.suspend().cat('b').str()
    expect(result).to.equal('ab')
  })
})
