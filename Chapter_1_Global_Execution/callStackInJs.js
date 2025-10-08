
// ------------------------------------------------------------
// Ye file JavaScript ke Creation Phase (Memory / Hoisting)
// aur Execution Phase ko samjhane ke liye likhi gayi hai.
// Example code same hai jo image me dikh raha tha.
// Node ya browser console dono me run ho sakta hai.
// ------------------------------------------------------------

"use strict";

/*
CREATION (MEMORY) PHASE — Global Execution Context (GEC)
--------------------------------------------------------
- JS Engine pehle scope scan karta hai aur memory allocate karta hai.
- var declarations ko 'undefined' se initialize kiya jata hai.
- function declarations ko poori function body ke saath memory milti hai.

Is point par (code execute hone se pehle) memory roughly aise hogi:

  n        -> undefined
  square   -> <function reference> (poori body memory me)
  square2  -> undefined
  square4  -> undefined
*/

// ------------------- CODE STARTS (EXECUTION PHASE) -------------------

console.log("== Global Execution Starts ==");

// 1) Variable assignment during execution phase
var n = 2; // Memory me 'n' ab 2 ho gaya

// 2) Function Declaration — creation phase me hi taiyaar
function square(num) {
  // Jab ye function call hota hai tab iske liye ek naya
  // Function Execution Context (FEC) banta hai jisme:
  //   Memory: { num: <arg>, ans: <undefined> }
  //   Code Execution: statements run hote hain, phir return par context destroy

  // Trace logs to visualize call:
  console.log(`[square] -> EC start | num = ${num}`);
  var ans = num * num;
  console.log(`[square] -> computing: ${num} * ${num} = ${ans}`);
  console.log(`[square] -> EC end | returning ${ans}`);
  return ans;
}

// 3) Calls — yahan par FEC (Function Execution Context) banenge
var square2 = square(n);   // first call: num = 2
var square4 = square(4);   // second call: num = 4

// 4) Global context me assignment/prints
console.log("square2 =", square2); // 4
console.log("square4 =", square4); // 16

console.log("== Global Execution Ends ==");

/*
CALL STACK VISUAL (rough idea)
------------------------------
Start:
  [Global Execution Context]

Call square(n):
  [square FEC]
  [Global]

Return -> pop square FEC.

Call square(4):
  [square FEC]
  [Global]

Return -> pop square FEC.

Program finish -> pop Global EC.

EXPECTED OUTPUT (console):
--------------------------
== Global Execution Starts ==
[square] -> EC start | num = 2
[square] -> computing: 2 * 2 = 4
[square] -> EC end | returning 4
[square] -> EC start | num = 4
[square] -> computing: 4 * 4 = 16
[square] -> EC end | returning 16
square2 = 4
square4 = 16
== Global Execution Ends ==
*/

// ------------------------------------------------------------
// How to run (Node):
//   node execution_context_demo.js
// Browser me: file ko <script> se include karke console open karein.
// ------------------------------------------------------------
 

// "use Strict"  //why use?

// Bahut accha sawaal hai 👍

// JavaScript me "use strict"; ek directive hai jo code ko strict mode me chalata hai.
// Strict mode ka matlab hai: JS engine aapke code par zyada strict rules lagata hai taaki bugs avoid ho aur best practices enforce ho.

// Fayde / Kya hota hai strict mode me?

// Silent errors ko throw kar deta hai
// Normal mode me kuch galtiyan JS ignore kar deta hai (silent fail).
// Example:

// x = 10;   // bina declare kiye variable ban gaya (global var)
// console.log(x);


// Strict mode me ye error throw karega: ReferenceError: x is not defined.

// Duplicate parameter names allow nahi

// function test(a, a) { return a; } // normal JS me allowed


// Strict mode me error: SyntaxError: Duplicate parameter name.

// Reserved keywords protect karta hai
// Future ke reserved words (jaise let, class, package, etc.) ko variable ke naam ke roop me use karne nahi deta.

// this ka behaviour sahi hota hai
// Normal mode me agar aap function ko bina object ke call karo:

// function show() {
//   console.log(this);
// }
// show();  // normal mode me -> window (browser) / global (node)


// Strict mode me undefined return karega (galti se global pollute na ho).



// JavaScript (aur baaki programming languages) me Call Stack ko alag–alag naamon se jaana jaata hai:

// Execution Context Stack

// har function call ka execution context (memory + code) yahan push hota hai.

// jab function return karta hai tab pop ho jata hai.

// Program Stack

// kyunki program ke saare functions/blocks isi stack par manage hote hain.

// Control Stack

// control flow (kis function me control abhi hai) track karne ke liye use hota hai.

// Runtime Stack

// runtime (jab code execute ho raha ho) par call stack ko runtime stack bhi bolte hain.

// Machine Stack

// low-level implementation me CPU/machine bhi isi stack ka use karti hai function calls aur return addresses manage karne ke liye.

// 👉 Matlab sabhi ek hi concept ke alag-alag naam hain:
// Jab bhi aap “Call Stack” suno, samajh lo ki yahi “Execution Context Stack / Program Stack / Control Stack / Runtime Stack / Machine Stack” hai.