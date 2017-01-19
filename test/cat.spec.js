/* eslint-env mocha */
const StringHelper = require('../index')
const expect = require('chai').expect

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

  it('ignores objects', () => {
    let helper = new StringHelper()
    let result = helper.cat('cat ignores objects')
      .cat({name: 'John', lastName: 'Constantine'}).str()
    expect(result).to.equal('cat ignores objects')
  })
  it('handles correctly falsy values (null, undefined, false)', () => {
    let helper = new StringHelper()
    let result = helper.cat(false).cat(null).cat(undefined)
      .cat(false, null, undefined).str()
    expect(result).to.equal('falsefalse')
  })

  it('hanldles correctly differnt kind of outputs from functions', () => {
    let helper = new StringHelper()
    let result = helper.cat(() => 'A string ').cat(() => ['can ', 'be '])
      .cat(() => null).cat(() => undefined).cat(() => () => 'easily manipulated! ')
      .cat(() => true).cat('!').str()
    expect(result).to.equal('A string can be easily manipulated! true!')
  })

  it('handles functions stored in an array', () => {
    let helper = new StringHelper()
    let result = helper
      .cat([() => ['a', 'b'], () => 'c', () => () => 'd']).str()
    expect(result).to.equal('abcd')
  })

  it('is capable of using itself inside a function', () => {
    let helper = new StringHelper('Another')
    let result = helper.cat(function () {
      return this.cat('String').str()
    }).str()
    expect(result).to.equal('AnotherString')
  })

  it('has the buffer in a private environment', () => {
    let helper = new StringHelper().cat('a', 'b', 'c')
    let result = helper.buffer
    expect(result).to.be.undefined
  })

  it('self-chains into other cat() calls', () => {
    let helper = new StringHelper().cat('a', 'b', 'c')
    let result = helper.cat('d').cat([1, 2, 3]).cat(() => 4).str()
    expect(result).to.equal('abcd1234')
  })
})
