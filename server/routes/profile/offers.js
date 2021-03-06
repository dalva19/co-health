const router = require("express").Router();
const mongoose = require("mongoose");
const Offer = require("../../models/Offer");
const User = require("../../models/User");
const Request = require("../../models/Request");
const ObjectId = require("mongoose").Types.ObjectId;
// mongoose.set("useFindAndModify", false);

//get all offer user made
router.get("/", async (req, res) => {
  const perPage = 4;
  const page = req.query.page || 1;
  const query = { user: req.user };
  let data = {};
  let user;

  try {
    user = await User.findById(req.user);
  } catch (err) {
    return err;
  }

  if (!user.credentials.verified) {
    return res.status(401).send("You must have a verified liscence.");
  }

  try {
    await Offer.find(query)
      .sort({ date: -1 })
      .skip(perPage * page - perPage)
      .limit(perPage)
      .populate("request")
      .exec((err, offers) => {
        Offer.countDocuments(query, (err, count) => {
          if (err) return err;

          data = {
            offers: offers,
            count: count,
          };

          if (data.count === 0) {
            return res.status(404).send("No offers in database");
          } else {
            res.status(200).send(data);
          }
        });
      });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/:offerId", async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.offerId);
    if (!offer) {
      res.status(404).send("Not found");
    }

    res.status(200).send(offer);
  } catch (err) {
    res.status(400).send(err);
  }
});

//can only make an offer to a specific request
router.post("/:requestId", async (req, res) => {
  const healthCareMember = "healthcare member";
  let request;
  let user;

  try {
    user = await User.findById(req.user);
    request = await Request.findById({ _id: req.params.requestId });
  } catch (err) {
    return err;
  }

  if (
    user.profileType.replace(/\s+/g, "").trim().toLowerCase() ===
    healthCareMember.replace(/\s+/g, "").trim().toLowerCase()
  ) {
    if (!user.credentials.verified) {
      return res
        .status(401)
        .send("You must have a verified liscence to make an offer.");
    }

    // try {
    //   user = await User.findById({ _id: req.user._id });
    //   request = await Request.findById({ _id: req.params.requestId });
    // } catch (err) {
    //   return err;
    // }

    const offer = new Offer({
      text: req.body.text,
      username: user.username,
      user: user._id,
      request: request._id,
      status: "pending",
    });

    try {
      const newOffer = await offer.save();
      const savedOffer = await Offer.findById(newOffer._id).populate("request");
      user.offers.push(savedOffer);
      request.offers.push(savedOffer);
      const savedUser = await user.save();
      const savedRequest = await request.save();

      res.status(200).send({
        user: savedUser._id,
        request: savedRequest,
        offer: savedOffer,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

//PUT route for /:offerID to edit text
router.put("/edit/:offerID", async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.offerID);
    let update;

    if (req.body.text) {
      update = {
        $set: { text: req.body.text },
      };
    } else {
      return res.status(400).send("Bad request.");
    }

    const savedOfferEdit = await Offer.findByIdAndUpdate(offer._id, update, {
      new: true,
    }).populate("request");

    res.status(200).send(savedOfferEdit);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/:offerID", async (req, res) => {
  const offer = await Offer.findById(req.params.offerID);
  const user = await User.findById(req.user);
  const requestID = offer.request;

  if (!offer) {
    return res.status(404).send("Offer not found");
  }
  if (!user) {
    return res.status(404).send("User not found");
  }

  try {
    const update = { $pull: { offers: offer._id } };

    await Offer.deleteOne({ _id: offer._id });
    await User.findByIdAndUpdate(user._id, update);
    await Request.findByIdAndUpdate(requestID, update);
    res.status(200).send({ deletedOfferId: req.params.offerID });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
