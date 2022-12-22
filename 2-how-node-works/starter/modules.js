

const C = require('./test-module-1');
const calc2 = require('./test-module-2');

const calc1 = new C();

// console.log(calc1.add(1,2));
// console.log(calc1.subtract(25,2));

// console.log(calc2.add(1,2));
// console.log(calc2.subtract(25,2));

const { add, multiply, divide } = require('./test-module-2');

// console.log(add(1,2));
// console.log(multiply(1,2));
//console.log(divide(24,2));

// caching
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();