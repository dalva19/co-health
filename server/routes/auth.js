const router = require("express").Router();
const User = require("../models/User");
const cors = require("cors");
//passport
const passport = require("passport");
const localLogin = require("../services/passport");

//creates new user
router.post("/register", async (req, res) => {
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

  const user = {
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
  };

  //new user based on profile type
  if (req.body.profileType === "healthcare member") {
    const newUser = new User({
      ...user,
      credentials: {
        liscence: req.body.liscence,
        liscenceNumber: req.body.liscenceNumber,
        verified: req.body.verified,
      },
    });

    newUser.setPassword(req.body.password);

    try {
      const savedUser = await newUser.save();
      res.status(200).send({
        user: {
          _id: savedUser._id,
          username: savedUser.username,
          email: savedUser.email,
          profileType: savedUser.profileType,
          name: savedUser.name,
          address: savedUser.address,
          credentials: savedUser.credentials,
        },
      });
    } catch (err) {
      res.status(400).send(err);
    }
  } else if (req.body.profileType === "community member") {
    const newUser = new User({ ...user });

    newUser.setPassword(req.body.password);

    try {
      const savedUser = await newUser.save();
      // res.redirect("/co-health");
      res.status(200).send({
        user: {
          _id: savedUser._id,
          username: savedUser.username,
          email: savedUser.email,
          profileType: savedUser.profileType,
          name: savedUser.name,
          address: savedUser.address,
        },
      });
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/co-health/api/profile",
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
