// execution_stack_tracer.js
// ------------------------------------------------------------
// Advanced console visualization of:
// - Creation (memory/hoisting) notes
// - Call Stack push/pop (ASCII diagram)
// - Per-call "memory" snapshot (arguments/locals)
// ------------------------------------------------------------

"use strict";

/* ========== Tiny Stack Tracer Utility ========== */
const Tracer = (() => {
  const stack = [];

  const box = (lines) => {
    const width = Math.max(...lines.map((s) => s.length));
    const top = "┌" + "─".repeat(width + 2) + "┐";
    const mid = lines.map((s) => "│ " + s.padEnd(width, " ") + " │").join("\n");
    const bot = "└" + "─".repeat(width + 2) + "┘";
    return [top, mid, bot].join("\n");
  };

  const renderStack = () => {
    if (!stack.length) return "(empty)";
    const lines = stack.map((f) => " " + f);
    return box(lines);
  };

  const log = (...args) => console.log("[TRACE]", ...args);

  const push = (frame, memorySnapshot) => {
    stack.push(frame);
    console.log("\n>> ENTER:", frame);
    console.log(renderStack());
    if (memorySnapshot) {
      log("Memory (creation):", JSON.stringify(memorySnapshot, null, 2));
    }
  };

  const update = (note, memorySnapshot) => {
    if (note) log(note);
    if (memorySnapshot) {
      log("Memory (update):", JSON.stringify(memorySnapshot, null, 2));
    }
  };

  const pop = (retVal) => {
    const frame = stack.pop();
    if (retVal !== undefined) log(`Return from ${frame}: ${retVal}`);
    console.log("<< EXIT :", frame);
    console.log(renderStack());
  };

  const banner = (title) => {
    const line = "═".repeat(title.length + 2);
    console.log("\n" + line);
    console.log(" " + title);
    console.log(line + "\n");
  };

  return { push, pop, update, banner, renderStack };
})();

/* ========== Global Execution Context (GEC) Notes ==========

Creation phase (hoisting) — engine allocates memory:

  var n        -> undefined
  function square -> <function ref>
  var square2  -> undefined
  var square4  -> undefined

============================================================== */

Tracer.banner("PROGRAM START — Global Execution Context Created");
console.log(Tracer.renderStack()); // empty initially (before we 'enter' global for viz)
Tracer.push("GLOBAL", { n: "undefined", square: "function", square2: "undefined", square4: "undefined" });

// ---- Global code (Execution phase) ----
var n = 2;
Tracer.update("Assigned n = 2", { n });

// Function declaration (already hoisted in creation phase)
function square(num) {
  // On call, its Function Execution Context (FEC) will be visualized below.
  Tracer.push("square FEC", { num, ans: "undefined" });

  var ans = num * num;
  Tracer.update(`Compute: ${num} * ${num} = ${ans}`, { num, ans });

  Tracer.pop(ans);
  return ans;
}

// Calls -> create/destroy FECs
var square2 = square(n);
Tracer.update("Back in GLOBAL after square(n)", { n, square2 });

var square4 = square(4);
Tracer.update("Back in GLOBAL after square(4)", { n, square2, square4 });

// Final global state
Tracer.banner("FINAL GLOBAL MEMORY SNAPSHOT");
console.log({ n, square2, square4 });

// End program -> pop GLOBAL
Tracer.pop();
Tracer.banner("PROGRAM END");

/*
==================== SAMPLE OUTPUT ====================

══════════════════════════════════════════════════════
 PROGRAM START — Global Execution Context Created
══════════════════════════════════════════════════════

[TRACE]  (empty)

>> ENTER: GLOBAL
┌──────────────┐
│  GLOBAL      │
└──────────────┘
[TRACE] Memory (creation): {
  "n": "undefined",
  "square": "function",
  "square2": "undefined",
  "square4": "undefined"
}
[TRACE] Assigned n = 2
[TRACE] Memory (update): { "n": 2 }

>> ENTER: square FEC
┌──────────────┐
│  GLOBAL      │
│  square FEC  │
└──────────────┘
[TRACE] Memory (creation): { "num": 2, "ans": "undefined" }
[TRACE] Compute: 2 * 2 = 4
[TRACE] Memory (update): { "num": 2, "ans": 4 }
[TRACE] Return from square FEC: 4
<< EXIT : square FEC
┌──────────────┐
│  GLOBAL      │
└──────────────┘
[TRACE] Back in GLOBAL after square(n)
[TRACE] Memory (update): { "n": 2, "square2": 4 }

>> ENTER: square FEC
┌──────────────┐
│  GLOBAL      │
│  square FEC  │
└──────────────┘
[TRACE] Memory (creation): { "num": 4, "ans": "undefined" }
[TRACE] Compute: 4 * 4 = 16
[TRACE] Memory (update): { "num": 4, "ans": 16 }
[TRACE] Return from square FEC: 16
<< EXIT : square FEC
┌──────────────┐
│  GLOBAL      │
└──────────────┘
[TRACE] Back in GLOBAL after square(4)
[TRACE] Memory (update): { "n": 2, "square2": 4, "square4": 16 }

══════════════════════════════════════════════════════
 FINAL GLOBAL MEMORY SNAPSHOT
══════════════════════════════════════════════════════
{ n: 2, square2: 4, square4: 16 }
<< EXIT : GLOBAL
(empty)

══════════════════════════════════════════════════════
 PROGRAM END
══════════════════════════════════════════════════════
*/
