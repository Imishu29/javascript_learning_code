# 🧠 JavaScript Core Interview Notes

This repository explains **how JavaScript works internally** —
focusing on **Event Loop**, **libuv**, **Blink**, and **ECMAScript features**
used in both **Node.js** and **Browser** environments.

Perfect for **interview preparation** and **revision**.

---

## 📁 Project Structure

| File | Description |
|------|--------------|
| `browser_vs_node_eventloop.js` | Explains Browser vs Node.js event loops, microtasks, and macro tasks |
| `es_features_in_cjs_vs_esm.js` | Shows which ES features work in CommonJS and ESM modules |
| `browser_vs_node_eventloop.png` | Optional diagram for README or notes (visual comparison) |

---

## ⚙️ 1️⃣  Browser vs Node.js Event Loop

| Environment | Event Loop Provider | Key Points |
|--------------|----------------------|-------------|
| **Browser (Chrome)** | Implemented by **Blink** engine (per HTML5 spec) | Handles DOM, `fetch`, `setTimeout`, rendering |
| **Node.js** | Provided by **libuv (C++)** | Handles `fs`, `http`, `process.nextTick`, `setImmediate` |

### 🧩 Event Loop Flow

1. Browser:
#### V8 (JS) → Web APIs → Task Queue → Microtask Queue → Rendering

1. Node.js:
#### V8 (JS) → libuv phases (Timers → Poll → Check → Close)
#### ↳ between each phase: process.nextTick() + Promise callbacks


### 📈 Diagram
*(If you add the image)*

![Browser vs Node.js Event Loop](browser_vs_node_eventloop.png)

---

## ⚙️ 2️⃣  ECMAScript Features in CJS vs ESM

| Feature | Works in `.js` (CJS)? | Needs `"type": "module"` / `.mjs`? |
|----------|----------------------|------------------------------------|
| `let`, `const`, `class`, `arrow function` | ✅ Yes | ❌ No |
| `Promise`, `async/await` | ✅ Yes | ❌ No |
| `destructuring`, `spread`, `optional chaining` | ✅ Yes | ❌ No |
| `import/export` | ❌ No | ✅ Yes |
| `require/module.exports` | ✅ Yes | ❌ No |

✅ ECMAScript (the spec) defines features like  
`Promise`, `async/await`, `class`, `let/const`, `arrow functions`, etc.  
⚙️ The **V8 engine** implements them.  
🌐 The **environment (Browser / Node)** adds extra APIs like `fetch`, `fs`, etc.

---

## ⚡ Summary Notes (for Interview)

### 💬 Event Loop Summary
- JavaScript is **single-threaded**, **non-blocking**, **event-driven**.
- Browser event loop → handled by **Blink (HTML5 spec)**.  
- Node.js event loop → handled by **libuv (C++)**.
- Between each libuv phase → `process.nextTick()` and Promise microtasks run.

### 💬 ECMAScript vs Environment
| Layer | Provides | Examples |
|--------|-----------|----------|
| **ECMAScript (language)** | Syntax & built-ins | `Promise`, `async/await`, `class`, `Map`, `Set` |
| **Engine (V8)** | Implementation | Executes ECMAScript spec |
| **Environment (Browser/Node)** | Extra APIs | `fetch`, `fs`, `setTimeout`, `process.nextTick` |

---

## 💻 How to Use

1. Clone this repo  
```bash
   git clone https://github.com/<your-username>/javascript-core-interview.git
```
2. Open in VS Code

3. Run .js files using Node:
```bash
node es_features_in_cjs_vs_esm.js
node browser_vs_node_eventloop.js
```

#### Read comments in code — they act as your theory + examples.

### 📚 Quick Revision (One-Liners)

1. Promise, async/await → ECMAScript feature

2. fetch, setTimeout, process.nextTick → Environment feature

3. Node.js event loop → powered by libuv

4. Browser event loop → implemented by Blink per HTML5 spec

5. .js = CommonJS by default

6. .mjs or "type": "module" = ES Modules

### All ES features (ES6–ES12) work in CJS except import/export

🏁 Author Notes

Created for interview preparation — feel free to fork & share.
This covers:

JS Engine internals (V8)

ECMAScript vs Environment

Event Loop (libuv / Blink)

ES features (CJS vs ESM)

Keep learning, keep coding 🔥