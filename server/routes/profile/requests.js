const router = require("express").Router();
const mongoose = require("mongoose");
const Request = require("../../models/Request");
const User = require("../../models/User");
const Offer = require("../../models/Offer");
const ObjectId = require("mongoose").Types.ObjectId;
// mongoose.set("useFindAndModify", false);

//need to add validation

//finds the requests based on user from Request collection and populates corresponding offers
router.get("/", async (req, res) => {
  try {
    await Request.find({ user: new ObjectId(req.user._id) })
      .populate("offers")
      .exec((err, requests) => {
        if (err) {
          return err;
        } else {
          res.status(200).send(requests);
        }
      });
  } catch (err) {
    res.status(400).send(err);
  }

  // try {
  //   await User.findById({ _id: req.user._id })
  //     .populate("requests")
  //     .exec((err, user) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         res.send({
  //           requests: user.requests || null,
  //         });
  //       }
  //     });
  // } catch (err) {
  //   res.status(400).send(err);
  // }
});

router.post("/", async (req, res) => {
  if (!req.body.text) {
    return res.status(400).send("Bad request");
  }

  if (req.user.profileType === "community member") {
    const user = await User.findById({ _id: req.user._id }).populate(
      "requests"
    );

    const request = new Request({
      text: req.body.text,
      username: user.username,
      user: user._id,
      status: "awaiting offer",
    });

    try {
      const savedRequest = await request.save();
      user.requests.push(savedRequest);
      const savedUser = await user.save();
      res.status(200).send({ user: savedUser, newRequest: savedRequest });
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

//PUT updates to edit request based on id
router.put("/edit/:request", async (req, res) => {
  try {
    const request = await Request.findById({
      _id: req.params.request,
    }).populate("user");

    let update;

    if (req.body.text) {
      update = {
        $set: { text: req.body.text },
      };
    } else {
      return res.status(400).send("Bad request.");
    }

    const requestEdit = await Request.findByIdAndUpdate(request._id, update, {
      new: true,
    });
    res.status(200).send({ request: requestEdit });
  } catch (err) {
    res.status(400).send(err);
  }
});

//PUT to edit offer status in Offer and Request
//made by the community member
router.put("/edit/offer/status/:offerID", async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.offerID);
    const request = await Request.findById(offer.request);
    let offerUpdate;
    let requestUpdate;

    if (req.body.status === "offer accepted") {
      offerUpdate = {
        $set: { status: req.body.status },
      };

      requestUpdate = {
        $set: { status: req.body.status, acceptedOffer: offer.id },
      };
    } else if (req.body.status === "offer declined") {
      offerUpdate = {
        $set: { status: req.body.status },
      };

      requestUpdate = {
        $set: { status: "offers under review" },
      };
    } else {
      return res.status(400).send("Bad request");
    }

    const offerStatusEdit = await Offer.findByIdAndUpdate(
      offer._id,
      offerUpdate,
      { new: true }
    ).populate("request");

    const requestStatusEdit = await Request.findByIdAndUpdate(
      request._id,
      requestUpdate,
      { new: true }
    ).populate("acceptedOffer");

    res.status(200).send({ request: requestStatusEdit });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/:request", async (req, res) => {
  try {
    const request = await Request.findById({ _id: req.params.request });
    const user = await User.findById({ _id: req.user._id });
    const update = { $pull: { requests: request._id } };

    await Request.deleteOne({ _id: request._id });
    await User.findByIdAndUpdate(user._id, update, (err, doc) => {
      if (err) {
        return err;
      } else {
        res.status(200).send(`successfully deleted ${doc}.`);
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
