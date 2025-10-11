/*
===============================================
 ES FEATURES IN CJS (.js) VS ESM (import/export)
===============================================
Author: <Your Name>
Purpose: Interview-ready notes + examples to explain
         that ES features work in CJS except import/export.
===============================================
*/

/*
1️⃣ Statement
   ECMAScript (ES6+ onward) ke language features
   — like let/const, class, arrow functions,
   Promises, async/await, destructuring, optional chaining
   — ye sab CommonJS (.js) mein bhi chalenge, 
   sirf import/export syntax ke liye “type: module” ya “.mjs” chahiye hota hai.

   In short:
   ✅ ES features → CJS bhi
   ❌ import/export → sirf ESM
*/

// ------------------------
// Example: ES features in CJS (.js)
// ------------------------

console.log("Example: CJS environment");

// let/const, arrow, class
let x = 10;
const y = 20;
class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return `Hello, ${this.name}!`;
  }
}
const p = new Person("Aman");
console.log(p.greet());  // works fine

const add = (a, b) => a + b;
console.log("add:", add(2, 3));

// destructuring, optional chaining
const obj = { a: { b: 5 } };
const { a: inner } = obj;
console.log(inner?.b);  // optional chaining

// Promise + async/await
function getNumberAsync() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(42), 100);
  });
}

async function testAsync() {
  const num = await getNumberAsync();
  console.log("async result:", num);
}

testAsync();

// ------------------------
// What DOESN’T work in CJS (.js) without ESM config?
// ------------------------

/*
These will throw errors in a CJS file without `"type": "module"`:

// ❌ Uncaught SyntaxError: Cannot use import statement outside a module
import fs from "fs";

// ❌ Unexpected token 'export'
export function hello() {
  return "Hi";
}
*/

// So these import/export statements only work when file is ESM:
// - .mjs extension, OR
// - package.json has "type": "module"

// ------------------------
// Example: Conditional import using dynamic import (works both places)
// ------------------------

async function dynamicImportExample() {
  // dynamic import returns a promise
  const os = await import("os");  // This may work in ESM or depending on Node version in CJS
  console.log("Platform:", os.platform());
}

// Call it (optional)
dynamicImportExample().catch((err) => {
  console.error("Dynamic import failed:", err.message);
});

/*
🎯 Interview Point Summary:

- All core ES language features are **engine-level** (provided by JS engine / ECMAScript spec), so
  they work equally in both CJS and ESM.

- The **module syntax** (`import` / `export`) is **module-system–level**, 
  and requires ESM (via `.mjs` extension or `"type": "module"` in package.json).

- In Node.js:
  • `.js` files default to CJS (unless `"type": "module"` is set).
  • `.mjs` files are always ESM.
  • You can also force import/export behavior via `"type": "module"` in package.json.

Use this file in interviews to explain — “yes, ES features work in CJS; module syntax is separate.” Good luck, bro! 💪
*/

