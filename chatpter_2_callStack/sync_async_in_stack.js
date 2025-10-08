// sync_async_demo.js
// ------------------------------------------------------------
// Problem 1: Synchronous execution
// Problem 2: Asynchronous execution (setTimeout + Event Loop)
// (Node ya browser console dono me chalega)
// ------------------------------------------------------------

"use strict";

/* =======================
   Problem 1 — Synchronous
   =======================
   - Sab kuch call stack par turant run hota hai.
   - Loop blocking hota hai: jab tak loop chal raha hai, baaki kuch nahi chalega.
*/
function problem1() {
  console.log("\n=== Problem 1: Synchronous ===");
  console.log("start (P1)");

  for (let i = 0; i <= 20; i++) {
    console.log("loop i =", i);
  }

  console.log("end (P1)");
}

/* =======================
   Problem 2 — Asynchronous
   =======================
   - setTimeout callback Web APIs (env) ko diya jata hai.
   - Timer complete hote hi callback Task Queue me aata hai.
   - Event Loop stack empty hone ka wait karta hai; empty hote hi
     callback ko stack par push karke run karata hai.

   NOTE: Neeche timeout 1000 ms (1 second) hai, 1 minute nahi.
*/
function problem2() {
  console.log("\n=== Problem 2: Asynchronous (setTimeout) ===");
  console.log("start (P2)");

  setTimeout(() => {
    console.log("setTimeout callback -> runs after ~1s (P2)");
  }, 1000); // 1 second

  console.log("task end (P2)");
}

/* (Optional) Microtask demo for order understanding:
   Promise callbacks (microtasks) Task Queue se pehle run hote hain (job queue).
*/
function microtaskOrderDemo() {
  console.log("\n=== Bonus: Microtask vs setTimeout order ===");
  console.log("start (Bonus)");

  setTimeout(() => {
    console.log("macrotask: setTimeout");
  }, 0);

  Promise.resolve().then(() => {
    console.log("microtask: Promise.then");
  });

  console.log("end (Bonus)");
}

// ----------- Run ------------
problem1();
problem2();
microtaskOrderDemo();

/*
================= EXPECTED ORDER =================

=== Problem 1: Synchronous ===
start (P1)
loop i = 0
...
loop i = 20
end (P1)

=== Problem 2: Asynchronous (setTimeout) ===
start (P2)
task end (P2)
-- ~1 second later --
setTimeout callback -> runs after ~1s (P2)

=== Bonus: Microtask vs setTimeout order ===
start (Bonus)
end (Bonus)
microtask: Promise.then
macrotask: setTimeout

Explanation:
- Problem 1 me sab statements TURANT execute hote hain (sync).
- Problem 2 me setTimeout Web API ko jata hai; timer khatam hote hi
  callback Task Queue me aata hai. Stack empty hone par chalta hai.
- Bonus me Promise (microtask) hamesha setTimeout(0) (macrotask) se
  pehle execute hota hai, kyunki event loop microtasks ko priority deta hai.
*/
