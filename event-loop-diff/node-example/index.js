


// Node.js Event Loop Demonstration
// Run: node index.js

console.log("START");

process.nextTick(() => {
  console.log("process.nextTick 1 (runs before regular microtasks)");
});

Promise.resolve().then(() => {
  console.log("Promise.then 1 (microtask)");
});

setTimeout(() => {
  console.log("setTimeout 0ms (Timers phase)");
}, 0);

setImmediate(() => {
  console.log("setImmediate (Check phase)");
});

const fs = require("fs");

// Schedule an I/O callback to show Poll vs Check ordering.
fs.readFile(__filename, () => {
  console.log("fs.readFile callback (Poll phase I/O)");

  // Inside an I/O callback, observe timing between microtasks & setImmediate
  Promise.resolve().then(() => {
    console.log("Promise.then inside I/O (microtask after this callback)");
  });

  setImmediate(() => {
    console.log("setImmediate inside I/O (Check phase after Poll)");
  });

  setTimeout(() => {
    console.log("setTimeout 0ms inside I/O (Timers of a later tick)");
  }, 0);
});

// Another microtask
queueMicrotask(() => {
  console.log("queueMicrotask (microtask)");
});

// A second nextTick to highlight its priority
process.nextTick(() => {
  console.log("process.nextTick 2");
});

console.log("END");

/*
Expected ordering (typical, simplified):

START
END
process.nextTick 1
process.nextTick 2
Promise.then 1
queueMicrotask
setTimeout 0ms  <-- Timers phase of next tick (may race with I/O readiness)
fs.readFile callback  <-- Poll phase when I/O completes
Promise.then inside I/O  <-- microtask after the above callback runs
setImmediate inside I/O  <-- Check phase
setImmediate  <-- Check phase (relative ordering of the two setImmediates depends on when they were queued)
setTimeout 0ms inside I/O  <-- a later Timers phase

Note: Exact ordering of setTimeout vs fs.readFile depends on event loop timing.
The microtask vs nextTick priority is consistent: nextTick runs before Promise microtasks.
*/
