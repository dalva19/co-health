const router = require("express").Router();
const License = require("../models/License");
const User = require("../models/User");

router.get("/", async (req, res) => {
  if (!req.query.name || !req.query.licenseType || !req.query.licenseNumber) {
    return res.status(400).send("Bad request");
  }

  const normalizedName = req.query.name.replace(/\s+/g, "").toLowerCase();
  const normalizedLicenseType = req.query.licenseType
    .replace(/\s+/g, "")
    .toLowerCase();

  try {
    const license = await License.find({
      normalizedName: normalizedName,
      normalizedLicenseType: normalizedLicenseType,
      licenseNumber: req.query.licenseNumber,
    });

    if (!license) {
      return res.status(404).send("No license on file for that user");
    }

    res.status(200).send(license);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/verify", async (req, res) => {
  let update;

  if (req.body.status === "active") {
    update = {
      credentials: {
        license: req.body.licenseType,
        licenseNumber: req.body.licenseNumber,
        verified: true,
      },
    };
  } else {
    return res.status(401).send({ verifiedLicense: "License is not active." });
  }

  try {
    const user = await User.findByIdAndUpdate(req.user._id, update, {
      new: true,
    }).select({ hash: 0, salt: 0 });
    res.status(200).send({ user: user, verifiedLicense: user.credentials });
  } catch (err) {
    return err;
  }
});

module.exports = router;
