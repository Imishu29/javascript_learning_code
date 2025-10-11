/*
====================================================
🧠  BROWSER vs NODE.JS  — EVENT LOOP DEEP DIVE
====================================================

 Author:  <Your Name>
 Purpose: Understand difference between Browser & Node.js
          event loops, how async tasks work, and who runs what.
 Use:     Open in VS Code or GitHub – read comments like a guide.
====================================================

🧩 CONTENTS:
1. Overview
2. Browser Architecture (V8 + Blink + HTML Spec)
3. Node.js Architecture (V8 + libuv)
4. Comparison Table
5. Visual Diagram (ASCII)
6. Small Code Examples
====================================================
*/



// ==================================================
// 1️⃣ OVERVIEW
// ==================================================
/*
JavaScript itself (ECMAScript) ❌ does NOT define how async code runs.
It only defines "Promises" and "microtasks".

The *environment* (Browser, Node.js, Deno, etc.)
is responsible for providing the EVENT LOOP,
timers, network calls, etc.
*/



// ==================================================
// 2️⃣ BROWSER SIDE (Chrome / Blink / V8)
// ==================================================
/*
- JS code runs inside the V8 engine.
- Asynchronous operations (setTimeout, fetch, click) are handled by Web APIs.
- The event loop is implemented by the browser engine (Blink in Chrome)
  according to the HTML Living Standard.

🔹 Flow:
   JS (V8)
     ↓
   Web APIs (fetch, setTimeout, DOM)
     ↓
   Task Queue (macro-tasks)
     ↓
   Microtask Queue (Promises, queueMicrotask)
     ↓
   Rendering step (repaint, layout)
     ↺ Repeat
*/

console.log("=== Browser Example (Conceptual) ===");
console.log("A");

setTimeout(() => console.log("B: setTimeout (macro task)"), 0);

Promise.resolve().then(() => console.log("C: Promise (microtask)"));

console.log("D");
// Expected output order (in browser):
// A → D → C → B



// ==================================================
// 3️⃣ NODE.JS SIDE (V8 + LIBUV)
// ==================================================
/*
- JS still runs inside V8.
- Asynchronous tasks handled by libuv (a C library).
- libuv manages the event loop, I/O, timers, thread pool.
- Node also has an extra queue: process.nextTick().

🔹 libuv Event Loop Phases:
   1. timers        → setTimeout(), setInterval()
   2. pending        → system callbacks (TCP errors etc.)
   3. poll           → fs, net, http (I/O)
   4. check          → setImmediate()
   5. close callbacks→ cleanup events
   Between each phase:
        process.nextTick()  → Node-only microtask queue
        Promises            → V8 microtask queue
*/

console.log("\n=== Node.js Example (Run with Node) ===");
console.log("Start");

setTimeout(() => console.log("Timer (macro task)"), 0);

setImmediate(() => console.log("setImmediate (check phase)"));

Promise.resolve().then(() => console.log("Promise (microtask)"));

process.nextTick(() => console.log("nextTick (runs before Promises)"));

console.log("End");
// Expected Node.js order:
// Start → End → nextTick → Promise → Timer → setImmediate



// ==================================================
// 4️⃣ COMPARISON TABLE (Quick Reference)
// ==================================================
/*
| Feature                 | Browser (Blink + HTML Spec) | Node.js (libuv) |
|--------------------------|-----------------------------|------------------|
| Engine                   | V8 / SpiderMonkey           | V8               |
| Event Loop Provider      | Browser runtime (Blink)     | libuv (C++)      |
| Timers                   | Web API                     | libuv timers     |
| Async Network (fetch)    | Browser threads             | libuv thread pool|
| Microtasks               | Promise, queueMicrotask     | Promise, nextTick|
| Global Object            | window                      | global           |
| Rendering / DOM          | ✅ Yes                      | ❌ No            |
| Extra Queue              | ❌ none                     | ✅ process.nextTick|
| Spec Defined By          | HTML Living Standard        | Node Internal    |
*/



// ==================================================
// 5️⃣ VISUAL DIAGRAM (ASCII REPRESENTATION)
// ==================================================
/*
───────────────────────────────────────────────────────────────
   🌐 BROWSER (Chrome / Blink / V8)
───────────────────────────────────────────────────────────────
   V8 Engine  → executes JS + Promises
        │
        ▼
   Web APIs (setTimeout, fetch, DOM events)
        │
        ▼
   Task Queue (macro-tasks)
        │
        ▼
   Microtask Queue (Promises, queueMicrotask)
        │
        ▼
   Rendering / Repaint (handled by Blink)
        ↺ (Event Loop repeats)


───────────────────────────────────────────────────────────────
   💻 NODE.JS (V8 + libuv)
───────────────────────────────────────────────────────────────
   V8 Engine  → executes JS + Promises + nextTick
        │
        ▼
   libuv (C library)
        ├─ Timers phase (setTimeout)
        ├─ Pending callbacks
        ├─ Poll phase (I/O fs, net, http)
        ├─ Check phase (setImmediate)
        └─ Close callbacks
   Between each phase:
        → process.nextTick()
        → Promise microtasks
───────────────────────────────────────────────────────────────
*/



// ==================================================
// 6️⃣ SUMMARY (Interview Notes)
// ==================================================
/*
👉 JavaScript itself doesn’t have an event loop.
   - Browser implements it using the HTML5 spec (Blink, Web APIs)
   - Node.js implements it using libuv (C/C++)

👉 Microtasks always run before next macro task.
   - In browser: Promise callbacks
   - In Node.js: process.nextTick(), then Promises

👉 Browser adds Rendering phase; Node doesn’t.

👉 Event Loop is just a manager — V8 only runs the JS instructions.
*/



// ==================================================
// END ✨
// ==================================================
