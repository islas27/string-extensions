# stringHelperJS
A string builder to make strings easier to manage

Examples of how to use the methods can be found in the examples folder, with a commented output, which can be verified by executing the example using node in any terminal: `node examples/[method].js`

## Usage

```js
//Require the package where you need it:
const StringHelper = require('stringHelperJS')

// And create a new instance to help you manage all those bothersome strings:
let helper = new StringHelper()
// You can even start the instance with some content inside already:
let helper = new StringHelper('The start of a string')
// Or use an array already to start working with them
let helper = new StringHelper(['Another ', 'String'])

// Do some magic with does strings
// [ADD EXAMPLES]

// And then use str() to output the final result
console.log(helper.str())
```

Complete example:
```js
let helper = new StringHelper(['Another ', 'String'])
helper.cat(' To', ' Output', ' To Console')
console.log(helper.str())
// Output according to the last example: 'Another String To Output To Console'
```

---

### str()
The final operation, it will output everything recorded by the usage of the function in a string.

**Sintax**: `helper.str()`

**Inputs**: none

**Outputs**: String

---

### cat(..args)
This function will 'save' all the strings sent to it in any format, be it a list of strings, an array of strings, a function even can be sent and it will be executed, saving the result for further processes.

**Sintax**: `helper.cat(arg1, arg2, ...argN)`

**Inputs**: Any kind of input that ultimately can be converted or executed into a string.

**Outputs**: itself, to be capable of chained execution

**Example**: [cat.js](examples/cat.js)

**Notes**:
- When `typeof` of an input evaluates to `object` or `undefined`, this argument will be ignored. This happens to any kind of object, map, null or undefined values. To know more about the `typeof` operand, follow this link: [typeof - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)
- While arrow functions maybe more clean and concise, the do not bind the `this` object, so in case you need to use the helper inside a function that is going to be passed as an argument, write an old fashion function. More info on arrow functions: [Arrow Functions - MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

### catIf(..args, condition)
This function will 'save' all the strings sent to it in any format, be it a list of strings, an array of strings, a function even can be sent and it will be executed, saving the result for further processes.

**Sintax**: `helper.catIf(arg1, arg2, ...argN, contidion)`

**Inputs**: `argN`: Any kind of input that ultimately can be converted or executed into a string. `contidion`: a boolean (strictly) to decide is the previous arguments are to be cat() or not.

**Outputs**: itself, to be capable of chained execution

**Example**:
```js
let myAge = 24
console.log(
  new StringHelper('Can I go to the movie `Kingsman`? ')
    .catIf('yes! (:', myAge >= 18).catIf('no :(', myAge < 18).str()
  )
```
