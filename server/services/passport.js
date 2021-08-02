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
