const router = require("express").Router();
const authRoutes = require("./auth");
const profileRoutes = require("./profile/profile");
const requestRoutes = require("./profile/requests");
const offerRoutes = require("./profile/offers");

const authenticateRequest = function (req, res, next) {
  if (!req.isAuthenticated()) {
    // Redirect to login
    res.redirect("/co-health/user/login");
  } else {
    next();
  }
};

router.use("/user", authRoutes);
router.use("/profile", authenticateRequest, profileRoutes);
router.use("/profile/requests", requestRoutes);
router.use("/profile/offers", offerRoutes);

module.exports = router;
