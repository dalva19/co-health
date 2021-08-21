const router = require("express").Router();
const User = require("../../models/User");
const requestRoutes = require("./requests");
const offersRoutes = require("./offers");

//routes on co-health/profile
router.get("/", async (req, res) => {
  res.status(200);

  try {
    await User.findById({ _id: req.user._id })
      .populate("requests")
      .exec((err, user) => {
        if (err) {
          console.log(err);
        } else {
          res.send({
            name: user.name,
            username: user.username,
            profileType: user.profileType,
            address: user.address,
            city: user.city,
            credentials: user.credentials || null,
            requests: user.requests || null,
            offers: user.offers || null,
          });
        }
      });
  } catch (err) {
    res.status(400).send(err);
  }
});

// const healthcareMemberVerification = (req, res, next) => {
//   if (req.profileType !== "healthcare member") {
//     res.send("Cannot access");
//     next();
//   }
// };

module.exports = router;
