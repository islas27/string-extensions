let StringHelper = require('../index')

let helper = new StringHelper()
let result = helper.cat('this is the first line', '\n')
    .cat('here is the second\n')
    .cat(['and then', ' the third'], '\n')
    .cat('now').cat(() => ' we can make some calcs ')
    .cat(function () {
      return ['or even do more complex mixups', () => ' here\n']
    }).cat(function () {
      return this.cat('like using all the helper functions in a function').str()
    })
    .cat(' inside a cat()').str()

console.log(result)

// Output:
// this is the first line
// here is the second
// and then the third
// now we can make some calcs or even do more complex mixups here
// like using all the helper functions in a function inside a cat()
