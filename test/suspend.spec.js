/* eslint-env mocha */
let StringHelper = require('../index')
const expect = require('chai').expect

const blobOfText = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Phasellus faucibus hendrerit nulla, rutrum rhoncus diam placerat vel.',
  'Vestibulum semper leo nisl, quis vehicula ipsum accumsan et.',
  'Nunc eleifend odio felis, at congue ligula congue id.',
  'Fusce ex dui, hendrerit quis nisl id, ornare dictum lorem.'
]

const htmlPage = `<body>
  <h1>Some title</h1>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  <p>Phasellus faucibus hendrerit nulla, rutrum rhoncus diam placerat vel.</p>
  <p>Vestibulum semper leo nisl, quis vehicula ipsum accumsan et.</p>
  <p>Nunc eleifend odio felis, at congue ligula congue id.</p>
  <p>Fusce ex dui, hendrerit quis nisl id, ornare dictum lorem.</p>
  <h1>Some other title</h1>
  <p>More content</p>
</body>`

describe('#suspend', () => {
  it('suspends correctly when decorators are applied', () => {
    let helper = new StringHelper()
    let result = helper.cat('a').wrap([], 'c').cat('b').suspend().cat('d').str()
    expect(result).to.equal('abcd')
  })

  it('integrates well with other functions', () => {
    let paragraph = function (content) {
      this.cat(content)
    }
    let helper = new StringHelper()
    let result = helper.suffix('\n')
      .cat('<body>').prefix('  ')
      .cat('<h1>Some title</h1>')
      .suspend().wrap('  <p>', '</p>\n')
      .each(blobOfText, paragraph).end(2)
      .cat('<h1>Some other title</h1>')
      .cat('<p>More content</p>').end(2)
      .cat('</body>').str()
    expect(result).to.equal(htmlPage)
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
