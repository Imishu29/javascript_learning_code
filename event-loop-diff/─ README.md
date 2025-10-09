# JavaScript vs Node.js Event Loop — What's Different?

This repo explains **why `setTimeout` feels the same** in the browser and Node.js, **but the internals differ**. You also get runnable examples showing the different scheduling/ordering rules.

---

## TL;DR

- **`setTimeout` is *not* part of ECMAScript.**
  - In **browsers**, it's a **Web API** implemented by the browser and scheduled by the HTML event loop.
  - In **Node.js**, it's implemented on top of **libuv** (C/C++) and scheduled through **Node’s event loop phases**.

- **Concepts are similar (tasks & microtasks), but details differ.**
  - **Browser:** tasks (a.k.a. macrotasks) → microtasks (Promises, MutationObservers) → render.
  - **Node:** phased loop — **Timers** → **Pending Callbacks** → **Idle/Prepare** → **Poll** → **Check** → **Close Callbacks** + microtasks between ticks.

---

## High-level comparison

### Browser (HTML Event Loop)
- **Task queue (macrotasks):** `setTimeout`, `setInterval`, I/O, user events, etc.
- **Microtask queue:** `Promise.then`, `queueMicrotask`, `MutationObserver`.
- **Render step:** after tasks and microtasks, the browser may update the DOM and paint.

### Node.js (libuv Event Loop Phases)
1. **Timers:** run callbacks scheduled by `setTimeout`/`setInterval` whose time has expired.
2. **Pending Callbacks:** run some system-level I/O callbacks.
3. **Idle, Prepare:** internal use.
4. **Poll:** retrieve new I/O events; execute I/O callbacks; may block here waiting for I/O.
5. **Check:** run `setImmediate` callbacks.
6. **Close Callbacks:** e.g. `'close'` events on sockets.

**Microtasks in Node** (e.g., `Promise.then`, `queueMicrotask`, `process.nextTick`) run **between** phases / after each callback, with `process.nextTick` having **even higher** priority than normal microtasks.

---

## ASCII diagram

