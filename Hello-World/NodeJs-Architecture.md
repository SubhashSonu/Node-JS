
# 📘 Node.js Architecture 

## ✅ What is Node.js?
Node.js is a tool that lets you run JavaScript outside the browser, using Google’s V8 engine. It is good for building fast, real-time apps.

It is **single-threaded** (runs on one main thread) but uses **non-blocking** techniques to handle many tasks at once.

---

## 🧭 How Node.js Works

### 1. **Client Request**
A user (client) sends a request to your Node.js app.

### 2. **Event Queue**
The request is added to a **queue** (like a to-do list).

### 3. **Event Loop**
Node.js checks this list with an **event loop**.

- If the task is simple (non-blocking), it does it right away.
- If the task is slow (blocking), it sends it to a **worker thread** in the background.

---

## 🔁 Event Loop Phases (In Simple Terms)
Node.js checks tasks in steps/phases:

1. Timers – Runs after setTimeout or setInterval.
2. Pending Callbacks – Runs some leftover tasks.
3. Idle/Prepare – Prepares system stuff.
4. Poll – Checks for new data (like reading files).
5. Check – Runs setImmediate callbacks.
6. Close Callbacks – Cleans up (e.g. closing file or connection).

---

## 🔄 Blocking vs Non-Blocking

| Blocking (Bad for performance) | Non-Blocking (Recommended) |
|-------------------------------|-----------------------------|
| Waits to finish                | Moves on, continues work     |
| Stops everything               | Keeps app fast and running   |
| `fs.readFileSync()`            | `fs.readFile()`              |

### Code Example

```js
// Blocking - waits to read file
const data = fs.readFileSync("file.txt", "utf-8");
console.log(data);

// Non-blocking - keeps going while reading
fs.readFile("file.txt", "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

---

## ⚙️ How Node Handles Blocking Tasks

Even if a task is blocking (like reading a big file), Node.js can handle it **in the background** using:

- **Worker threads** from the `libuv` library
- The **event loop** to stay responsive

This way, Node.js feels non-blocking to the user.

---

## 🧵 Worker Threads

Worker threads are like helpers for heavy tasks.

Tasks like these go to worker threads:

- Reading files (`fs.readFileSync`)
- DNS lookups
- Compression
- Encryption

---

## 🤖 How Node Decides Where to Run a Task

| Factor                | Meaning                                        |
|----------------------|------------------------------------------------|
| Type of task         | Heavy tasks go to workers                      |
| Resources available  | If system is busy, it avoids extra threads     |
| Task duration        | Quick tasks may stay in the main thread        |
| Library instructions | Some tools force how tasks are handled         |
| Node.js version      | Newer versions may handle tasks differently    |

---

## 🧪 Real Example

### ❌ Blocking (slow server)
```js
const data = fs.readFileSync("bigfile.txt", "utf-8");
res.end(data);
```

### ✅ Non-Blocking (fast server)
```js
fs.readFile("bigfile.txt", "utf-8", (err, data) => {
  res.end(data);
});
```

---

## 📌 In Short

- Node.js is **single-threaded** but can handle **many tasks** using **worker threads**.
- Use **non-blocking methods** to keep the app fast.
- Node.js **doesn't get stuck** waiting on slow tasks.

---

## 📚 Best Practices

- Avoid blocking methods like `fs.readFileSync`
- Use **async/await**, **Promises**, or **callbacks**
- Monitor performance using tools like `clinic.js`
- Test speed using tools like `autocannon`

