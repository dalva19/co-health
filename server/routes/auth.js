const router = require("express").Router();
const User = require("../models/User");

//passport
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }).then((user) => {
      // if (err) {
      //   return done(err);
      // }
      console.log(user);
      if (!user) {
        return done(null, false, { message: "Incorrect username or password" });
      }

      if (!user.validPassword(password)) {
        return done(null, false, { message: "Incorrect username or password" });
      }
      if (user) {
        // we already have a record with the given profile ID
        if (user.validPassword(password)) {
          return done(null, user);
        } else {
          return done(false);
        }
      }
      // else {
      //   const myNewUser = new User({ username: username });

      //   myNewUser.setPassword(password);

      //   myNewUser.save(function (err, user) {
      //     done(null, user);
      //   });
      // }
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((userID, done) => {
  User.findById(userID, function (err, user) {
    done(null, user);
  });
});

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
    res.redirect("login");
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/co-health/profile",
    failureRedirect: "login",
  })
);

router.get("/success", (req, res) => {
  //redirect to frontend login form
  res.send("you're logged in");
});

router.get("/login", (req, res) => {
  //redirect to frontend login form
  res.send("login in to co-health");
});

module.exports = router;
