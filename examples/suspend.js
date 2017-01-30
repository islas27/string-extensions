let StringHelper = require('../StringHelper')

const linesOfText = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Phasellus faucibus hendrerit nulla, rutrum rhoncus diam placerat vel.',
  'Vestibulum semper leo nisl, quis vehicula ipsum accumsan et.',
  'Nunc eleifend odio felis, at congue ligula congue id.',
  'Fusce ex dui, hendrerit quis nisl id, ornare dictum lorem.'
]

let paragraph = function (content) {
  this.cat(content)
}

let helper = new StringHelper()
let result = helper.suffix('\n')
  .cat('<body>').prefix('\t')
  .cat('<h1>Some title</h1>')
  .suspend().wrap('\t<p>', '</p>\n')
  .each(linesOfText, paragraph).end(2)
  .cat('<h1>Some other title</h1>')
  .cat('<p>More content</p>').end(2)
  .cat('</body>').str()

console.log(result)

// Expected Output
// <body>
//  <h1>Some title</h1>
//  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//  <p>Phasellus faucibus hendrerit nulla, rutrum rhoncus diam placerat vel.</p>
//  <p>Vestibulum semper leo nisl, quis vehicula ipsum accumsan et.</p>
//  <p>Nunc eleifend odio felis, at congue ligula congue id.</p>
//  <p>Fusce ex dui, hendrerit quis nisl id, ornare dictum lorem.</p>
//  <h1>Some other title</h1>
//  <p>More content</p>
// </body>
