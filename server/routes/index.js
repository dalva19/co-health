const router = require("express").Router();
const authRoutes = require("./auth");
const profileRoutes = require("./profile/profile");
const profileRequestRoutes = require("./profile/requests");
const offerRoutes = require("./profile/offers");
const chatRoutes = require("./chat");
const requestsRoutes = require("./requests");
const licenseRoutes = require("./license");

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
router.use("/co-health/api/profile/requests", profileRequestRoutes);
router.use("/co-health/api/profile/offers", offerRoutes);
router.use("/co-health/api/chat", chatRoutes);
router.use("/co-health/api/requests", requestsRoutes);
router.use("/co-health/api/license", licenseRoutes);

module.exports = router;
