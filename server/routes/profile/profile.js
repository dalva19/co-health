const router = require("express").Router();
const User = require("../../models/User");

//routes on co-health/profile
router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("requests")
      .populate("offers")
      .select({ hash: 0, salt: 0 });

    console.log(user);
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

//user can see other people's profiles
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("requests")
      .populate("offers");

    res.status(200).send({
      _id: user._id,
      username: user.username,
      profileType: user.profileType,
      name: user.name,
      avatar: user.avatar || null,
      credentials: user.credentials || null,
      requests: user.requests || null,
      offers: user.offers || null,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/settings/info", async (req, res) => {
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
      zipcode: req.body.zipCode || null,
    },
    coordinates: {
      lat: req.body.lat,
      lng: req.body.lng,
    },
  };

  const query = { _id: req.user._id };

  try {
    const savedUser = await User.findOneAndUpdate(query, update, {
      new: true,
    })
      .populate("requests")
      .select({ hash: 0, salt: 0 });

    res.status(200).send(savedUser);
  } catch (err) {
    return err;
  }
});

router.put("/settings/license", async (req, res) => {
  if (!req.body.licenseType || !req.body.licenseNumber) {
    return res.status(400).send("License type and number are required.");
  }
  const update = {
    credentials: {
      license: req.body.licenseType || null,
      licenseNumber: req.body.licenseNumber || null,
    },
  };

  const query = { _id: req.user._id };

  try {
    const savedUser = await User.findOneAndUpdate(query, update, {
      new: true,
    })
      .populate("requests")
      .select({ hash: 0, salt: 0 });

    res.status(200).send(savedUser);
  } catch (err) {
    return err;
  }
});

module.exports = router;
