
# 🌐 HTTP Headers and Status Codes in Node.js

## 📌 What are HTTP Headers?

HTTP Headers are **key-value pairs** sent between the **client and server**.  
They carry metadata about the request or response.

---

## ✅ Types of HTTP Headers

### 🔹 1. Request Headers (sent by client)
| Header           | Purpose                                 |
|------------------|------------------------------------------|
| Host             | Domain of the server                     |
| User-Agent       | Info about the browser/device            |
| Accept           | What type of data the client wants       |
| Authorization    | Used to send access tokens or credentials |
| Cookie           | Sends saved cookies to the server        |
| Content-Type     | Type of data being sent (e.g., JSON)     |

### 🔹 2. Response Headers (sent by server)
| Header           | Purpose                                     |
|------------------|----------------------------------------------|
| Content-Type     | Tells browser what type of content is returned |
| Set-Cookie       | Sends a cookie to be stored in the browser   |
| Cache-Control    | Caching rules                                |
| Access-Control-Allow-Origin | Used in CORS to allow requests    |
| Content-Length   | Length of the response body in bytes         |

---

## 🛠️ Working with Headers in Node.js

### 🔸 Using `http` module
```js
const http = require('http');

http.createServer((req, res) => {
  console.log(req.headers); // Access incoming headers

  res.setHeader('Content-Type', 'text/plain'); // Set response header
  res.setHeader('X-Powered-By', 'Node.js');

  res.end('Hello World');
}).listen(3000);
```

---

### 🔸 Using `Express.js`
```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  console.log(req.headers['user-agent']); // Access specific header

  res.set('Content-Type', 'application/json');
  res.set('X-Custom-Header', 'Learning-HTTP');

  res.status(200).json({ message: 'Headers demo' });
});

app.listen(3000);
```

---

## 🚦 HTTP Status Codes – What They Mean

### 🔹 1xx – Informational
| Code | Meaning               |
|------|------------------------|
| 100  | Continue              |
| 101  | Switching Protocols   |

### ✅ 2xx – Success
| Code | Meaning                  |
|------|--------------------------|
| 200  | OK                       |
| 201  | Created                  |
| 204  | No Content               |

### 🔁 3xx – Redirection
| Code | Meaning                  |
|------|--------------------------|
| 301  | Moved Permanently        |
| 302  | Found (Temporary redirect) |
| 304  | Not Modified             |

### ❌ 4xx – Client Errors
| Code | Meaning                  |
|------|--------------------------|
| 400  | Bad Request              |
| 401  | Unauthorized             |
| 403  | Forbidden                |
| 404  | Not Found                |
| 409  | Conflict                 |

### 🛑 5xx – Server Errors
| Code | Meaning                  |
|------|--------------------------|
| 500  | Internal Server Error    |
| 502  | Bad Gateway              |
| 503  | Service Unavailable      |

---

## 🧠 Tips

- Use `Content-Type: application/json` for APIs.
- Use `Authorization` headers for tokens.
- Always set proper `status` code in responses.

---

## 🧪 Express Example Combining Headers & Status
```js
app.get('/login', (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Assume token is valid for this example
  res.set('X-Auth-Checked', 'true');
  res.status(200).json({ message: 'Login successful' });
});
```

---

## 📌 Conclusion

- Headers = metadata (about request/response)
- Status codes = meaning of the result
- Focus on understanding what each header/status **means** and **when to use** it
