
# Node.js Modules, require, fs, and crypto

## 📦 1. Modules in Node.js

Node.js uses a modular system to structure code. A **module** is just a file containing code (functions, variables, etc.) that can be reused in other files using `require`.

### Exporting functions from a module

**hello.js**
```js
function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

module.exports = {
    addFn: add,
    subFn: sub,
};
```

### Importing and using them in another file

**app.js**
```js
const math = require('./hello');

console.log(math.addFn(2, 4)); // 6
console.log(math.subFn(2, 3)); // -1
```

> 🔸 Note: `require` is used to include modules (both custom and built-in).

---

## 📂 2. require in Node.js

`require()` is used to import:
- Core modules (e.g., `fs`, `http`, `crypto`)
- Custom modules (`./filename`)
- Node modules installed via `npm`

### Example:

```js
const fs = require('fs');
const myUtils = require('./utils');
```

---

## 📁 3. fs (File System) Module

The `fs` module allows you to work with the file system (read, write, delete files, etc.)

### Example: Writing to a file

```js
const fs = require('fs');

fs.writeFileSync('data.txt', 'Hello Node.js!');
```

### Example: Reading from a file

```js
const data = fs.readFileSync('data.txt', 'utf-8');
console.log(data); // Hello Node.js!
```

---

## 🔐 4. crypto Module

The `crypto` module is used for cryptographic operations such as hashing, encryption, etc.

### Example: Creating a SHA-256 Hash

```js
const crypto = require('crypto');

const hash = crypto.createHash('sha256').update('password123').digest('hex');

console.log(hash); // outputs a hashed string
```

---

## 🧠 Summary

| Concept  | Description |
|----------|-------------|
| `module.exports` | Exports functions/objects from a file |
| `require()` | Imports modules |
| `fs` | File system module to read/write files |
| `crypto` | Used for secure cryptographic operations |

---

## ✅ Bonus Tip

To initialize a Node project:
```bash
npm init -y
```

To run a file:
```bash
node app.js
```
