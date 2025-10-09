console.log("Task 1 started");

setTimeout(() => {
  console.log("Task 2 executed");
}, 0);

console.log("Task 1 completed");  

// output 
/**
 * Task 1 started
 * Task 1 completed
 * Task 2 executed
**/

/** Step 1: Call Stack me kaam

console.log("Task 1 started")
→ Call Stack me gaya → run hua → output → stack se nikal gaya ✅

setTimeout(..., 0)
→ Timer function Call Stack me nahi rukta, wo Web APIs ke paas chala jata hai (browser/Node APIs handle karte hain)
→ timer 0ms ke liye set hota hai → callback callback queue me chala jata hai (par abhi stack khali nahi hai).

console.log("Task 1 completed")
→ Call Stack me gaya → run hua → output → stack se nikal gaya ✅ **/

/**
 * 3. ✅ Kuch common Async / Non-Blocking cheezein JS me:
Feature / Function	Non-Blocking?	Kaise kaam karta hai
setTimeout, setInterval	✅ Haan	Web APIs me chala jata hai
fetch() / API calls	✅ Haan	Network thread pool me handle hota hai
Promise / async-await	✅ Haan	Microtask queue me schedule hota hai
I/O (Node.js me fs.readFile)	✅ Haan	OS thread pool me hota hai
Heavy loops / normal functions	❌ Nahi	Stack ko block kar dete hai**/ 