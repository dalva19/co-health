const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const cors = require("cors");
require("dotenv/config");
const { urlencoded } = require("express");
const passport = require("passport");
const routes = require("./routes/index");
const keys = require("./config/keys");
const app = express();

//connect to database
mongoose.connect(
  keys.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to db")
);

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
app.use(urlencoded({ extended: false }));
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

//cofiguring client routes
if (process.env.NODE_ENV === "production") {
  // Serve build assets
  app.use(express.static("client/build"));

  // Serve index.html from /build for base route (catch all)
  app.get("*", (req, res) => {
    // eslint-disable-next-line no-undef
    res.sendFile(path.resolve("client", "build", "index.html"));
  });
}

//PORT
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log("Server is running on port 8000."));

module.exports = app;
