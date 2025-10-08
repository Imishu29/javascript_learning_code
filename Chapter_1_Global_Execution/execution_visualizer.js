// execution_visualizer.js
// ------------------------------------------------------------
// Ye file JavaScript Execution Context ko samjhane ke liye banayi gayi hai.
// Isme har function call ke time par ek visualization print hota hai.
// ------------------------------------------------------------

"use strict";

// --------- GLOBAL EXECUTION CONTEXT (GEC) ---------
// Creation phase me variables aur functions memory allocate hote hain:
//   n        -> undefined
//   square   -> function {...}
//   square2  -> undefined
//   square4  -> undefined

console.log("== Program Start ==");

// Global variable
var n = 2;

// Function declaration
function square(num) {
  console.log("--------------------------------------------------");
  console.log(">> Function Execution Context (FEC) Created: square");
  console.log("Memory (creation): { num: undefined, ans: undefined }");

  // Execution phase:
  console.log(`Assigning num = ${num}`);
  var ans = num * num;
  console.log(`Computing ans = num * num -> ${num} * ${num} = ${ans}`);

  console.log("Returning ans =", ans);
  console.log("<< Function Execution Context Destroyed: square");
  console.log("--------------------------------------------------");

  return ans;
}

// Function calls (FEC create/destroy hote hain):
var square2 = square(n);
var square4 = square(4);

// Global Execution context ke andar memory me ab:
//   n = 2
//   square2 = 4
//   square4 = 16
console.log("\n== Final Global Memory State ==");
console.log({ n, square2, square4 });

console.log("== Program End ==");

/*
EXPECTED OUTPUT (roughly):

== Program Start ==
--------------------------------------------------
>> Function Execution Context (FEC) Created: square
Memory (creation): { num: undefined, ans: undefined }
Assigning num = 2
Computing ans = num * num -> 2 * 2 = 4
Returning ans = 4
<< Function Execution Context Destroyed: square
--------------------------------------------------
--------------------------------------------------
>> Function Execution Context (FEC) Created: square
Memory (creation): { num: undefined, ans: undefined }
Assigning num = 4
Computing ans = num * num -> 4 * 4 = 16
Returning ans = 16
<< Function Execution Context Destroyed: square
--------------------------------------------------

== Final Global Memory State ==
{ n: 2, square2: 4, square4: 16 }
== Program End ==
*/

// ------------------------------------------------------------
// Run:  node execution_visualizer.js
// ------------------------------------------------------------
