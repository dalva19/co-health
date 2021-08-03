const router = require("express").Router();
const mongoose = require("mongoose");
const Request = require("../models/Request");
const User = require("../models/User");
const Offer = require("../models/Offer");
mongoose.set("useFindAndModify", false);

router.post("/", async (req, res) => {
  //need to add validation
  if (req.user.profileType === "community member") {
    const user = await User.findById({ _id: req.user._id });

    const request = new Request({
      text: req.body.text,
      username: req.user.username,
      user: user._id,
      status: "pending",
    });

    try {
      await request.save();
      user.requests.push(request);
      await user.save();

      res.send({ user: user._id });
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

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
            requests: user.requests || null,
          });
        }
      });
  } catch (err) {
    res.status(400).send(err);
  }
});

//PUT on requests/:request
//PUT with the accepted offer link

router.delete("/:request", async (req, res) => {
  const request = await Request.findById({ _id: req.params.request });
  const user = await User.findById({ _id: req.user._id });

  if (!request) {
    return res.status(404).send("Request not found");
  }

  try {
    const update = { $pull: { requests: request._id } };
    await Request.deleteOne({ _id: request._id });
    await User.findByIdAndUpdate(user._id, update, (err, doc) => {
      if (err) {
        console.log(err);
      }
    });
    res.status(200).send(`successfully deleted.`);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
