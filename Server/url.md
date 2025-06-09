# 🌐 URL Handling in Node.js

## ✅ What is a URL?

A URL (Uniform Resource Locator) is the address used to access resources on the internet or in a local network.

**Example:**

```
http://localhost:8000/search?query=node
```

| Part          | What it Means                   |
| ------------- | ------------------------------- |
| `http`        | Protocol (rules for connection) |
| `localhost`   | Server name (runs on your PC)   |
| `8000`        | Port (channel on server)        |
| `/search`     | Path (what resource you want)   |
| `?query=node` | Query string (extra data sent)  |

---

## 📦 The `url` Module in Node.js

Node.js gives us a built-in module called `url` to help break URLs into parts.

### 👉 How to Use

```js
const url = require("url");
```

### 🔍 Parsing a URL

```js
const parsed = url.parse("/about?myname=Subhash", true);
console.log(parsed.pathname); // Output: /about
console.log(parsed.query.myname); // Output: Subhash
```

### ❓ Why `true` in `url.parse(url, true)`?

* If `true`: returns query string as an object (easy to access)
* If `false`: returns query string as a plain text

---

## 🧪 Real Example with HTTP Server

```js
const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
    const log = `${Date.now()} : ${req.url} New Req Received\n`;
    const myUrl = url.parse(req.url, true); // turns query into object
    console.log(myUrl);

    if (req.url === "/favicon.ico") return res.end();

    fs.appendFile("log.txt", log, () => {
        switch (myUrl.pathname) {
            case "/":
                res.end("HomePage");
                break;

            case "/about":
                const username = myUrl.query.myname;
                res.end(`Hii, ${username}`);
                break;

            case "/search":
                const search = myUrl.query.query_search;
                res.end("Here is your search result: " + search);
                break;

            default:
                res.end("Page Not Found");
                break;
        }
    });
});

myServer.listen(8000, () => {
    console.log("Server Started");
});
```

---

## 🧪 Sample Outputs

### 1. Homepage:

Visit → `http://localhost:8000/`

```
Output: HomePage
```

### 2. About Page with Name:

Visit → `http://localhost:8000/about?myname=Subhash`

```
Output: Hii, Subhash
```

### 3. Search Page with Query:

Visit → `http://localhost:8000/search?query_search=javascript+game`

```
Output: Here is your search result: javascript game
```

### 4. Unknown Route:

Visit → `http://localhost:8000/unknown`

```
Output: Page Not Found
```

---

## 📌 Summary

* `url.parse(req.url, true)` helps split the URL into useful parts.
* `.pathname` gives the route like `/about`.
* `.query` gives an object with query parameters like `{ myname: "Subhash" }`.
* Great for building basic routers without using Express.


