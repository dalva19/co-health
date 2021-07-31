const express = require("express");
const mongoose = require("mongoose");
const app = express();

//connect to database
mongoose.connect(
  "mongodb://localhost/co-health",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected to db")
);

//import routes
const authRoute = require("./routes/auth");

//middleware
app.use(express.json());

//route middleware
app.use("/co-health/user", authRoute);

app.listen(3000, () => console.log("Server is running on port 3000."));
