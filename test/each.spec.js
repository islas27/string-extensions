/* eslint-env mocha */
const StringHelper = require('../index')
const expect = require('chai').expect
const sinon = require('sinon')

describe('#each', () => {
  let data = [
    {a: 1, b: 'John'},
    {a: 2, b: 'Jane'},
    {a: 3, b: 'Lisa'}
  ]

  let table = '<table><thead>' +
  '<tr><th>ID</th><th>Name</th></tr>' +
  '</thead><tbody>' +
  '<tr><td>1</td><td>John</td></tr>' +
  '<tr><td>2</td><td>Jane</td></tr>' +
  '<tr><td>3</td><td>Lisa</td></tr>' +
  '</tbody></table>'

  it('sends the correct parameters to the callback', () => {
    let cbSpy = sinon.spy()
    const cb1Args = [{a: 2, b: 'Jane'}, 1, data]
    let helper = new StringHelper()
    let result = helper.each(data, cbSpy).str()
    expect(result).to.equal('')
    expect(cbSpy.getCall(1).args).to.eql(cb1Args)
  })

  it('it executes the received callback', () => {
    let cbSpy = sinon.spy()
    let helper = new StringHelper()
    let result = helper.each(data, cbSpy).str()
    expect(result).to.equal('')
    expect(cbSpy.calledThrice).to.be.true
  })

  it('it has available the helper inside the callback', () => {
    let cbSpy = sinon.spy()
    let helper = new StringHelper()
    let result = helper.each(data, cbSpy).str()
    expect(result).to.equal('')
    expect(cbSpy.thisValues[0]).to.be.equal(new StringHelper())
  })

  it('it does not break behavior after it\'s use', () => {
    let rows = function (value, index, thePeople) {
      this
        .cat('<tr>')
        .cat('<td>', value.a, '</td>')
        .cat('<td>', value.b, '</td>')
        .cat('</tr>')
    }
    let helper = new StringHelper()
    let result = helper.cat('<table>')
      .cat('<thead><tr><th>ID</th><th>Name</th></thead>')
      .cat('<tbody>').each(data, rows).cat('</tbody>')
      .cat('</table>').str()
    expect(result).to.equal(table)
  })
})
