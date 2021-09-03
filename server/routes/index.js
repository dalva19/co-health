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

router.use("/api/user", authRoutes);
router.use("/api/profile", authenticateRequest, profileRoutes);
router.use("/api/profile/requests", requestRoutes);
router.use("/api/profile/offers", offerRoutes);

module.exports = router;
