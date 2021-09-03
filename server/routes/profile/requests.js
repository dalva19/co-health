const router = require("express").Router();
const mongoose = require("mongoose");
const Request = require("../../models/Request");
const User = require("../../models/User");
const Offer = require("../../models/Offer");
mongoose.set("useFindAndModify", false);

//need to add validation

//finds the requests based on user from Request collection and populates corresponding offers
router.get("/", async (req, res) => {
  try {
    const requests = await Request.find({ user: req.user._id })
      .populate("offers")
      .exec((err, request) => {
        if (err) {
          console.log(err);
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
  if (req.user.profileType === "community member") {
    const user = await User.findById({ _id: req.user._id });

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
      res.status(200).send(savedRequest);
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

//PUT updates to edit request based on id
router.put("/edit/:request", async (req, res) => {
  try {
    const request = await Request.findById({ _id: req.params.request });
    let update;

    if (req.body.text) {
      update = {
        $set: { text: req.body.text },
      };
    } else {
      return res.status(400).send("Bad request.");
    }

    const requestEdit = await Request.findByIdAndUpdate(
      request._id,
      update,
      { new: true },
      (err, request) => {
        if (err) {
          return err;
        }
        //else {
        //   res.status(200).send(`successful edit on ${request}`);
        // }
        res.status(200).send(requestEdit);
      }
    );
  } catch (err) {
    res.status(400).send(err);
  }
});

//PUT to edit offer status in Offer and Request
//made by the community member
router.put("/edit/offer/status/:offerID", async (req, res) => {
  try {
    const offer = await Offer.findById({ _id: req.params.offerID });
    const request = await Request.findById({ _id: offer.request });
    let offerUpdate;
    let requestUpdate;

    if (req.body.status === "offer accepted") {
      offerUpdate = {
        $set: { status: req.body.status },
      };

      requestUpdate = {
        $set: { status: req.body.status },
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

    await Offer.findByIdAndUpdate(offer._id, offerUpdate, (err, doc) => {
      if (err) {
        return err;
      } else {
        console.log(doc);
      }
    });

    const requestStatusEdit = await Request.findByIdAndUpdate(
      request._id,
      requestUpdate,
      { new: true },
      (err, doc) => {
        if (err) {
          return err;
        } else {
          console.log(doc);
        }
      }
    );

    res.status(200).send(requestStatusEdit);
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
