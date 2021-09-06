const router = require("express").Router();
const User = require("../../models/User");

//routes on co-health/profile
router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("requests")
      .populate("offers");

    res.status(200).send({
      _id: user._id,
      username: user.username,
      profileType: user.profileType,
      name: user.name,
      avatar: user.avatar || null,
      address: user.address,
      credentials: user.credentials || null,
      requests: user.requests || null,
      offers: user.offers || null,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/settings", async (req, res) => {
  if (!req.body.city || !req.body.state) {
    return res.status(400).send("City and state are required.");
  }
  const update = {
    name: {
      firstName: req.body.firstName || null,
      lastName: req.body.lastName || null,
    },
    avatar: req.body.avatar || null,
    address: {
      street: req.body.street || null,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode || null,
    },
  };

  const query = { _id: req.user._id };

  try {
    const savedUser = await User.findOneAndUpdate(
      query,
      update,
      { new: true },
      (err, user) => {
        if (err) {
          return err;
        }
      }
    ).populate("requests");

    res.status(200).send({
      _id: savedUser._id,
      username: savedUser.username,
      profileType: savedUser.profileType,
      name: savedUser.name,
      avatar: savedUser.avatar || null,
      address: savedUser.address,
      credentials: savedUser.credentials || null,
      requests: savedUser.requests || null,
      offers: savedUser.offers || null,
    });
  } catch (err) {
    return err;
  }
});

// const healthcareMemberVerification = (req, res, next) => {
//   if (req.profileType !== "healthcare member") {
//     res.send("Cannot access");
//     next();
//   }
// };

module.exports = router;
