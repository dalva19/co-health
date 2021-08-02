const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cookieSession = require("cookie-session");
const passport = require("passport");

//import routes
const authRoute = require("./routes/auth");
const profileRoute = require("./routes/profile");

//connect to database
mongoose.connect(
  "mongodb://localhost/co-health",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected to db")
);

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

//middleware
app.use(express.json());

//route middleware
app.use("/co-health/user", authRoute);
app.use("/co-health/profile", profileRoute);

app.listen(3000, () => console.log("Server is running on port 3000."));
