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

router.use("/requests", requestRoutes);
router.use("/offers", offersRoutes);

// //figure out how to populate username into params from login
// router.get("/:username", async (req, res) => {
//   if (req.user.username === req.params.username) {
//     res.status(200);
//     //get profile info from db
//     try {
//       await User.findById({ _id: req.user._id })
//         .populate("requests")
//         .exec((err, user) => {
//           if (err) {
//             console.log(err);
//           } else {
//             res.send({
//               name: user.name,
//               username: user.username,
//               profileType: user.profileType,
//               address: user.address,
//               credentials: user.credentials || null,
//               requests: user.requests || null,
//               offers: user.offers || null,
//             });
//           }
//         });
//     } catch (err) {
//       res.status(400).send(err);
//     }
//   }
// });

module.exports = router;
