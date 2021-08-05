const router = require("express").Router();
const authRoutes = require("./auth");
const profileRoutes = require("./profile/profile");
const homeRoute = require("./home");

const authenticateRequest = function (req, res, next) {
  if (!req.isAuthenticated()) {
    // Redirect to login
    res.redirect("/co-health/user/login");
  } else {
    next();
  }
};

router.use("/user", authRoutes);
router.use("/home", homeRoute);
router.use("/profile", authenticateRequest, profileRoutes);

module.exports = router;
