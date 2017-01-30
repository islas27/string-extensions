/* eslint-env mocha */
const expect = require('chai').expect
const StringHelper = require('../StringHelper')

describe('#end', () => {
  it('will "pop" the last decorator added if no `deep` is sent', () => {
    let helper = new StringHelper()
    let result = helper.cat('a').wrap('b', 'd').cat('c').end().cat('e').str()
    expect(result).to.equal('abcde')
  })

  it('will "pop" the last decorator added when `deep` is invalid', () => {
    let helper = new StringHelper()
    let result = helper.cat('a').wrap('b', 'd').cat('c')
      .end(false).cat('e').str()
    expect(result).to.equal('abcde')
    helper = new StringHelper()
    result = helper.cat('a').wrap('b', 'd').cat('c')
      .end(null).cat('e').str()
    expect(result).to.equal('abcde')
    helper = new StringHelper()
    result = helper.cat('a').wrap('b', 'd').cat('c')
      .end(undefined).cat('e').str()
    expect(result).to.equal('abcde')
    helper = new StringHelper()
    result = helper.cat('a').wrap('b', 'd').cat('c')
      .end({a: 1}).cat('e').str()
    expect(result).to.equal('abcde')
    helper = new StringHelper()
    result = helper.cat('a').wrap('b', 'd').cat('c')
      .end(-1).cat('e').str()
    expect(result).to.equal('abcde')
    helper = new StringHelper()
    result = helper.cat('a').wrap('b', 'd').cat('c')
      .end(-100).cat('e').str()
    expect(result).to.equal('abcde')
  })

  it('will "pop" the indicated number of decorators', () => {
    let helper = new StringHelper()
    let result = helper.wrap('b', 'd').wrap('a', 'e').cat('c')
      .end(2).cat('f').str()
    expect(result).to.equal('abcdef')
  })

  it('will "pop" all the available decorators if deep > available', () => {
    let helper = new StringHelper()
    let result = helper.wrap('b', 'd').wrap('a', 'e').cat('c')
      .end(5).cat('f').str()
    expect(result).to.equal('abcdef')
  })

  it('will not "pop" decorators if deep == 0', () => {
    let helper = new StringHelper()
    let result = helper.wrap('b', 'd').wrap('a', 'e ').cat('c')
      .end(0).cat('f').str()
    expect(result).to.equal('abcde abfde ')
  })

  it('ends the suspend() behavior when called', () => {
    let helper = new StringHelper('a')
    let result = helper.wrap('b', 'd').cat('c').suspend().cat('e').end()
      .cat('c').str()
    expect(result).to.equal('abcdebcd')
  })
})
