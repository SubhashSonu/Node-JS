# 🚀 Express.js Basics and HTTP Methods

## 📦 What is Express.js?

Express.js is a minimal and flexible **Node.js web application framework** that provides robust features to build web and mobile applications easily.

---

## 🛠️ Getting Started

### ✅ Installing Express:

```bash
npm install express
```

### ✅ Basic Setup:

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Home Page");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
```

---

## 🌐 URL Handling with Express

You can read **query parameters** easily using `req.query`:

```js
app.get("/about", (req, res) => {
  const name = req.query.name;
  res.send(`Hey, ${name}`);
});
```

**Example:**

```
http://localhost:8000/about?name=Subhash
Response → Hey, Subhash
```

---

## 🔄 HTTP Methods in Express.js

### 📌 Common HTTP Methods

| Method   | What It Does            | Route Example          |
| -------- | ----------------------- | ---------------------- |
| `GET`    | Retrieve data           | `app.get("/route")`    |
| `POST`   | Send (create) data      | `app.post("/route")`   |
| `PUT`    | Replace all data        | `app.put("/route")`    |
| `PATCH`  | Update part of the data | `app.patch("/route")`  |
| `DELETE` | Remove data             | `app.delete("/route")` |

### ✅ Example:

```js
app.get("/", (req, res) => {
  res.send("GET: Home Page");
});

app.post("/submit", (req, res) => {
  res.send("POST: Form submitted");
});

app.put("/update", (req, res) => {
  res.send("PUT: Profile updated");
});

app.delete("/delete", (req, res) => {
  res.send("DELETE: Item removed");
});
```

---

## 📤 `res.send()` vs `res.end()`

| Feature      | `res.send()` (Express)                    | `res.end()` (Node.js or Express)          |
| ------------ | ----------------------------------------- | ----------------------------------------- |
| Purpose      | Sends and ends response with auto-headers | Ends response manually without formatting |
| Auto Headers | ✅ Yes                                     | ❌ No – must set manually                  |
| Conversion   | ✅ Converts JSON, objects                  | ❌ Sends raw string or buffer              |
| Use Case     | Recommended in Express apps               | Used in core Node.js apps                 |

### Example:

```js
res.send("Hello")       // Auto sets headers, ends response
res.end("Hello")        // You write headers and content manually
```

---

## 📝 Summary

* Express makes routing and HTTP method handling easier.
* Use `req.query` to access query parameters.
* Prefer `res.send()` in Express.
* Understand different HTTP methods for RESTful design.

👍 Use Express.js to simplify backend development in Node.js!
