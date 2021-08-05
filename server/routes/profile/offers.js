const router = require("express").Router();
const mongoose = require("mongoose");
const Offer = require("../../models/Offer");
const User = require("../../models/User");
const Request = require("../../models/Request");
mongoose.set("useFindAndModify", false);

//get all offer you've made

router.get("/", async (req, res) => {
  res.status(200);

  if (!req.user.credentials.verified) {
    return res.status(401).send("You must have a verified liscence.");
  }

  //finds the offers based on user from Offer collection and populates corresponding requests
  try {
    await Offer.find({ user: req.user._id })
      .populate("request")
      .exec((err, offer) => {
        if (err) {
          console.log(err);
        } else {
          res.send(offer);
        }
      });
  } catch (err) {
    res.status(400).send(err);
  }

  // try {
  //   await User.findById({ _id: req.user._id })
  //     .populate("offers")
  //     .exec((err, user) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         res.send({
  //           offers: user.offers || null,
  //         });
  //       }
  //     });
  // } catch (err) {
  //   res.status(400).send(err);
  // }
});

//can only make an offer to a specific request
router.post("/:requestID", async (req, res) => {
  //need to add validation

  if (req.user.profileType === "healthcare member") {
    if (!req.user.credentials.verified) {
      return res
        .status(401)
        .send("You must have a verified liscence to make an offer.");
    }

    const user = await User.findById({ _id: req.user._id });
    const request = await Request.findById({ _id: req.params.requestID });

    const offer = new Offer({
      text: req.body.text,
      username: req.user.username,
      user: user._id,
      request: request._id,
      status: "pending",
    });

    try {
      await offer.save();
      user.offers.push(offer);
      request.offers.push(offer);
      await user.save();
      await request.save();

      res.send({ user: user._id });
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

//PUT route for /:offerID to edit text
router.put("/edit/:offerID", async (req, res) => {
  try {
    const offer = await Offer.findById({ _id: req.params.offerID });
    let update;

    if (req.body.text) {
      update = {
        $set: { text: req.body.text },
      };
    } else {
      return res.status(400).send("Bad request.");
    }

    await Offer.findByIdAndUpdate(offer._id, update, (err, doc) => {
      if (err) {
        return err;
      } else {
        res.status(200).send(`successful edit on ${doc}`);
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/:offerID", async (req, res) => {
  const offer = await Offer.findById({ _id: req.params.offerID });
  const user = await User.findById({ _id: req.user._id });
  const requestID = offer.request;

  if (!offer) {
    return res.status(404).send("Offer not found");
  }

  try {
    const update = { $pull: { offers: offer._id } };

    await Offer.deleteOne({ _id: offer._id });
    await User.findByIdAndUpdate(user._id, update, (err, doc) => {
      if (err) {
        console.log(err);
      }
    });
    await Request.findByIdAndUpdate(requestID, update, (err, doc) => {
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
