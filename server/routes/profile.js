const router = require("express").Router();
const Request = require("../models/Request");
const User = require("../models/User");

router.get("/", (req, res) => {
  res.status(200);
  //get profile info from db
  res.send(`user logged into profile`);
});

//figure out how to populate username into params from login
router.get("/:username", (req, res) => {
  if (req.user.username === req.params.username) {
    res.status(200);
    //get profile info from db
    res.send("profile name in url");
  }
});

router.post("/request", async (req, res) => {
  //need to add validation
  if (req.user.profileType === "community member") {
    const user = await User.findById({ _id: req.user._id });

    const request = new Request({
      text: req.body.text,
      username: req.user.username,
      user: user._id,
      status: "pending",
    });

    try {
      await request.save();
      user.requests.push(request);
      await user.save();

      res.send({ user: user._id });
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

module.exports = router;
