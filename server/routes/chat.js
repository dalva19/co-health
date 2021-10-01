const router = require("express").Router();
const Chat = require("../models/Chat");
const Offer = require("../models/Offer");
const User = require("../models/User");
const Request = require("../models/Request");

router.get("/", async (req, res) => {
  try {
    const chat = await Chat.find({
      communityMember: req.query.communityMember,
      healthcareMember: req.query.healthcareMember,
    });

    if (chat.length === 0) {
      return res.status(404).send("No chats found");
    }

    res.status(200).send(chat[0]);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/:chatId", async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId);

    if (!chat) {
      return res.status(404).send("No chats found");
    }

    res.status(200).send(chat);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/contacts", async (req, res) => {
  //adds contact to users contact list if not already connected
  //creates new Chat if users not already connected

  try {
    const offer = await Offer.findById(req.body.offerId);
    const request = await Request.findById(offer.request);
    const communityUser = await User.findById(request.user).select({
      hash: 0,
      salt: 0,
    });
    const healthcareUser = await User.findById(offer.user).select({
      hash: 0,
      salt: 0,
    });

    const existingCommunityContact = communityUser.contacts.find(
      (contact) =>
        contact.username.replace(/\s+/g, "").trim().toLowerCase() ===
        healthcareUser.username.replace(/\s+/g, "").trim().toLowerCase()
    );

    const existingHealthcareContact = healthcareUser.contacts.find(
      (contact) =>
        contact.username.replace(/\s+/g, "").trim().toLowerCase() ===
        communityUser.username.replace(/\s+/g, "").trim().toLowerCase()
    );

    if (!existingCommunityContact && !existingHealthcareContact) {
      const newCommunityContact = {
        username: communityUser.username,
        user: communityUser._id,
        avatar: communityUser.avatar,
      };

      const newHealthcareContact = {
        username: healthcareUser.username,
        user: healthcareUser._id,
        avatar: healthcareUser.avatar,
      };

      const newChat = new Chat({
        communityMember: communityUser._id,
        healthcareMember: healthcareUser._id,
      });

      communityUser.contacts.push(newHealthcareContact);
      healthcareUser.contacts.push(newCommunityContact);

      await communityUser.save();
      await healthcareUser.save();

      const savedChat = newChat.save();
      res.status(200).send(savedChat);
    }
  } catch (err) {
    return err;
  }
});

module.exports = router;
