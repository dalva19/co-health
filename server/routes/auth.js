const router = require("express").Router();

router.post("/register", (req, res) => {
  res.send("Register me");
});

module.exports = router;
