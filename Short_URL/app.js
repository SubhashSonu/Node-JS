const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const { connectToMongoDB } = require("./connections");
const { restrictToLoggedUserOnly,checkAuth } = require("./middlewares/auth");

const URL = require("./models/url");

const urlRoute = require("./routes/router");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8001;

// Connect to MongoDB
connectToMongoDB("mongodb://localhost:27017/short-url");

// Set EJS as templating engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Test route to show all URLs
app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", { urls: allUrls });
});

// Routes
app.use("/",checkAuth,staticRoute);
app.use("/url", restrictToLoggedUserOnly, urlRoute);
app.use("/user", userRoute);

// Redirect handler for short URLs
app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } }
    );

    if (!entry) {
      return res.status(404).send("Short URL not found");
    }

    res.redirect(entry.redirectURL);
  } catch (error) {
    console.error("Error during redirect:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Server listener
app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
