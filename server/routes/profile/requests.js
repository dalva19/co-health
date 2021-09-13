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
  try {
    const requests = await Request.find({
      user: req.user._id,
    }).populate("offers");

    res.status(200).send(requests);
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
    req.user.profileType.trim().toLowerCase() ===
    communityMember.trim().toLowerCase()
  ) {
    const user = await User.findById({ _id: req.user._id })
      .populate("requests")
      .select({ hash: 0 });

    const request = new Request({
      text: req.body.text,
      username: user.username,
      user: user._id,
      status: "awaiting offer",
      community: user.address.city,
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
    const communityUser = await User.findById(request.user);
    const healthcareUser = await User.findById(offer.user);
    const offerAccepted = "offer accepted";
    let offerUpdate;
    let requestUpdate;
    let chat;

    //return error if already accepted
    if (req.body.status === request.status) {
      return res.status(400).send("Bad request");
    }

    if (
      req.body.status.trim().toLowerCase() ===
      offerAccepted.trim().toLowerCase()
    ) {
      offerUpdate = {
        $set: { status: req.body.status },
      };

      requestUpdate = {
        $set: { status: req.body.status, acceptedOffer: offer.id },
      };

      //adds contact to users contact list if not already connected
      //creates new Chat if users not already connected
      const existingCommunityContact = communityUser.contacts.find(
        (contact) =>
          contact.username.trim().toLowerCase() ===
          healthcareUser.username.trim().toLowerCase()
      );
      const existingHealthcareContact = healthcareUser.contacts.find(
        (contact) =>
          contact.username.trim().toLowerCase() ===
          communityUser.username.trim().toLowerCase()
      );

      if (!existingCommunityContact && !existingHealthcareContact) {
        const newCommunityContact = {
          username: communityUser.username,
          user: communityUser._id,
        };

        const newHealthcareContact = {
          username: healthcareUser.username,
          user: healthcareUser._id,
        };

        chat = new Chat({
          communityMember: communityUser._id,
          healthcareMember: healthcareUser._id,
        });

        communityUser.contacts.push(newHealthcareContact);
        healthcareUser.contacts.push(newCommunityContact);

        await communityUser.save();
        await healthcareUser.save();

        chat = newChat.save();
      }
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

    res.status(200).send({ request: requestStatusEdit, chat: chat });
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
    await User.findByIdAndUpdate(user._id, update);

    res.status(200).send({ deletedRequestId: req.params.request });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
