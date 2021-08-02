const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cookieSession = require("cookie-session");
const passport = require("passport");

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

app.use(passport.initialize());
app.use(passport.session());

//import routes
const authRoute = require("./routes/auth");
app.get("/success", (req, res) => {
  res.send("Hey, hello from the server!");
});
app.get("/login", (req, res) => {
  res.send("login failed. try again");
});

//middleware
app.use(express.json());

//route middleware
app.use("/co-health/user", authRoute);

// app.post(
//   "/register",
//   passport.authenticate("login", {
//     successRedirect: "/success",
//     failureRedirect: "/login",
//   })
// );

app.listen(3000, () => console.log("Server is running on port 3000."));
