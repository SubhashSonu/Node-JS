# 🌐 HTTP Methods in Node.js (Simple Notes)

## ✅ What are HTTP Methods?

HTTP methods define **how a client interacts with a server**. Each method has a specific purpose for requesting or modifying data.

---

## 📋 List of Common HTTP Methods

| Method    | Description                          | Use Case Example                 |
| --------- | ------------------------------------ | -------------------------------- |
| `GET`     | Retrieve data from the server        | Fetch a webpage or user info     |
| `POST`    | Send new data to the server          | Submit form data                 |
| `PUT`     | Replace entire data on the server    | Update a full user profile       |
| `PATCH`   | Modify part of the data              | Change only the user's email     |
| `DELETE`  | Remove data from the server          | Delete a post or user account    |
| `HEAD`    | Like GET but returns only headers    | Check if a resource exists       |
| `OPTIONS` | Lists allowed methods for a resource | Used in CORS pre-flight requests |

---

## 🔍 Handling HTTP Methods in Node.js (No Framework)

```js
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.end("GET: Home Page");
  } else if (req.method === "POST" && req.url === "/submit") {
    res.end("POST: Form Submitted");
  } else if (req.method === "PUT" && req.url === "/update") {
    res.end("PUT: Profile Updated");
  } else if (req.method === "PATCH" && req.url === "/patch") {
    res.end("PATCH: Partial Update");
  } else if (req.method === "DELETE" && req.url === "/delete") {
    res.end("DELETE: Resource Deleted");
  } else {
    res.end("Unknown request");
  }
});

server.listen(8000, () => {
  console.log("Server running on port 8000");
});
```

---

## 🌐 Testing with curl (Command Line)

```bash
curl http://localhost:8000/
# Output: GET: Home Page

curl -X POST http://localhost:8000/submit
# Output: POST: Form Submitted

curl -X PUT http://localhost:8000/update
# Output: PUT: Profile Updated

curl -X PATCH http://localhost:8000/patch
# Output: PATCH: Partial Update

curl -X DELETE http://localhost:8000/delete
# Output: DELETE: Resource Deleted
```

---

## 📝 Summary

* HTTP methods define what kind of operation is being performed.
* Node.js lets you handle methods using `req.method`.
* Use `GET` to read, `POST` to create, `PUT`/`PATCH` to update, and `DELETE` to remove data.
* Use tools like curl, Postman, or browser to test your routes.

✅ Understanding HTTP methods is key to building APIs and web services.
