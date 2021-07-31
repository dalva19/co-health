const router = require("express").Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  //validation with Joi?? or passport??

  //check if user is in db via email and username
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).send("Email already exists.");
  }

  const usernameExists = await User.findOne({ username: req.body.email });
  if (usernameExists) {
    return res.status(400).send("Username already exists.");
  }
  //create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });

  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
