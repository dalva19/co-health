const router = require("express").Router();
const authRoutes = require("./auth");
const profileRoutes = require("./profile/profile");
const requestRoutes = require("./profile/requests");
const offerRoutes = require("./profile/offers");

const authenticateRequest = function (req, res, next) {
  if (!req.isAuthenticated()) {
    // Redirect to login
    res.redirect("/co-health/api/user/login");
  } else {
    next();
  }
};

router.use("/co-health/api/user", authRoutes);
router.use("/co-health/api/profile", authenticateRequest, profileRoutes);
router.use("/co-health/api/profile/requests", requestRoutes);
router.use("/co-health/api/profile/offers", offerRoutes);

module.exports = router;
