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
- `cat()` can be quite powerful, as you get a new instance of `StringHelper` bounded to `this` when functions received as parameters are called. Just remember to **return** the result with a `str()`. Example:
```js
let helper = new StringHelper('Another')
let result = helper.cat(function () {
  return this.cat('String').str()
}).str()
// Output: AnotherString
```

---

### catIf(..args, condition)
This function works as a conditional wrapper for `cat()`, as it will only execute `cat()` if the condition sent evaluates to true.

**Sintax**: `helper.catIf(arg1, arg2, ...argN, condition)`

**Inputs**: `argN`: Any kind of input that ultimately can be converted or executed into a string. `contidion`: a boolean (strictly) to decide if the previous arguments are to be cat() or not.

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

---

### wrap([prefix], [suffix])
`wrap()` takes two arguments which will be preappended and appended to the subsequent calls made to add strings, calls like `cat()`, `catIf()`, `rep()`, etc. The content will be stacked, wrapping the content like an onion.

**Sintax**: `helper.wrap([prefix], [suffix])`

**Inputs**: `[prefix]` & `[suffix]`: Inputs that ultimately can be converted or executed into a string. Each can be a single argument, or an array holding more strings.

**Outputs**: itself, to be capable of chained execution.

**Example**: [wrap.js](examples/wrap.js)

**Notes**:
- It will wrap **all** the content in a `cat()` call, not each argument in it. `rep()` will do a `cat()` call for each repetition (So a `rep('a', 5)` is actually calling `cat()` five times).

---

### prefix(arg1, arg2, ... , argN)
Similar to `cat()`, `prefix()` takes an indeterminate number of arguments, and will add the decorators in the same manner as `wrap()`.

**Sintax**: `helper.prefix(arg1, arg2, ... , argN)`

**Inputs**: Any kind of input that ultimately can be converted or executed into a string.

**Outputs**: itself, to be capable of chained execution.

**Example**:
```js
let result = helper.prefix('Mr. ').cat('John Smith ').cat('Joe Black').str()
// Outputs: 'Mr. John Smith Mr. Joe Black'
```

**Notes**:
- This is actually a wrapper for `wrap([my prefix], [])`, so the same behavior applies to any `prefix()` call.

---

### suffix(arg1, arg2, ... , argN)
`suffix()` works in a similar fashion to `prefix()`, it takes an indeterminate number of arguments, and will add the decorators at the end of subsequent `cat()` calls.

**Sintax**: `helper.suffix(arg1, arg2, ... , argN)`

**Inputs**: Any kind of input that ultimately can be converted or executed into a string.

**Outputs**: itself, to be capable of chained execution.

**Example**:
```js
let result = helper.suffix('.- list item ').cat('1').cat('2').str()
// Outputs: '1.- list item 2.- list item'
```

**Notes**:
- This is actually a wrapper for `wrap([], [my suffix])`, so the same behavior applies to any `suffix()` call.

---

### end(deep)
This function will cancel the last decorator added (`wrap`, `prefix`, `suffix`), or cancel the number of decorators indicated by the `deep` parameter. It can also cancel a `suspend()` effect.

**Sintax**: `helper.end(deep)`

**Inputs**: `deep`: optional input to indicate how many decorators are to be canceled. Defaults to 1

**Outputs**: itself, to be capable of chained execution

**Example**:
```js
let helper = new StringHelper()
let result = helper.cat('a').wrap('b', 'd').cat('c').end().cat('e').str()
// result: abcde
```

**Notes**:
- If `deep` is not a valid number (deep >= 0), it will default to 1 too. If deep is larger than the number of decorators, it will remove all of them.

---

### each([args], callback)
With this function you can pass a callback to be executed for each member in array; It will have the current state of the builder available through the `this` variable.

**Sintax**: `helper.each([args], callback)`

**Inputs**: `[args]`: Array of elements to be iterated. `callback`: The function to be called for each element in the `[args]` array; It will receive the current `element`, the `index` of it, and the whole list `args`.

**Outputs**: itself, to be capable of chained execution

**Example**: [each.js](examples/each.js), [each2.js](examples/each2.js)

**Notes**:
- Because inside the callback function the current builder is available, it is not needed to output content, just to keep interacting with the helper to keep building the final string. Conversely, the result of the callback will be lost.

---

### suspend()
It will save the current decorators and give you a blank slate to keep adding new ones. `end()` is what needs to be called to return to the previous state when there are no more decorators pending.

**Sintax**: `helper.suspend()`

**Outputs**: itself, to be capable of chained execution

**Example**: [suspend.js](examples/suspend.js)

**Notes**:
- Passing a number greater than the current decorators will restore the previous state (if it exists). Just beware, that if the number is greater than the current decorators + 1, then `end()` will start removing decorators in the freshly restored state. Example:
```js
// This will remove the suffix decorator
helper.wrap('<h1>', '</h1>').suspend().suffix('\n').end(1)
// This will restore the wrap decorator
helper.wrap('<h1>', '</h1>').suspend().suffix('\n').end(2)
// This will remove both wrap() and suffix()
helper.wrap('<h1>', '</h1>').suspend().suffix('\n').end(3)
```

---

### when(expression, thenArgs, otherwiseArgs)
This functions works in a similar manner to `catIf()`, it takes a parameter to decide which argument send to a `cat()` call. The main difference is the order of the arguments and the option to add an `otherwiseArgs` should `expression` be false.

**Sintax**: `helper.each([args], callback)`

**Inputs**: `expression`: A parameter used to decide which argument send to the `cat()` call. `thenArgs`: the argument to be sent to `cat()` should `expression` be true. `otherwiseArgs`: the argument to be sent to `cat()` should `expression` be false.

**Outputs**: itself, to be capable of chained execution

**Example**: [when.js](examples/when.js)

**Notes**:
- `expression` can also be a function, and even use the same context as the builder but it must return a `true` value to really call `cat()` with the `thenArgs`.
