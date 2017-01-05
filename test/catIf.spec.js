/* eslint-env mocha */
const StringHelper = require('../index')
const expect = require('chai').expect

describe('#catIf', () => {
  it('it uses strict comparation on the evaluation of the conditional', () => {
    let result = new StringHelper().catIf('yes', false).str()
    expect(result).to.equal('')
    result = new StringHelper().catIf('yes', null).str()
    expect(result).to.equal('')
    result = new StringHelper().catIf('yes', undefined).str()
    expect(result).to.equal('')
    result = new StringHelper().catIf('yes', true).str()
    expect(result).to.equal('yes')
  })

  it('won\'t invoke cat() when no conditional is sent', () => {
    let helper = new StringHelper()
    let result = helper.catIf('yes').str()
    expect(result).to.equal('')
    result = helper.catIf('no', 'yes', 'maybe').str()
    expect(result).to.equal('')
    result = helper.catIf('ok, no', () => true).str()
    expect(result).to.equal('')
  })

  it('won\'t do anything if no args are sent', () => {
    let result = new StringHelper().catIf().str()
    expect(result).to.equal('')
    result = new StringHelper('Hello!').catIf().str()
    expect(result).to.equal('Hello!')
    result = new StringHelper().cat('Bye!').catIf().str()
    expect(result).to.equal('Bye!')
  })

  it('works with an undefined number or type of arguments to cat()', () => {
    let result = new StringHelper().catIf('yes', 'no', true).str()
    expect(result).to.equal('yesno')
    result = new StringHelper().catIf(['a', 'b'], true).str()
    expect(result).to.equal('ab')
    result = new StringHelper().catIf(() => 'hello', true).str()
    expect(result).to.equal('hello')
    result = new StringHelper().catIf(['a', 'b'], () => 'c', 'd', true).str()
    expect(result).to.equal('abcd')
  })

  it('bleh', () => {
    let myAge = 24
    console.log(
      new StringHelper('Can I go to the movie `Kingsman`? ')
        .catIf('yes', myAge >= 18)
        .catIf('no', myAge < 18).str()
      )
  })
})
