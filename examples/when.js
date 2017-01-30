let StringHelper = require('../index')

let people = [
  { name: 'pedro', sex: 'm', age: 30 },
  { name: 'leticia', sex: 'f', age: 21 },
  { name: 'pablo', sex: 'm', age: 20 }
]

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

console.log(result)

// Expected output
// <p>pedro is male</p>
// <p>leticia is female</p>
// <p>pablo is male</p>
//
