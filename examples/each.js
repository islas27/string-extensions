const StringHelper = require('../StringHelper')

let helper = new StringHelper()
let people = [
  { name: 'pedro', sex: 'm', age: 30 },
  { name: 'leticia', sex: 'f', age: 21 },
  { name: 'pablo', sex: 'm', age: 20 }
]
let titles = ['ID', 'Name', 'Sex', 'Age']

const row = function (element, index) {
  this.cat('<tr>').prefix('\t')
    .cat('<td>', index, '</td>')
    .cat('<td>', element.name, '</td>')
    .cat('<td>', element.sex, '</td>')
    .cat('<td>', element.age, '</td>').end()
    .cat('</tr>')
}

const titleRow = function (element) {
  this.cat('\t<th>', element, '</th>')
}

helper.suffix('\n').cat('<table>').prefix('\t')
.cat('<thead>').prefix('\t')
.cat('<tr>')
.each(titles, titleRow)
.cat('</tr>').end()
.cat('</thead>')
.cat('<tbody>').prefix('\t')
.each(people, row)
.end()
.cat('</tbody>')
.end()
.cat('</table>')

console.log(helper.str())

// Expected Output:
// <table>
//   <thead>
//     <tr>
//       <th>ID</th>
//       <th>Name</th>
//       <th>Sex</th>
//       <th>Age</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <td>0</td>
//       <td>pedro</td>
//       <td>m</td>
//       <td>30</td>
//     </tr>
//     <tr>
//       <td>1</td>
//       <td>leticia</td>
//       <td>f</td>
//       <td>21</td>
//     </tr>
//     <tr>
//       <td>2</td>
//       <td>pablo</td>
//       <td>m</td>
//       <td>20</td>
//     </tr>
//   </tbody>
// </table>
