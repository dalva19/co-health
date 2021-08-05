const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cookieSession = require("cookie-session");
const passport = require("passport");
const routes = require("./routes/index");

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

//routes
app.use("/co-health/", routes);

app.listen(3000, () => console.log("Server is running on port 3000."));

module.exports = app;
