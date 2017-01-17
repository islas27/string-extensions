# stringHelperJS
A string builder to make strings easier to manage

Some examples of how to use the methods can be found in the examples folder when no example is given here, with a commented output, which can be verified by executing the example using node in any terminal: `node examples/[method].js`

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
This function will record all the strings sent to it in any format (a list of strings, an array of strings, or even a function), which can be used for further processes.

**Sintax**: `helper.cat(arg1, arg2, ...argN)`

**Inputs**: Any kind of input that ultimately can be converted or executed into a string.

**Outputs**: itself, to be capable of chained execution

**Example**: [cat.js](examples/cat.js)

**Notes**:
- When `typeof` of an input evaluates to `object` or `undefined`, this argument will be ignored. This happens to any kind of object, map, null or undefined values. To know more about the `typeof` operand, follow this link: [typeof - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)
- While arrow functions may be more clean and concise, they do not bind a context to the execution of the function (`this`), so in case you need to use the helper inside a function that is going to be passed as an argument, write an old fashioned function. More info on arrow functions: [Arrow Functions - MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

---

### catIf(..args, condition)
This function works as a conditional wrapper for `cat()`, as it will only execute `cat()` if the condition sent evaluates to true.

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
**Notes**: When the method is called with no boolean at the end or a list or args with less than two elements, it will not do anything

---

### rep(arg1, arg2, ... , argN, repetitions)
The function will append at the end of the current buffer the arguments sent, the number of times indicated.

**Sintax**: `helper.rep(arg1, arg2, ... , argN, repetitions)`

**Inputs**: `arg1`, `arg2`, ... , `argN`: Any kind of input that ultimately can be converted or executed into a string. `repetitions`: the number of times to repeat the same string

**Outputs**: itself, to be capable of chained execution

**Example**:
```js
helper.cat('Mom, can you').rep(' please', 10).cat(' buy me an ice cream');
```
**Notes**: In case no `repetitions` is sent, or is not a number, by default will append the arguments one time
