const express = require("express");
const app = express();

//import routes
const authRoute = require("./routes/auth");

//route middleware
app.use("/co-health/user", authRoute);

app.listen(3000, () => console.log("Server is running on port 3000."));
