/* eslint-env mocha */
const StringHelper = require('../StringHelper')
const expect = require('chai').expect

let people = [
  { name: 'pedro', sex: 'm', age: 30 },
  { name: 'leticia', sex: 'f', age: 21 },
  { name: 'pablo', sex: 'm', age: 20 }
]
let htmlSection = `<p>pedro is male</p>
<p>leticia is female</p>
<p>pablo is male</p>
`

describe('#when', () => {
  it('calls cat() on `thenArgs` when expression is true', () => {
    let exp = 10 > 0
    let helper = new StringHelper()
    let result = helper.when(exp, 'a', 'b').str()
    expect(result).to.equal('a')
  })

  it('calls cat() on `otherwiseArgs` when expression is true', () => {
    let exp = 0 > 100
    let helper = new StringHelper()
    let result = helper.when(exp, 'a', 'b').str()
    expect(result).to.equal('b')
  })

  it('behaves safely when no `otherwiseArgs` is sent', () => {
    let exp = 0 > 100
    let helper = new StringHelper()
    let result = helper.suffix('1').when(exp, 'a').str()
    expect(result).to.equal('')
  })

  it('works well with other functions', () => {
    let helper = new StringHelper()
    let result = helper.wrap('<p>', '</p>\n')
    .each(people, function (person) {
      this.when(person.sex === 'm',
        function () {
          return person.name + ' is male'
        },
        [ person.name, ' is female' ]
      )
    }).str()
    expect(result).to.equal(htmlSection)
  })
})
