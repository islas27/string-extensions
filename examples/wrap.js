let StringHelper = require('../index')

let result = new StringHelper().cat('Explaining wrap():\n')
  .wrap('it can', ' content').cat(' enclose').str()
console.log(result)
// Output:
// Explaining wrap():
// it can enclose content
result = new StringHelper().cat('Another example:\n')
  .wrap(' work', ' content').wrap('it will', ' like an onion')
  .cat(' by stacking').str()
console.log(result)
// Output:
// Another Example:
// it will work by stacking content like an onion

const cls = (function () {
  let count = 0
  return function () {
    return ++count
  }
}())
result = new StringHelper().cat('Example using other kind of inputs:\n')
  .wrap([() => '-', ' '], [' ', cls, '\n']).rep('item', 3).str()
console.log(result)
// Output:
// Example using other kind of inputs:
// - item 1
// - item 2
// - item 3
