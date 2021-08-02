const router = require("express").Router();
const User = require("../models/User");
//passport
const passport = require("passport");
const localLogin = require("../services/passport");

router.post("/register", async (req, res) => {
  //validation with Joi??

  //check if user is in db via email and username
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).send("Email already exists.");
  }

  const usernameExists = await User.findOne({ username: req.body.username });
  if (usernameExists) {
    return res.status(400).send("Username already exists.");
  }
  //create new user
  const user = new User({
    username: req.body.username,
    email: req.body.email,
  });

  user.setPassword(req.body.password);

  try {
    const savedUser = await user.save();

    req.login(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect("/co-health/profile/" + req.user.username);
    });

    // res.redirect("login");
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/co-health/profile",
    failureRedirect: "login",
  })
);

router.get("/login", (req, res) => {
  //redirect to frontend login form
  res.send("login in to co-health");
});

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("login");
});

module.exports = router;
