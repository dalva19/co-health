const router = require("express").Router();

router.get("/", (req, res) => {
  // if (!req.user) {
  //   res.status(401);
  //   return res.send("No");
  // }
  if (req.user) {
    res.status(200);
    res.send(`user logged into profile`);
  }
});

//figure out how to populate username into params from login
router.get("/:username", (req, res) => {
  if (req.user.username === req.params.username) {
    res.status(200);
    res.send("profile name in url");
  }
});

module.exports = router;
