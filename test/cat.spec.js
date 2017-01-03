/* eslint-env mocha */
const StringHelper = require('../index')
const expect = require('chai').expect
const sinon = require('sinon')

describe('#cat', () => {
  it('returns a concatenated string with the buffer', () => {
    let helper = new StringHelper('a')
    let result = helper.cat('b').str()
    expect(result).to.equal('ab')
    helper = new StringHelper()
    result = helper.cat('c').str()
    expect(result).to.equal('c')
  })

  it('returns a concatenated string when using various strings as arguments', () => {
    let helper = new StringHelper('a')
    let result = helper.cat('b', 'c', 'd').str()
    expect(result).to.equal('abcd')
    helper = new StringHelper()
    result = helper.cat('b', 'c', 'd').str()
    expect(result).to.equal('bcd')
  })

  it('returns a concatenated string when using an array as input', () => {
    let helper = new StringHelper('a')
    let result = helper.cat(['b', 'c', 'd']).str()
    expect(result).to.equal('abcd')
    helper = new StringHelper()
    result = helper.cat(['b', 'c', 'd'], ['e', 'f', ['a', 'b']]).str()
    expect(result).to.equal('bcdefab')
  })

  it('returns a concatenated string when using a function as input', () => {
    let helper = new StringHelper('This is ')
    let result = helper.cat(() => 'A String').str()
    expect(result).to.equal('This is A String')
    helper = new StringHelper()
    result = helper.cat(() => 'A String').str()
    expect(result).to.equal('A String')
    let f1 = () => 'A new '
    let f2 = () => 'String'
    helper = new StringHelper()
    result = helper.cat(f1, f2).str()
    expect(result).to.equal('A new String')
  })

  it('concatenates nicely different kind of inputs in the same call', () => {
    let helper = new StringHelper('This is ')
    let result = helper.cat('a', [' String', '!!'], () => ' right?').str()
    expect(result).to.equal('This is a String!! right?')
    helper = new StringHelper()
    result = helper.cat('This is ', 'a', [' String', '!!'], () => ' right?').str()
    expect(result).to.equal('This is a String!! right?')
  })

  it('self-chains into other cat() calls', () => {
    let helper = new StringHelper().cat('a', 'b', 'c')
    let result = helper.cat('d').cat([1, 2, 3]).cat(() => 4).str()
    expect(result).to.equal('abcd1234')
  })
})
