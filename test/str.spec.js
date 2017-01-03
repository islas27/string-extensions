/* eslint-env mocha */
let StringHelper = require('../index')
const expect = require('chai').expect

describe('#str', () => {
  it('returns the buffer empty string when initialized empty', () => {
    let helper = new StringHelper()
    expect(helper.str()).to.equal('')
  })

  it('returns the same string it received during init', () => {
    let helper = new StringHelper('initBuffer')
    expect(helper.str()).to.equal('initBuffer')
  })

  it('returns a string when the init arg is an array', () => {
    let helper = new StringHelper(['a', 'b'])
    expect(helper.str()).to.equal('ab')
  })
})
