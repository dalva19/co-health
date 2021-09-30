const User = require("../models/User");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((userID, done) => {
  User.findById(userID, function (err, user) {
    done(null, user._id);
  });
});

passport.use(
  "local",
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }).then((user) => {
      if (!user) {
        return done(null, false, { message: "Incorrect username or password" });
      }

      if (!user.validPassword(password)) {
        return done(null, false, { message: "Incorrect username or password" });
      }
      if (user) {
        // we already have a record with the given profile ID
        if (user.validPassword(password)) {
          return done(null, user._id);
        } else {
          return done(false);
        }
      }
    });
  })
);
