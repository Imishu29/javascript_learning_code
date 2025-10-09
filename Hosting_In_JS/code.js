// hosting.js

/** Example 1: var + function declaration */
var a = 10;

console.log(a); // 10

function callstack(){
    console.log("hello hi how are you");
}

console.log(callstack); // [Function: callstack]

/**
 * Explanation:
 * - var a is hoisted, initialized with undefined, later assigned 10 → prints 10
 * - function callstack is hoisted completely (with body), so reference is available
 */


/** Example 2: access before declaration */
console.log(a);         // undefined (because var is hoisted but not initialized yet)
console.log(callstack); // [Function: callstack]

var a = 10;

function callstack(){
    console.log("hello hi how are you");
}

/**
 * Explanation:
 * - var a is hoisted but initialized as undefined until assignment
 * - function declarations are hoisted fully, so callstack is available before definition
 */


/** Example 3: callbackify (higher-order function) */
console.log(callbackify); // [Function: callbackify]

function callbackify(fn) {
    return function() {
        console.log("Inside callbackify wrapper");
        fn();
    }
}

callbackify(()=>{
    console.log("hello hi");
})();

/**
 * Output:
 * [Function: callbackify]
 * Inside callbackify wrapper
 * hello hi
 */


/** Example 4: Normal function vs Arrow function */

// Normal function (function declaration)
sayHello(); // ✅ works, because full function is hoisted

function sayHello() {
    console.log("Hello from normal function");
}

// Arrow function (function expression with var)
try {
    sayArrow(); // ❌ TypeError: sayArrow is not a function (because only variable is hoisted, not the function)
} catch (e) {
    console.log("Error:", e.message);
}

var sayArrow = () => {
    console.log("Hello from arrow function");
};
sayArrow(); // ✅ works here after initialization

/**
 * Explanation:
 * - Function declaration (sayHello) is fully hoisted → can call it before definition
 * - Function expression with var (sayArrow) → only variable sayArrow is hoisted = undefined
 *   → calling before initialization throws TypeError
 * - After initialization, it works fine
 */

// Arrow function with let/const (more strict hoisting)
try {
    sayArrow2(); // ❌ ReferenceError
} catch (e) {
    console.log("Error:", e.message);
}

let sayArrow2 = () => {
    console.log("Hello from arrow function with let");
};

sayArrow2(); // ✅ works here after initialization
