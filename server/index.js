const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cookieSession = require("cookie-session");
const passport = require("passport");
const routes = require("./routes/index");
const cors = require("cors");
require("dotenv");

//connect to database
const env = process.env.NODE_ENV || "development";
if (env === "test") {
  process.env.MONGODB_URI = "mongodb://localhost/co-health-test";
} else {
  process.env.MONGODB_URI = "mongodb://localhost/co-health";
}
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to db")
);

// mongoose.connect(
//   "mongodb://localhost/co-health",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   () => console.log("connected to db")
// );

//middleware
const corsOptions = {
  //To allow requests from client
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1",
    // "http://104.142.122.231",
  ],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

app.use(express.json());
app.use(
  cookieSession({
    name: "session",
    keys: ["key1"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));

//routes
app.use("/co-health/", routes);

app.listen(8000, () => console.log("Server is running on port 8000."));

module.exports = app;
