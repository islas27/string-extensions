const StringHelper = require('../StringHelper')

let helper = new StringHelper()
let sections = ['section 1', 'section 2', 'section 3']

let sectionContent = function (element) {
  this.cat('<h1>', element, '</h1><p>first paragraph</p><p>second paragraph</p>')
}

helper
.cat('<body>\n')
.wrap('<section>', '</section>').wrap('\t', '\n')
.each(sections, sectionContent)
.end(2)
.cat('</body>')

console.log(helper.str())

// Expected Output:
// <body>
//   <section><h1>section 1</h1><p>first paragraph</p><p>second paragraph</p></section>
//   <section><h1>section 2</h1><p>first paragraph</p><p>second paragraph</p></section>
//   <section><h1>section 3</h1><p>first paragraph</p><p>second paragraph</p></section>
// </body>
