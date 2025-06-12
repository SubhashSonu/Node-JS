const express = require("express");

const userRouter = require("./routes/user");

const { connectMongoDb } = require("./connection");

const { logReqRes } = require("./middlewares");


// const users = require("./MOCK_DATA.json");


const app = express();
const port = 8000;

// connection
connectMongoDb("mongodb://127.0.0.1:27017/your-app-1")


// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

app.use(logReqRes("log.txt"));


// routes
app.use("/api/users",userRouter);

app.listen(port, () => {
    console.log(`Server Started at Port:${port}`);
})


