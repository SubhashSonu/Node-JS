# JavaScript File System (fs) Module and Date Usage - Simple Notes

## 📘 Sync vs Async in Node.js

### 🟩 1. Synchronous (Sync)

```js
fs.writeFileSync("test.txt", "Hello");
```

✅ Notes:

* Code waits until the file is completely written.
* The program stops and finishes this line before going to the next line.
* Easy to understand.
* ❌ Slower if the task takes time (it blocks everything).

🧠 Example:

```js
console.log("Start");
fs.writeFileSync("test.txt", "Hello");
console.log("Done");
```

🖥️ Output:

```
Start
Done
```

It waits to finish writing the file before printing "Done".

### 🟦 2. Asynchronous (Async)

```js
fs.writeFile("test.txt", "Hello", (err) => {
  if (err) console.log("Error writing file");
  else console.log("File written successfully");
});
```

✅ Notes:

* Code does not wait.
* Starts writing the file and moves on to the next line.
* Uses a callback (a function that runs after the task is done).
* ✅ Better for performance (doesn't block).

🧠 Example:

```js
console.log("Start");
fs.writeFile("test.txt", "Hello", () => {
  console.log("File written");
});
console.log("Done");
```

🖥️ Output:

```
Start
Done
File written
```

It prints "Done" immediately, and "File written" after the file is saved.

📌 Summary Table

| Feature        | Synchronous (Sync) | Asynchronous (Async)        |
| -------------- | ------------------ | --------------------------- |
| Waits for task | ✅ Yes              | ❌ No                        |
| Blocks code    | ✅ Yes              | ❌ No                        |
| Easier to use  | ✅ Yes              | ⚠️ Needs callback           |
| Good for       | Small/simple tasks | Servers, real apps (faster) |

---

## 📦 1. Importing the `fs` Module

```js
const fs = require('fs');
```

* `fs` stands for **File System**.
* It is a built-in module in Node.js used to work with files (read, write, delete, etc.).

---

## ✍️ 2. Writing to a File

### ✅ Synchronous (Blocking)

```js
fs.writeFileSync("./test.txt", "Hey There");
```

* Writes "Hey There" to `test.txt`.
* If the file doesn't exist, it creates it.
* If it exists, it **overwrites** the content.
* Runs **synchronously** (waits until done).

### ✅ Asynchronous (Non-Blocking)

```js
fs.writeFile("test.txt", "Hello World", (error) => {
  if (error) console.log("Error:", error);
});
```

* Works the same as `writeFileSync`, but does **not block** other code.
* Uses a **callback** to handle errors.

---

## 📖 3. Reading from a File

### ✅ Synchronous

```js
const result = fs.readFileSync("./contacts.txt", "utf-8");
console.log(result);
```

* Reads the file content as a string.
* Blocking (waits for file read to finish).

### ✅ Asynchronous

```js
fs.readFile("./contacts.txt", "utf-8", (error, result) => {
  if (error) {
    console.log("Error", error);
  } else {
    console.log(result);
  }
});
```

* Non-blocking read with error handling.

---

## 🖊️ 4. Appending to a File

### ➕ Add Current Year

```js
fs.appendFileSync("./test.txt", new Date().getFullYear().toString());
```

* Adds the **current year** to the end of the file.

### ➕ Add Timestamp and Message

```js
fs.appendFileSync("./test.txt", `${Date.now()} Hey There\n`);
```

* Adds current time (in milliseconds) and a message.
* `\n` adds a new line.

---

## 📋 5. Copying a File

```js
fs.cpSync("./test.txt", "./copy.txt");
```

* Copies `test.txt` to `copy.txt`.

---

## ❌ 6. Deleting a File

```js
fs.unlinkSync("./copy.txt");
```

* Deletes `copy.txt` from the folder.

---

## 🔍 7. Checking File Info

```js
console.log(fs.statSync("./test.txt"));
```

* Returns **file stats**: size, birth time, modified time, etc.

### 🧾 Check if it's a file

```js
console.log(fs.statSync("./test.txt").isFile());
```

* Returns `true` if the path is a file.

---

## 📅 8. Working with Dates in JavaScript

### ✅ Get Current Year

```js
new Date().getFullYear(); // e.g., 2025
```

### ✅ Get Current Month

```js
new Date().getMonth(); // 0 = Jan, 5 = June (0–11)
```

### ✅ Get Day of Month

```js
new Date().getDate(); // 1–31
```

### ✅ Get Timestamp (milliseconds since 1970)

```js
Date.now(); // e.g., 1717753119316
```

### ✅ Convert to Seconds (like UNIX time)

```js
Math.floor(Date.now() / 1000);
```

---

## 📝 Notes

* Always use `new Date()` (not just `Date()`) to get date methods.
* `getMonth()` returns 0–11, so add 1 if you want actual month number.
* `fs` has both sync and async versions — use sync for simple tasks, async for better performance.
