const router = require("express").Router();
const mongoose = require("mongoose");
const Request = require("../../models/Request");
const User = require("../../models/User");
const Offer = require("../../models/Offer");
const Chat = require("../../models/Chat");
const ObjectId = require("mongoose").Types.ObjectId;
// mongoose.set("useFindAndModify", false);

//need to add validation

//finds the requests based on user from Request collection and populates corresponding offers
router.get("/", async (req, res) => {
  const perPage = 4;
  const page = req.query.page || 1;
  const query = { user: req.user._id };
  let data = {};

  try {
    await Request.find(query)
      .sort({ date: -1 })
      .skip(perPage * page - perPage)
      .limit(perPage)
      .populate("offers")
      .exec((err, requests) => {
        Request.countDocuments(query, (err, count) => {
          if (err) return err;

          data = {
            requests: requests,
            count: count,
          };

          if (data.count === 0) {
            return res.status(404).send("No requests in database");
          } else {
            res.status(200).send(data);
          }
        });
      });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/:requestId", async (req, res) => {
  try {
    const request = await Request.findById(req.params.requestId);
    if (!request) {
      res.status(404).send("Not found");
    }

    res.status(200).send(request);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/", async (req, res) => {
  const communityMember = "community member";

  if (!req.body.text) {
    return res.status(400).send("Bad request");
  }

  if (!req.user.address.city) {
    return res
      .status(400)
      .send("User must have a default community to make requests.");
  }

  if (
    req.user.profileType.replace(/\s+/g, "").trim().toLowerCase() ===
    communityMember.replace(/\s+/g, "").trim().toLowerCase()
  ) {
    const user = await User.findById(req.user._id)
      .populate("requests")
      .select({ hash: 0 });

    const request = new Request({
      text: req.body.text,
      username: user.username,
      user: user._id,
      status: "pending offer",
      community: user.address.city,
      normalizedCommunity: user.address.city
        .replace(/\s+/g, "")
        .trim()
        .toLowerCase(),
      coordinates: req.user.coordinates,
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
//creates contact
//creates chat
//think about separating there into different routes???
router.put("/edit/offer/status/:offerID", async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.offerID);
    const request = await Request.findById(offer.request);
    const communityUser = await User.findById(request.user).select({
      hash: 0,
      salt: 0,
    });
    const healthcareUser = await User.findById(offer.user).select({
      hash: 0,
      salt: 0,
    });
    const offerAccepted = "offer accepted";
    const offerDeclined = "offer declined";
    let offerUpdate;
    let requestUpdate;
    // let chat;

    //return error if already accepted
    if (
      req.body.status.replace(/\s+/g, "").trim().toLowerCase() ===
      request.status.replace(/\s+/g, "").trim().toLowerCase()
    ) {
      return res.status(400).send("Bad request");
    }

    if (
      req.body.status.replace(/\s+/g, "").trim().toLowerCase() ===
      offerAccepted.replace(/\s+/g, "").trim().toLowerCase()
    ) {
      offerUpdate = {
        $set: { status: req.body.status },
      };

      requestUpdate = {
        $set: { status: req.body.status, acceptedOffer: offer.id },
      };

      //adds contact to users contact list if not already connected
      //creates new Chat if users not already connected
      // const existingCommunityContact = communityUser.contacts.find(
      //   (contact) =>
      //     contact.username.replace(/\s+/g, "").trim().toLowerCase() ===
      //     healthcareUser.username.replace(/\s+/g, "").trim().toLowerCase()
      // );

      // const existingHealthcareContact = healthcareUser.contacts.find(
      //   (contact) =>
      //     contact.username.replace(/\s+/g, "").trim().toLowerCase() ===
      //     communityUser.username.replace(/\s+/g, "").trim().toLowerCase()
      // );

      // if (!existingCommunityContact && !existingHealthcareContact) {
      //   const newCommunityContact = {
      //     username: communityUser.username,
      //     user: communityUser._id,
      //   };

      //   const newHealthcareContact = {
      //     username: healthcareUser.username,
      //     user: healthcareUser._id,
      //   };

      //   const newChat = new Chat({
      //     communityMember: communityUser._id,
      //     healthcareMember: healthcareUser._id,
      //   });

      //   communityUser.contacts.push(newHealthcareContact);
      //   healthcareUser.contacts.push(newCommunityContact);

      //   await communityUser.save();
      //   await healthcareUser.save();

      //   chat = newChat.save();
      // }
    } else if (
      req.body.status.replace(/\s+/g, "").trim().toLowerCase() ===
      offerDeclined.replace(/\s+/g, "").trim().toLowerCase()
    ) {
      offerUpdate = {
        $set: { status: req.body.status },
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
    ).populate("offers");

    res
      .status(200)
      .send({ request: requestStatusEdit, offer: offerStatusEdit });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/:request", async (req, res) => {
  try {
    const request = await Request.findById({ _id: req.params.request });
    const user = await User.findById({ _id: req.user._id });
    const update = { $pull: { requests: request._id } };
    const offerUpdate = {
      $set: { status: "Request deleted. Offer not needed." },
    };
    const query = { request: request._id };

    await Request.deleteOne({ _id: request._id });
    await User.findByIdAndUpdate(user._id, update);
    await Offer.findOneAndUpdate(query, offerUpdate, { new: true });
    // await Offer.deleteMany({ request: request._id });

    res.status(200).send({ deletedRequestId: req.params.request });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
