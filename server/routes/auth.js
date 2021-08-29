const router = require("express").Router();
const User = require("../models/User");
const cors = require("cors");
//passport
const passport = require("passport");
const localLogin = require("../services/passport");

//creates new user
router.post("/register", async (req, res) => {
  //validation with Joi??

  if (!req.body.username || !req.body.password) {
    return res
      .status(422)
      .send({ error: "Username and password are required." });
  }

  //check if user is in db via email and username
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).send("Email already exists.");
  }

  const usernameExists = await User.findOne({ username: req.body.username });
  if (usernameExists) {
    return res.status(400).send("Username already exists.");
  }

  //new user based on profile type
  if (req.body.profileType === "healthcare member") {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      profileType: req.body.profileType,
      name: { firstName: req.body.firstName, lastName: req.body.lastName },
      address: {
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zipcode: parseInt(req.body.zipcode),
      },
      credentials: {
        liscence: req.body.liscence,
        liscenceNumber: req.body.liscenceNumber,
        verified: req.body.verified,
      },
    });

    user.setPassword(req.body.password);

    try {
      await user.save();
      // res.redirect("/co-health");
      res.send({ user: savedUser });
    } catch (err) {
      res.status(400).send(err);
    }
  } else {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      profileType: req.body.profileType,
      name: { firstName: req.body.firstName, lastName: req.body.lastName },
      address: {
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zipcode: parseInt(req.body.zipcode),
      },
    });

    user.setPassword(req.body.password);

    try {
      await user.save();
      // res.redirect("/co-health");
      res.send({ user: user._id });
    } catch (err) {
      res.status(400).send(err);
    }
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
  res.status(400).send("login in to co-health");
});

router.get("/logout", function (req, res) {
  req.logout();
  res.status(200).send("You successfully logged out. ");
});

module.exports = router;
