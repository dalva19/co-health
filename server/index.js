const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cookieSession = require("cookie-session");
const passport = require("passport");
//import routes
const authRoute = require("./routes/auth");
const profileRoute = require("./routes/profile");
const homeRoute = require("./routes/home");

//connect to database
mongoose.connect(
  "mongodb://localhost/co-health",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected to db")
);

//middleware
app.use(express.json());
app.use(
  cookieSession({
    name: "session",
    keys: ["helloworld"],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

//passport
app.use(passport.initialize());
app.use(passport.session());

const authenticateRequest = function (req, res, next) {
  if (!req.isAuthenticated()) {
    // Denied. Redirect to login
    res.redirect("/co-health/user/login");
  } else {
    next();
  }
};

//route middleware
app.use("/co-health/home", homeRoute);
app.use("/co-health/user", authRoute);
app.use("/co-health/profile", authenticateRequest, profileRoute);

app.listen(3000, () => console.log("Server is running on port 3000."));

module.exports = app;
