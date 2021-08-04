const router = require("express").Router();

//routes on co-health/profile

router.get("/", (req, res) => {
  res.status(200).send("This is the home route");
});

module.exports = router;
